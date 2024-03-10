// Imports the Google Cloud client library
import { Storage } from "@google-cloud/storage";
const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEYFILENAME;
// Creates a client
const storage = new Storage({ projectId, keyFilename });

const bucketName = process.env.BUCKET_NAME;
export default async function makeBucketPublic() {
  await storage.bucket(bucketName).makePublic();

  console.log(`Bucket ${bucketName} is now publicly readable`);
}
