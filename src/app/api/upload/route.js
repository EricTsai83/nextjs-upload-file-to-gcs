import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // with the file data in the buffer, you can do whatever you want wiht it.
  // For this, we'll just write it to the filesystem in a new location
  const path = join("/", "tmp", file.name);
  await writeFile(path, buffer);
  console.log(`open ${path} to see the uploaded file`);

  return NextResponse.json({ success: true });
}
