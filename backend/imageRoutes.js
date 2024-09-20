import express from "express";
import multer from "multer";
import sharp from "sharp";
import { createCanvas, loadImage, registerFont } from "canvas";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import Image from "./models/imageModel.js"; // Import your Image model

const router = express.Router();
const upload = multer(); // Configure multer for file upload

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

registerFont(join(__dirname, "./fonts/impact.ttf"), {
  family: "Impact",
});

router.post("/generate-image", upload.single("image"), async (req, res) => {
  const { text, gender, email, phone, address, age } = req.body;
  const uploadedImage = req.file; // The uploaded passport-size image

  try {
    const img = await loadImage("https://i.ibb.co/7W3bH9Q/image.png");
    const canvas = createCanvas(546, 384);
    const ctx = canvas.getContext("2d");

    // Draw background image (certificate template)
    ctx.drawImage(img, 0, 0, 546, 384);

    // Set font and text style
    ctx.font = "28px Impact";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    // Overlay the text
    ctx.fillText(text, 175, 160);

    // Process the uploaded image if available
    if (uploadedImage) {
      console.log("Uploaded image found");

      // Use sharp to resize and convert the image to PNG format
      const processedImage = await sharp(uploadedImage.buffer)
        .resize(100, 100) // Resize the image to passport size
        .png()
        .toBuffer();

      // Convert the buffer to a Base64 string
      const base64Image = `data:image/png;base64,${processedImage.toString(
        "base64"
      )}`;

      // Load the Base64 image in canvas
      const userImage = await loadImage(base64Image);

      // Draw the circular mask on the canvas
      const maskCanvas = createCanvas(100, 100);
      const maskCtx = maskCanvas.getContext("2d");

      maskCtx.beginPath();
      maskCtx.arc(50, 50, 50, 0, Math.PI * 2, true); // Create a circle
      maskCtx.closePath();
      maskCtx.clip(); // Apply the circular clip

      maskCtx.drawImage(userImage, 0, 0, 100, 100); // Draw the image on the mask

      // Get the rounded image buffer
      const roundedImageBuffer = maskCanvas.toBuffer("image/png");

      // Load the rounded image back to the main canvas
      const roundedUserImage = await loadImage(roundedImageBuffer);

      // Draw the rounded image on the certificate
      ctx.drawImage(roundedUserImage, 400, 100, 100, 100); // Adjust position and size as needed
    } else {
      console.log("No image uploaded");
    }

    // Send the generated image as a PNG response
    const imageBuffer = canvas.toBuffer("image/png");

    // Save data to the database
    const newImage = new Image({
      text,
      gender,
      email,
      phone,
      address,
      age,
      image: imageBuffer, // Store the generated image buffer
    });

    await newImage.save();

    // Send the image buffer as response
    res.set({ "Content-Type": "image/png" });
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("Error processing image");
  }
});

export default router;