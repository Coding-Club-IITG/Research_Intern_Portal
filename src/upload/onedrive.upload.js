import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';

const uploadFile = async (req,res) => {
    try{
        // token from cookie
        const token = 'eyJ0eXAiOiJKV1QiLCJub25jZSI6IjRqMngwOVBKaWg1TVFaMkVHTlJ6SDdxQlNJeU9yTlpZTHUybkR6Uk9QRGsiLCJhbGciOiJSUzI1NiIsIng1dCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCIsImtpZCI6IkwxS2ZLRklfam5YYndXYzIyeFp4dzFzVUhIMCJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NTBhYTc4ZC05NGUxLTRiYzYtOWNmMy04YzExYjUzMDcwMWMvIiwiaWF0IjoxNzE3OTI2OTUyLCJuYmYiOjE3MTc5MjY5NTIsImV4cCI6MTcxNzkzMjE3MywiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhXQUFBQUdlYlh4cU5hbUlySEdHU0ErYW9GYXRUdTUxclZJUzVHRXRWdGEzdG1BUlQ4VFgvYWZ0ZVlBS2dRMTRCdmx6KzciLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6InJlc2VhcmNoLWludGVybi1wb3J0YWwtdGVzdGluZyIsImFwcGlkIjoiNjk0YjZiMDQtYzQwMS00ZTg1LTlhODEtZmU3OGYyMjNkZWRlIiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiIyMjAxMjIwNDUiLCJnaXZlbl9uYW1lIjoiUFJBTkpBTCBWSVNIV0FLQVJNQSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjEwMy4xNjkuMTU2LjExNyIsIm5hbWUiOiJQUkFOSkFMIFZJU0hXQUtBUk1BIiwib2lkIjoiNjVlZDMyYjItM2Y3Ni00ZmU0LWE2ZTktNGI0NTMxODYwNTM0IiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMyMDAyM0YyOUJCQjAiLCJyaCI6IjAuQVNvQWphY0toZUdVeGt1Yzg0d1J0VEJ3SEFNQUFBQUFBQUFBd0FBQUFBQUFBQUFxQUF3LiIsInNjcCI6IkZpbGVzLlJlYWRXcml0ZSBwcm9maWxlIG9wZW5pZCBlbWFpbCIsInN1YiI6Im9nX3l5Z256S19mOVVFWXlycHpLQWJsV1lJZlZQSjhpOGhwM2lZMnRSUXMiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiQVMiLCJ0aWQiOiI4NTBhYTc4ZC05NGUxLTRiYzYtOWNmMy04YzExYjUzMDcwMWMiLCJ1bmlxdWVfbmFtZSI6InYucHJhbmphbEBpaXRnLmFjLmluIiwidXBuIjoidi5wcmFuamFsQGlpdGcuYWMuaW4iLCJ1dGkiOiJqejl3ci1CZ3dFZVlSay1fV1BGd0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX3N0Ijp7InN1YiI6InNnSmFETS1rSHBGdmgzQzRMMFVsZ1dDNWpEZkpaV2tZUnd2eXNCX3lBS3MifSwieG1zX3RjZHQiOjE1MjM1MjYwNzd9.MpWHm_Lasvusi6SFooM67uAr-OmzS_5D3774TUTBnXtyvEfpveA74cBYNqZ12PjUrvtVQ-DxgYvbrNJ9aPr9I_48KMf7kyRjZZKb_dVMLj-hJt_Hyz9clRQVl80x5bTZyR7HkHlgosESGb8ZD9YRe_p1cKeDZsVunybsH1tpdgn7_wBdq9d8ADhegAh-Qy_z-FJjNUj73AtREPOrHLv5hGDCI65JJZeZlZGDmkLzLCQ42oE-PPCNKEP_deyYNq7AM_psNL4onOOScG2V9Arb7g5zIsxApV6MVfITpETf8ePrFBtd3izOhcJ3tsXJU6mCw1q_lahzKjuG48bJb3_0tg'
        // get the file from frontend, for now we are using a file from the server
        const filePath = path.resolve("./src/upload/file.pdf");
        // create a read stream from the file
        const file = fs.createReadStream(filePath);

        const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${path.basename(filePath)}:/content`;
        // upload the file
        const uploadResponse = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/octet-stream"
            },
            body: file
        });
    
        const uploadData = await uploadResponse.json();
        console.log(uploadData.webUrl);
        res.json({message: 'File uploaded successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export {
    uploadFile
}