import path from "path";
import fs from "fs";
import fetch from "node-fetch";
import multer from "multer";
import logger from "../../utils/logger.js";
import student from "../models/student.js";

const upload = multer({ dest: "uploads/" });

const uploadFile = async (req, res) => {
  try {
    console.log(req.user);

    const token = req.user.token;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log(token)
    const filePath = req.file.path; // Path to the uploaded file
    const fileName = req.file.originalname;

    // Create a read stream from the uploaded file
    const file = fs.createReadStream(filePath);

    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${fileName}:/content`;

    // Upload the file to Microsoft Graph
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/octet-stream",
      },
      body: file,
    });
    // console.log(uploadResponse)
    const uploadData = await uploadResponse.json();
    console.log(uploadData.webUrl)
    const studentData = await student.findById(req.user.connection_id);
    console.log(studentData)
    studentData.resume = uploadData.webUrl;
    await studentData.save();

    // Remove the temporary file
    console.log(1)
    fs.unlinkSync(filePath);
    console.log(2)
    if (uploadResponse.ok) {
      logger.info(uploadData.webUrl);
      res.json({
        message: "File uploaded successfully",
        webUrl: uploadData.webUrl,
      });
    } else {
      logger.error(uploadData);
      res
        .status(uploadResponse.status)
        .json({ message: uploadData.error.message });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { uploadFile, upload };
