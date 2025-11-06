import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    transactionId: { type: String },
    amount: { type: Number, required: true },
    method: {
      type: String,
      enum: ["card", "paypal", "upi", "crypto"],
      default: "card",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paidAt: { type: Date },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vps: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServerVps",
      required: true,
    },
    orderTime: { type: Date, default: Date.now },
    expiryTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    payment: paymentSchema,
    extensions: [
      {
        extendedOn: { type: Date, default: Date.now },
        newExpiry: { type: Date },
        amountPaid: { type: Number },
        transactionId: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// 🧠 Middleware: auto-mark expired orders
orderSchema.pre("save", function (next) {
  if (this.expiryTime < new Date()) {
    this.status = "expired";
  }
  next();
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
