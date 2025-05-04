const sharp = require("sharp");

module.exports = async function (context) {
  console.log("Function invoked");
  console.log("Context keys:", Object.keys(context)); // Debugging

  if (context.method !== "POST") {
    return {
      status: 405,
      body: `Only POST requests are allowed. Received ${context.method}`,
    };
  }

  const input = context.body;
  if (!input || input.length === 0) {
    return {
      status: 400,
      body: "No image data received in the request body.",
    };
  }

  try {
    const blurred = await sharp(Buffer.from(input))
      .blur(10)
      .jpeg()
      .toBuffer();

    return {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: blurred,
    };
  } catch (err) {
    console.error("Error processing image:", err);
    return {
      status: 500,
      body: `Image processing failed: ${err.message}`,
    };
  }
};
