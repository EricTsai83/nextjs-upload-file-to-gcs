"use client";
import { useState } from "react";

export default function ClientUploadPage() {
  const [file, setFile] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error(await response.text());
    } catch (error) {
      console.error("Error", error);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <input type="submit" value="upload" />
    </form>
  );
}
