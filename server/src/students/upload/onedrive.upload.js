import path from "path";
import fs from "fs";
import fetch from "node-fetch";
import multer from "multer";
import logger from "../../utils/logger.js";

const upload = multer({ dest: "uploads/" });

const uploadFile = async (req, res) => {
  try {
    //console.log(req.user);

    const token =
      "eyJ0eXAiOiJKV1QiLCJub25jZSI6IlNyRkJFMmd4ZVl2OHMtR3hGSnFCSHgycXlvZzFwUUZMX0JyOV8tVm50ZmMiLCJhbGciOiJSUzI1NiIsIng1dCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyIsImtpZCI6InoxcnNZSEhKOS04bWdndDRIc1p1OEJLa0JQdyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NTBhYTc4ZC05NGUxLTRiYzYtOWNmMy04YzExYjUzMDcwMWMvIiwiaWF0IjoxNzM1MDU3NTkzLCJuYmYiOjE3MzUwNTc1OTMsImV4cCI6MTczNTA2MjExNSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhZQUFBQWdSZncyNVhYRFJ4ckR1T3NMVnJYVmpyeWZBbnJkdDBwdzd1aC8xbVprZ3FGNWNpRWQyeDZoMUtzbjEvR3I5aE8iLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6InJlc2VhcmNoLWludGVybi1wb3J0YWwtdGVzdGluZyIsImFwcGlkIjoiNjk0YjZiMDQtYzQwMS00ZTg1LTlhODEtZmU3OGYyMjNkZWRlIiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiIyMjAxMjIwNDUiLCJnaXZlbl9uYW1lIjoiUFJBTkpBTCBWSVNIV0FLQVJNQSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjEwMy4xNjkuMTU2LjExNyIsIm5hbWUiOiJQUkFOSkFMIFZJU0hXQUtBUk1BIiwib2lkIjoiNjVlZDMyYjItM2Y3Ni00ZmU0LWE2ZTktNGI0NTMxODYwNTM0IiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMyMDAyM0YyOUJCQjAiLCJyaCI6IjEuQVNvQWphY0toZUdVeGt1Yzg0d1J0VEJ3SEFNQUFBQUFBQUFBd0FBQUFBQUFBQUFwQVF3cUFBLiIsInNjcCI6IkZpbGVzLlJlYWRXcml0ZSBVc2VyLlJlYWQgcHJvZmlsZSBvcGVuaWQgZW1haWwiLCJzdWIiOiJvZ195eWduektfZjlVRVl5cnB6S0FibFdZSWZWUEo4aThocDNpWTJ0UlFzIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiODUwYWE3OGQtOTRlMS00YmM2LTljZjMtOGMxMWI1MzA3MDFjIiwidW5pcXVlX25hbWUiOiJ2LnByYW5qYWxAaWl0Zy5hYy5pbiIsInVwbiI6InYucHJhbmphbEBpaXRnLmFjLmluIiwidXRpIjoiTzk2YzE2Tzlwa0d0cHJIT09ZSk5BUSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjE4IDEiLCJ4bXNfc3QiOnsic3ViIjoic2dKYURNLWtIcEZ2aDNDNEwwVWxnV0M1akRmSlpXa1lSd3Z5c0JfeUFLcyJ9LCJ4bXNfdGNkdCI6MTUyMzUyNjA3N30.JLYZNLckAXvgseebbFDcjifeUHxueU6zhoXuNwIzxWT11w4Hc2vklIUHYCaaaWPkOLoLwlQueMnF7ayIJuPwH19Gt1e5TgBEQIexF5nGZWzpOdGBjfFWV-pgd2ZXS2ku9vyAwva5x_jBJgiqdtQH3HgsD11F5t0K5pMg6sci8IVvAhOuK0-Cy9VyiegcctP6klbS5Ki8Mdlt5p-s_0eCCf2Xy_LQt2Xn3YZ_1k26zmgcT7xGrI8Vo3BLRADPX9-RiCi6khldKRVRW5e8vbBtHazDZYkuMZk3ezEUPjkDQpMTRaRjucm1kK_4m0I_G6MnpdXwLoclfNUv4CKqiHGXPg";

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

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

    const uploadData = await uploadResponse.json();

    // Remove the temporary file
    fs.unlinkSync(filePath);

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
