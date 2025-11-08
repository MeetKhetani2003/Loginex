import nodemailer from "nodemailer";

// 1. Hostinger Transporter Setup (For transactional emails like invoices and notifications)
const hostingerTransporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.HOSTINGER_EMAIL, // Your full email, e.g., "info@yourdomain.com"
    pass: process.env.HOSTINGER_PASS, // Your mailbox password
  },
});

/**
 * Sends a styled invoice/order confirmation email using the Hostinger SMTP setup.
 * Uses a professional blue/gray theme.
 * @param {object} params - Email details and order data.
 */
export const sendInvoiceEmail = async ({
  to,
  order,
  planName,
  isInternal = false,
}) => {
  if (!process.env.HOSTINGER_EMAIL || !process.env.HOSTINGER_PASS) {
    console.error(
      "Hostinger email credentials missing. Cannot send invoice email."
    );
    return;
  }

  const subject = isInternal
    ? `New VPS Order: ${planName} ($${order.payment.amount})`
    : `Your VPS Order Confirmation - ${planName}`;

  // Styled HTML Template for Invoice/Order
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
      
      <!-- Header -->
      <div style="background-color: #4f46e5; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">${
            isInternal ? "New Order Alert" : "Loginex Order Confirmation"
          }</h2>
      </div>

      <!-- Body Content -->
      <div style="padding: 30px;">
          <p style="font-size: 16px; margin-bottom: 20px;">
              ${
                isInternal
                  ? "A new VPS order has been successfully processed. See details below for immediate provisioning."
                  : "Hi there! Thank you for choosing Loginex. Your VPS order details are confirmed below. We’re working hard to get your service online!"
              }
          </p>

          <table width="100%" cellpadding="10" cellspacing="0" style="border: 1px solid #eee; border-radius: 4px; margin-bottom: 20px; border-collapse: collapse;">
              <tr>
                  <td style="background-color: #f8f8f8; font-weight: bold; width: 30%; border: 1px solid #eee;">Plan:</td>
                  <td style="background-color: #ffffff; border: 1px solid #eee;">${planName}</td>
              </tr>
              <tr>
                  <td style="background-color: #f8f8f8; font-weight: bold; border: 1px solid #eee;">Amount:</td>
                  <td style="background-color: #ffffff; border: 1px solid #eee; color: #10b981; font-weight: bold; font-size: 1.1em;">$${
                    order.payment.amount
                  }</td>
              </tr>
              <tr>
                  <td style="background-color: #f8f8f8; font-weight: bold; border: 1px solid #eee;">Expiry:</td>
                  <td style="background-color: #ffffff; border: 1px solid #eee;">${new Date(
                    order.expiryTime
                  ).toLocaleDateString()}</td>
              </tr>
          </table>

          <p style="font-size: 14px; color: #666; margin-top: 20px; margin-bottom: 5px;">
              Transaction ID: <strong>${order.payment.transactionId}</strong>
          </p>
          ${
            isInternal
              ? `<p style="font-size: 14px; color: #666;">User ID: <strong>${order.user}</strong></p>`
              : ""
          }
      </div>

      <!-- Footer -->
      <div style="background-color: #f4f4f4; color: #999; padding: 15px; text-align: center; font-size: 12px; border-top: 1px solid #eee;">
          <p style="margin: 0;">Order ID: ${order._id}</p>
          <p style="margin: 5px 0 0 0;">&copy; ${new Date().getFullYear()} Loginex. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    await hostingerTransporter.sendMail({
      from: '"Loginex" <team@loginex.ca>',
      to,
      subject,
      html,
    });
    console.log(
      `Invoice email sent successfully to ${to}. Internal: ${isInternal}`
    );
  } catch (error) {
    console.error("ERROR: Failed to send invoice email:", error);
  }
};

/**
 * Sends a styled internal notification about a new inquiry using the Hostinger SMTP.
 * Uses an attention-grabbing orange/yellow theme for internal alerts.
 * @param {string} receiverEmail - The departmental email address to notify.
 * @param {object} inquiryData - The saved inquiry document data.
 */
