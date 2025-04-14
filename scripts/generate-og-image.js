const { createCanvas, registerFont, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

async function generateOGImage() {
  // Create a canvas with 1200x630 dimensions (standard OG size)
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext("2d");

  // Set background
  ctx.fillStyle = "#1e2030"; // Use your dark mode background color
  ctx.fillRect(0, 0, 1200, 630);

  // Add a subtle grid pattern
  ctx.strokeStyle = "rgba(122, 182, 255, 0.1)"; // Matching your theme
  ctx.lineWidth = 1;

  // Draw vertical grid lines
  for (let x = 50; x < 1200; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 630);
    ctx.stroke();
  }

  // Draw horizontal grid lines
  for (let y = 50; y < 630; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1200, y);
    ctx.stroke();
  }

  // Add a blue gradient accent
  const gradient = ctx.createLinearGradient(0, 0, 1200, 0);
  gradient.addColorStop(0, "rgba(122, 182, 255, 0.7)");
  gradient.addColorStop(1, "rgba(122, 182, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 10, 630);

  // Set text styles
  ctx.fillStyle = "#e4e4ef"; // Light text color from your theme
  ctx.font = "bold 72px sans-serif";
  ctx.textAlign = "center";

  // Add title
  ctx.fillText("From Bricks to Bytes", 600, 280);

  // Add subtitle
  ctx.font = "36px sans-serif";
  ctx.fillText("by Théo Gédin", 600, 350);

  // Output the image
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(
    path.join(process.cwd(), "public", "og-default-image.png"),
    buffer
  );

  console.log("Generated OG image at public/og-default-image.png");
}

generateOGImage().catch(console.error);
