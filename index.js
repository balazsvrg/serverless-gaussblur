module.exports = async function (context) {
  const req = context.request; // ✅ This is how to get the HTTP request

  console.log("Request method:", req.method);

  if (req.method !== "POST") {
    return {
      status: 405,
      body: `Only POST requests are supported. Received ${req.method}`,
    };
  }

  try {
    const imageBuffer = await context.request.arrayBuffer(); // ✅ Get raw body
    const sharp = require("sharp");

    const blurredImage = await sharp(Buffer.from(imageBuffer))
      .blur(10)
      .jpeg()
      .toBuffer();

    return {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: blurredImage,
    };
  } catch (err) {
    console.error("Error processing image:", err);
    return {
      status: 500,
      body: `Error: ${err.message}`,
    };
  }
};
