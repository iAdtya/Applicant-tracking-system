"use client";
import { useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement | null;
    if (fileInput && fileInput.files) {
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
      setResponse(response.data["res"]);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-14">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl font-bold text-accent">
            Applicant Tracking System!!
          </h1>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          accept=".pdf"
        />
        <button className="btn btn-primary ml-10" onClick={handleSubmit}>
          SUBMIT
        </button>
      </div>
      <div className="flex grid-cols-2 justify-center mt-10">
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-80 h-96 rounded-xl p-4 textarea textarea-primary"
            placeholder="Job Description :-"
          ></textarea>
        </div>
        <div className="ml-10 ">
          <div className="card w-80 h-96 bg-primary text-primary-content">
            <div className="card-body flex justify-center items-center">
              <p>{response}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPage;
