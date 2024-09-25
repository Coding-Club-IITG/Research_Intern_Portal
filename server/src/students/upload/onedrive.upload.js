import path from "path";
import fs from "fs";
import fetch from "node-fetch";

const uploadFile = async (req, res) => {
  try {
    const token = req.user.access_token;
    //console.log(token);
    //  get the file from frontend, for now we are using a file from the server
    const filePath = path.resolve("./src/upload/file.pdf");
    // create a read stream from the file
    const file = fs.createReadStream(filePath);

    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${path.basename(filePath)}:/content`;
    // upload the file
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/octet-stream",
      },
      body: file,
    });

    const uploadData = await uploadResponse.json();
    console.log(uploadData.webUrl);
    res.json({ message: "File uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { uploadFile };
