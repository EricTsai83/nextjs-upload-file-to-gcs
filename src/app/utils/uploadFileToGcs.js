//////////////////////////////////////
// This function only can run on server //
//////////////////////////////////////

// Import the Storage class from the '@google-cloud/storage' package
import { Storage } from "@google-cloud/storage";
import { resolve } from "styled-jsx/css";
// Get the 'PROJECT_ID' and 'KEYFILENAME' environment variables from the .env file
const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEYFILENAME;

// Create a new Storage object with the specified project ID and key file
const storage = new Storage({ projectId, keyFilename });

// Define an asynchronous function to upload a file to Google Cloud Storage
async function uploadFileToGcs(bucketName, file, fileOutputName) {
  const bucket = storage.bucket(bucketName);

  const uploadResult = bucket.file(fileOutputName).save(file, (error) => {
    if (!error) {
      console.log("success");
      return { status: "success" };
    } else {
      return { status: "error" };
    }
  });

  return uploadResult;
}
export default uploadFileToGcs;

// // Use an immediately-invoked function expression (IIFE) to call the uploadFile function
// (async () => {
//   // Call the uploadFile function with the specified parameters
//   const ret = await uploadFile(
//     process.env.BUCKET_NAME,
//     "test.txt",
//     "CodingWithAdo.txt",
//   );

//   // Log the result of the upload operation to the console
//   console.log(ret);
// })();
