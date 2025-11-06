import mongoose from "mongoose";

// Helper function to create a URL-friendly slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

const serverVpsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: {
      type: String,
      // required: true,
      unique: true,
    },
    cpu: { type: String, required: true, trim: true },
    ram: { type: String, required: true, trim: true },
    storage: { type: String, required: true, trim: true },
    bandwidth: { type: String, required: true, trim: true },
    pricePerMonth: { type: Number, required: true, min: 0 },
    currency: {
      type: String,
      required: true,
      default: "USD",
      enum: ["USD", "EUR", "GBP"],
    },
    billingCycle: {
      type: String,
      default: "Monthly",
      enum: ["Monthly", "Quarterly", "Annually"],
    },
    features: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    description: { type: String },
  },
  { timestamps: true }
);

// Pre-save hook to ensure the slug is created/updated whenever the name changes
serverVpsSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name);
  }
  next();
});

// Export the model, preventing re-compilation in development mode
export const ServerVps =
  mongoose.models.ServerVps || mongoose.model("ServerVps", serverVpsSchema);
