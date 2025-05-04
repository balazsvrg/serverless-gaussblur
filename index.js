const sharp = require("sharp");

module.exports = async function (context, req) {
  if (req.method !== "POST") {
    return {
      status: 405,
      body: "Only POST requests are supported.",
    };
  }

  try {
    const imageBuffer = req.body;

    if (!imageBuffer || !imageBuffer.length) {
      return {
        status: 400,
        body: "No image data found in request body.",
      };
    }

    const blurredImage = await sharp(imageBuffer)
      .blur(10) // Gaussian blur
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
    return {
      status: 500,
      body: `Error processing image: ${err.message}`,
    };
  }
};