export async function sendNotificationEmail(receiverEmail, inquiryData) {
  // Since you are using Hostinger Transporter, this check should ideally be for Hostinger credentials
  // For now, retaining the existing GMAIL check to prevent sending if environment variables are missing
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.warn(
      "Email credentials for GMail missing. Skipping notification email."
    );
    return false;
  }

  console.log(`Sending notification to: ${receiverEmail}`);

  // Styled HTML Template for Internal Inquiry Notification
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: auto; border: 1px solid #f97316; border-radius: 8px;">
        <!-- Header (Urgent Alert) -->
        <div style="background-color: #f97316; color: #ffffff; padding: 15px 30px; text-align: center;">
            <h2 style="margin: 0; font-size: 22px;">🚨 NEW CUSTOMER INQUIRY 🚨</h2>
        </div>

        <!-- Body Content -->
        <div style="padding: 30px;">
            <p style="font-size: 16px; margin-bottom: 25px; color: #555;">
                A new customer inquiry has been submitted and requires immediate follow-up by the team.
            </p>

            <table width="100%" cellpadding="10" cellspacing="0" style="margin-bottom: 25px; border-collapse: collapse;">
                <tr>
                    <td style="background-color: #ffe8d6; font-weight: bold; width: 30%; border: 1px solid #fed7aa; padding: 12px;">Type:</td>
                    <td style="background-color: #ffffff; border: 1px solid #fed7aa; padding: 12px; font-weight: bold; color: #f97316;">${inquiryData.type.toUpperCase()}</td>
                </tr>
                <tr>
                    <td style="background-color: #f8f8f8; font-weight: bold; border: 1px solid #eee; padding: 12px;">Name:</td>
                    <td style="background-color: #ffffff; border: 1px solid #eee; padding: 12px;">${
                      inquiryData.name
                    }</td>
                </tr>
                <tr>
                    <td style="background-color: #f8f8f8; font-weight: bold; border: 1px solid #eee; padding: 12px;">Email:</td>
                    <td style="background-color: #ffffff; border: 1px solid #eee; padding: 12px;"><a href="mailto:${
                      inquiryData.contactEmail
                    }" style="color: #4f46e5;">${
    inquiryData.contactEmail
  }</a></td>
                </tr>
                ${
                  inquiryData.mobile
                    ? `<tr><td style="background-color: #f8f8f8; font-weight: bold; border: 1px solid #eee; padding: 12px;">Mobile:</td><td style="background-color: #ffffff; border: 1px solid #eee; padding: 12px;">${inquiryData.mobile}</td></tr>`
                    : ""
                }
                <tr>
                    <td style="background-color: #f8f8f8; font-weight: bold; border: 1px solid #eee; padding: 12px;">Submitted On:</td>
                    <td style="background-color: #ffffff; border: 1px solid #eee; padding: 12px;">${new Date(
                      inquiryData.timestamp
                    ).toLocaleString()}</td>
                </tr>
            </table>

            <h3 style="margin-top: 30px; border-bottom: 2px solid #ddd; padding-bottom: 5px; color: #333;">Customer Message:</h3>
            <p style="white-space: pre-wrap; background-color: #fffbeb; padding: 15px; border: 1px solid #fef3c7; border-radius: 6px; color: #444; font-style: italic;">${
              inquiryData.description
            }</p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f4f4f4; color: #999; padding: 15px; text-align: center; font-size: 12px; border-top: 1px solid #eee;">
            <p style="margin: 0 0 5px 0;">Inquiry ID: ${inquiryData._id}</p>
            <p style="margin: 0; font-weight: bold; color: #f97316;">ACTION REQUIRED: Please follow up promptly!</p>
        </div>
    </div>
  `;

  const mailOptions = {
    from: `Inquiry System <team@loginex.ca>`,
    to: receiverEmail,
    subject: `[NEW INQUIRY] ${inquiryData.type.toUpperCase()} - ${
      inquiryData.name
    }`,
    html: html,
  };

  try {
    // Using the centralized hostingerTransporter as per your latest code structure
    await hostingerTransporter.sendMail(mailOptions);
    console.log("Notification email sent successfully.");
    return true;
  } catch (error) {
    console.error("ERROR: Failed to send email notification:", error);
    return false;
  }
}

export default sendNotificationEmail;
