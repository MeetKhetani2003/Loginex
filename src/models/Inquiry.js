import mongoose from "mongoose";

export const InquirySchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required."], trim: true },
  contactEmail: {
    type: String,
    required: [true, "Email is required."],
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address."],
  },
  mobile: { type: String, trim: true },
  description: {
    type: String,
    required: [true, "Inquiry details are required."],
  },
  type: {
    type: String,
    enum: ["general", "minecraft", "webdev", "vps", "sales"],
    required: [true, "Inquiry type is required."],
  },
  routingEmail: {
    type: String,
    required: [true, "Routing email is required to send notification."],
    lowercase: true,
  },
  status: {
    type: String,
    enum: ["New", "In Progress", "Resolved"],
    default: "New",
  },
  timestamp: { type: Date, default: Date.now },
});
// export const getInquiryModel = (db) => {
//   if (db.models.Inquiry) {
//     return db.models.Inquiry;
//   }
//   return db.model("Inquiry", InquirySchema);
// };


 const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema)
export default Inquiry
