// Imports the Google Cloud client library
import { Storage } from "@google-cloud/storage";
const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEYFILENAME;
// Creates a client
const storage = new Storage({ projectId, keyFilename });

export default async function generateV4UploadSignedUrl(bucketName, fileName) {
  // fileName: The full path of your file inside the GCS bucket, e.g. 'yourFile.jpg' or 'folder1/folder2/yourFile.jpg'
  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  };

  // Get a v4 signed URL for uploading file
  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options);

  console.log("The signed url for", fileName, "is", url);
}
