const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const mysql = require("mysql2");
const sharp = require("sharp");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Database Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to the database");
});

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Secret Key and Admin Credentials
const SECRET_KEY = "yellow";
const USERNAME = "Admin";
const PASSWORD = "Zafar12@#";

// Middleware
// app.use(
//   cors({
//     origin: [process.env.ORIGIN, process.env.ORIGINWWW, process.env.ORIGINTWO],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: [
      "https://admin.aesthetica.webinessdesign.com",
      "https://aesthetica.webinessdesign.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use(express.json()); // Parse JSON requests

// Login Endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Verify Token
app.get("/api/verify-token", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    res.json({ user });
  });
});

// Multer Storage
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });

// Upload Discover wallpapers and store metadata in MySQL
app.post(
  "/api/wallpapers/upload-multiple",
  upload.array("wallpaperImages", 20),
  async (req, res) => {
    const { title, description, type } = req.body;
    const uploadedFiles = req.files;

    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    try {
      const uploadResults = [];

      for (const file of uploadedFiles) {
        const wallpaperUrl = `/uploads/${file.filename}`;

        // Insert wallpaper details into the discover_wallpapers table
        const query =
          "INSERT INTO discover_wallpapers (title, url, description, type, createdAt) VALUES (?, ?, ?, ?, ?)";
        const [result] = await connection
          .promise()
          .query(query, [title, wallpaperUrl, description, type, new Date()]);

        const wallpaperId = result.insertId;

        uploadResults.push({
          id: wallpaperId,
          message: "Wallpaper uploaded successfully",
          wallpaperUrl,
        });
      }

      res.json({
        message: "Wallpapers uploaded successfully",
        files: uploadResults,
      });
    } catch (error) {
      console.error("Error uploading wallpapers:", error);
      res.status(500).json({ error: "Failed to upload wallpapers" });
    }
  }
);

// Fetch all Discover wallpapers from MySQL
app.get("/api/wallpapers", async (req, res) => {
  const { type } = req.query;

  try {
    console.log("Fetching wallpapers...");

    let query = "SELECT * FROM discover_wallpapers";
    let queryParams = [];

    // Filter by type (free or pro) if specified
    if (type) {
      query += " WHERE type = ?";
      queryParams.push(type);
    }

    // Order by createdAt in descending order to show the latest wallpapers first
    query += " ORDER BY createdAt DESC";

    const [rows] = await connection.promise().query(query, queryParams);

    console.log("Wallpapers fetched successfully:", rows.length, "items");

    res.json({
      message: "Wallpapers fetched successfully",
      wallpapers: rows,
    });
  } catch (error) {
    console.error("Error fetching wallpapers:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch wallpapers", details: error.message });
  }
});

app.get("/api/wallpapers/download/:filename", (req, res) => {
  const { filename } = req.params;

  // Adjust path based on actual upload directory
  const filePath = path.join(__dirname, "uploads", filename);

  console.log("File path:", filePath); // Debug file path

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    return res.status(404).send("File not found.");
  }

  // Serve the file
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Error downloading the file:", err);
      res.status(500).send("Could not download the file.");
    }
  });
});

app.post("/api/wallpapers/download/:id/increment", async (req, res) => {
  const { id } = req.params;
  try {
    const query =
      "UPDATE discover_wallpapers SET downloadCount = downloadCount + 1 WHERE id = ?";
    await connection.promise().query(query, [id]);
    res.status(200).send({ success: true });
  } catch (error) {
    console.error("Error incrementing download count:", error);
    res.status(500).send({ success: false });
  }
});

app.delete("/api/wallpapers/:id", (req, res) => {
  const { id } = req.params;

  // Debugging logs
  console.log("Attempting to delete wallpaper with ID:", id);

  const query = "DELETE FROM discover_wallpapers WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting wallpaper:", err);
      return res.status(500).json({ error: "Failed to delete wallpaper" });
    }

    console.log("Delete result:", result); // Log MySQL result
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Wallpaper deleted successfully" });
    } else {
      res.status(404).json({ error: "Wallpaper not found" });
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).send("Something went wrong!");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
