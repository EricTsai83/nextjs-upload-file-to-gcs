import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-4xl">Home Page</h1>
      <Link className="text-cyan-400 cursor-pointer" href="/client-upload-page">
        upload file by using API in client component
      </Link>
      <Link className="text-blue-950 cursor-pointer" href="/server-upload-page">
        upload file by using server action in server component
      </Link>
      <Link className="text-red-500 cursor-pointer" href="/upload-file-to-gcs">
        upload file to gcs by using server action
      </Link>
    </main>
  );
}
