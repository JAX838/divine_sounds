const nodemailer = require("nodemailer");

exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    // ✅ Setup transporter with your Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // app password, not your Gmail login
      },
    });

    // ✅ Email content
    const mailOptions = {
      from: `"Divine Sounds Website" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
      subject: `New Message from ${name}`,
      html: `
        <h2>New Contact Message from Divine Sounds Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // ✅ Send mail
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Email sending error:", err);
    res.status(500).json({ message: "Failed to send message." });
  }
};
