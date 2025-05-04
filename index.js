module.exports = async function (context) {
  console.log("Function invoked");

  // Log the entire context object to debug
  console.log("Context object:", JSON.stringify(context, null, 2));

  // Log method specifically
  console.log("context.method:", context.method);

  const method = context.method || context.req?.method;
  console.log("Effective method:", method);

  if (method !== "POST") {
    return {
      status: 405,
      body: `Only POST requests are supported. Received: ${method}`
    };
  }


  const input = context.body;
  if (!input || input.length === 0) {
    return {
      status: 400,
      body: "No image data received in body.",
    };
  }

  const sharp = require("sharp");

  try {
    const output = await sharp(Buffer.from(input))
      .blur(10)
      .jpeg()
      .toBuffer();

    return {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg"
      },
      body: output  // ✅ Correct variable
    };
      
  } catch (err) {
    console.error("Image processing failed:", err);
    return {
      status: 500,
      body: "Server error: " + err.message,
    };
  }
};
