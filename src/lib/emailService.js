import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
});
export const sendInvoiceEmail = async ({
  to,
  order,
  planName,
  isInternal = false,
}) => {
  const subject = isInternal
    ? `New VPS Order: ${planName} ($${order.payment.amount})`
    : `Your VPS Order Confirmation - ${planName}`;

  const html = `
    <h1>${isInternal ? "New Order Received" : "Thank You for Your Order!"}</h1>
    <p><strong>Plan:</strong> ${planName}</p>
    <p><strong>Amount:</strong> $${order.payment.amount}</p>
    <p><strong>Transaction ID:</strong> ${order.payment.transactionId}</p>
    <p><strong>Expiry:</strong> ${new Date(
      order.expiryTime
    ).toLocaleDateString()}</p>
    ${isInternal ? `<p><strong>User ID:</strong> ${order.user}</p>` : ""}
    <hr>
    <small>Order ID: ${order._id}</small>
  `;

  await transporter.sendMail({
    from: '"Your Company" <no-reply@yourcompany.com>',
    to,
    subject,
    html,
  });
};
/**
 * Sends an email notification about a new inquiry.
 * @param {string} receiverEmail - The departmental email address to notify.
 * @param {object} inquiryData - The saved inquiry document data.
 */
async function sendNotificationEmail(receiverEmail, inquiryData) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.warn("Email credentials missing. Skipping email notification.");
    return false;
  }

  console.log(`Sending notification to: ${receiverEmail}`);

  const mailOptions = {
    from: `Inquiry System <${process.env.GMAIL_USER}>`,
    to: receiverEmail,
    subject: `[NEW INQUIRY] ${inquiryData.type.toUpperCase()} - ${
      inquiryData.name
    }`,
    html: `
            <h1>New Inquiry Received</h1>
            <p><strong>Type:</strong> ${inquiryData.type.toUpperCase()}</p>
            <p><strong>Name:</strong> ${inquiryData.name}</p>
            <p><strong>Contact Email:</strong> ${inquiryData.contactEmail}</p>
            ${
              inquiryData.mobile
                ? `<p><strong>Mobile:</strong> ${inquiryData.mobile}</p>`
                : ""
            }
            <p><strong>Submitted On:</strong> ${new Date(
              inquiryData.timestamp
            ).toLocaleString()}</p>
            <hr>
            <h2>Requirements/Description:</h2>
            <p>${inquiryData.description}</p>
            <hr>
            <p>Inquiry ID: ${inquiryData._id}. Please follow up promptly.</p>
        `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("ERROR: Failed to send email notification:", error);
    return false;
  }
}

export default sendNotificationEmail

