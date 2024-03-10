"use client";

import { useRef } from "react";

const MAX_FILE_SIZE_MB = 5;

function ImageUpload({ onUpload }) {
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 0 && files[0].size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }

    const file = files[0];

    onUpload(file);

    // 需要透過 useRef 來在上傳檔案後，重製 input 的 value，不然連續上傳兩個相同的檔案會導致 value 一樣，而沒有觸發 onChange
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={inputRef}
      />
    </div>
  );
}

export default ImageUpload;
