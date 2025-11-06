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