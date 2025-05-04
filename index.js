const sharp = require("sharp");

module.exports = async function (context) {
  try {
    const req = context.request;
    console.log("Request method:", req.method);

    if (req.method !== "POST") {
      return {
        status: 405,
        body: `Only POST requests are supported. Got ${req.method}`,
      };
    }

    const imageBuffer = await req.arrayBuffer();

    const blurred = await sharp(Buffer.from(imageBuffer))
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
    console.error("Error in handler:", err);
    return {
      status: 500,
      body: `Internal Server Error: ${err.message}`,
    };
  }
};
