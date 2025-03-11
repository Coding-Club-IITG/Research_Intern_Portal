import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES();

export const verifyEmailAddresses = async (req, res) => {
  try {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email list" });
    }

    console.log("Verifying emails:", emails);

    const verificationPromises = emails.map((email) => {
      return ses.verifyEmailIdentity({ EmailAddress: email }).promise();
    });

    await Promise.all(verificationPromises);

    return res.status(200).json({
      status: "success",
      message: "Emails verified successfully",
    });
  } catch (err) {
    console.error("Error verifying emails:", err);
    return res.status(500).json({
      status: "error",
      message: "Failed to verify emails",
      error: err.message,
    });
  }
};

export const sendEmail = async (req, res) => {
  try {
    const { emails, subject, message } = req.body;

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email list" });
    }

    if (!subject || !message) {
      return res
        .status(400)
        .json({ status: "error", message: "Subject and message are required" });
    }

    console.log(`Sending email to: ${emails.join(", ")}`);

    const params = {
      Source: "aditya.samal@iitg.ac.in",
      Destination: {
        ToAddresses: emails,
      },
      Message: {
        Subject: { Data: subject },
        Body: { Text: { Data: message } },
      },
    };

    const data = await ses.sendEmail(params).promise();

    console.log("Email sent:", data);

    return res.status(200).json({
      status: "success",
      message: "Email sent successfully",
      data,
    });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({
      status: "error",
      message: "Failed to send email",
      error: err.message,
    });
  }
};
