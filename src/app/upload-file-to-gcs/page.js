import uploadFileToGcs from "../utils/uploadFileToGcs";
import generateV4UploadSignedUrl from "../utils/generateV4UploadSignedUrl";
import configureBucketCors from "../utils/configureBucketCors";
// import makeBucketPublic from "../utils/makeBucketPublic";

export default function ServerUploadToGcsPage() {
  async function upload(data) {
    "use server"; // use server action

    const file = data.get("file");
    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Call the uploadFile function with the specified parameters
    const uploadResult = await uploadFileToGcs(
      process.env.BUCKET_NAME,
      buffer,
      file.name,
    );

    console.log(uploadResult.status);
    if (uploadResult.status === "success") {
      await configureBucketCors().catch(console.error);
      // makeBucketPublic().catch(console.error);
      generateV4UploadSignedUrl(process.env.BUCKET_NAME, file.name).catch(
        console.error,
      );
    }
  }

  return (
    <main>
      <h1>React Server Component: Upload</h1>
      <form action={upload}>
        <input type="file" name="file" />
        <input className="cursor-pointer" type="submit" value="Upload" />
      </form>
    </main>
  );
}
