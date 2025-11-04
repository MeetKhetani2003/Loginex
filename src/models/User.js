// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    // Authentication identifiers
    googleId: { type: String, unique: true, sparse: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    // Basic profile info
    name: { type: String, trim: true, minlength: 2, maxlength: 80 },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/demo/image/upload/v1699123456/default-user.png",
    },

    // Password (optional if using Google login)
    password: {
      type: String,
      minlength: 6,
      select: false, // Never return password in queries
    },

    // Role & permissions
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Account state
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
    loginCount: { type: Number, default: 0 },

    // Security tokens for password reset or refresh
    refreshToken: { type: String, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date },

    // Soft delete (optional)
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

//
// 🔒 Pre-save hooks
//
userSchema.pre("save", async function (next) {
  // Only hash password if modified
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Ensure email exists for Google users
  if (this.googleId && !this.email) {
    return next(new Error("Google users must have an email address"));
  }

  next();
});

//
// 🔑 Instance methods
//
userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const payload = {
    _id: this._id,
    role: this.role,
    email: this.email,
  };

  // 10 days expiry
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10d" });
};

userSchema.methods.generateRefreshToken = function () {
  const payload = { _id: this._id };
  const refresh = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  this.refreshToken = refresh;
  return refresh;
};

//
// 🧩 Static methods
//
userSchema.statics.verifyToken = async function (token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await this.findById(decoded._id);
    return user || null;
  } catch {
    return null;
  }
};

userSchema.statics.findOrCreateGoogleUser = async function (googleProfile) {
  let user = await this.findOne({ googleId: googleProfile.sub });
  if (!user) {
    user = await this.create({
      googleId: googleProfile.sub,
      email: googleProfile.email,
      name: googleProfile.name,
      picture: googleProfile.picture,
      lastLogin: new Date(),
    });
  } else {
    user.lastLogin = new Date();
    user.loginCount += 1;
    await user.save();
  }
  return user;
};

//
// ⚡ Indexes for performance
//
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ deletedAt: 1 });

//
// 🧹 Virtuals
//
userSchema.virtual("isAdmin").get(function () {
  return this.role === "admin";
});

//
// ✅ Model export
//
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
