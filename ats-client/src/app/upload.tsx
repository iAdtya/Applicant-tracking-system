"use client";
import { useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [text, setText] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const fileInput = event.target.elements.file;
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("JD", text);

    const response = await axios.post(
      "http://localhost:8000/uploadfile/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          className="textarea textarea-primary"
          placeholder="Bio"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="flex">
          <input
            type="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs flex"
            accept=".pdf"
            name="file"
          />
          <button className="btn btn-primary ml-56" type="submit">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;
