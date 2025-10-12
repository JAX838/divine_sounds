const africastalking = require("../config/africastalking");

const sms = africastalking.SMS;

const sendSMS = async (to, message) => {
  try {
    // ensure to is a string in international format (+...)
    const recipient = Array.isArray(to) ? to : [to];
    const response = await sms.send({
      to: recipient,
      message,
      // bulkSMSMode removed — not allowed by SDK validation
    });
    console.log("✅ SMS sent:", response);
    return response;
  } catch (error) {
    // show provider response when available to aid debugging (e.g. 401 details)
    console.error(
      "❌ SMS sending failed:",
      error?.response?.data ?? error?.message ?? error
    );
    throw error;
  }
};

module.exports = { sendSMS };
