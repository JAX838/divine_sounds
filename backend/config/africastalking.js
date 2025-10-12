require("dotenv").config();
const AfricasTalking = require("africastalking");

const apiKey = process.env.AT_API_KEY?.trim();
const username = process.env.AT_USERNAME?.trim() || "sandbox";

if (!apiKey) {
  console.warn(
    "Warning: AT_API_KEY is not set or empty. Africa'sTalking requests will return 401."
  );
} else {
  // masked output for quick verification (do NOT commit real key)
  console.info(
    "Africa'sTalking config loaded. username:",
    username,
    "apiKey:",
    `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`
  );
}

const africastalking = AfricasTalking({
  apiKey,
  username,
});

module.exports = africastalking;
