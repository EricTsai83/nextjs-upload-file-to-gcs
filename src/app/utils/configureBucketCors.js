// Imports the Google Cloud client library
import { Storage } from "@google-cloud/storage";
const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEYFILENAME;
// The ID of your GCS bucket
const bucketName = process.env.BUCKET_NAME;

// Creates a client
const storage = new Storage({ projectId, keyFilename });

// The origin for this CORS config to allow requests from
const origin = ["*"];

// The response header to share across origins
const responseHeader = [
  "Content-Type",
  "Access-Control-Allow-Origin",
  "x-goog-resumable",
];

// The maximum amount of time the browser can make requests before it must
// repeat preflighted requests
const maxAgeSeconds = 3600;

// The name of the method
// See the HttpMethod documentation for other HTTP methods available:
// https://cloud.google.com/appengine/docs/standard/java/javadoc/com/google/appengine/api/urlfetch/HTTPMethod
const method = ["PUT", "GET", "HEAD", "DELETE", "POST", "OPTIONS"];

export default async function configureBucketCors() {
  await storage.bucket(bucketName).setCorsConfiguration([
    {
      maxAgeSeconds,
      method: method,
      origin: origin,
      responseHeader: responseHeader,
    },
  ]);

  console.log(`Bucket ${bucketName} was updated with a CORS config
      to allow ${method} requests from ${origin} sharing 
      ${responseHeader} responses across origins`);
}
