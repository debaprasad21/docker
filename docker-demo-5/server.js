const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/feedback", express.static("feedback"));

// Ensure necessary directories exist
const ensureDir = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(dirPath, { recursive: true });
    } else {
      throw error;
    }
  }
};

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "pages", "feedback.html");
  res.sendFile(filePath);
});

app.get("/exists", (req, res) => {
  const filePath = path.join(__dirname, "pages", "exists.html");
  res.sendFile(filePath);
});

app.post("/create", async (req, res) => {
  const title = req.body.title;
  const content = req.body.text;
  const adjTitle = title.toLowerCase();
  const tempDir = path.join(__dirname, "temp");
  const feedbackDir = path.join(__dirname, "feedback");
  const tempFilePath = path.join(tempDir, adjTitle + ".txt");
  const finalFilePath = path.join(feedbackDir, adjTitle + ".txt");

  console.log("docker");

  try {
    // Ensure temp and feedback directories exist
    await ensureDir(tempDir);
    await ensureDir(feedbackDir);

    await fs.writeFile(tempFilePath, content);

    try {
      console.log("exists");
      await fs.access(finalFilePath);
      // If we reach here, the file exists
      res.redirect("/exists");
    } catch {
      console.log("new");
      // If an error is thrown, the file doesn't exist
      await fs.copyFile(tempFilePath, finalFilePath);
      await fs.unlink(tempFilePath);
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error in file operations:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port - ${process.env.PORT}`);
});
