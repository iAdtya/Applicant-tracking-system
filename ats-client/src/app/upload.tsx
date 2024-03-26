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
        <button className="btn btn-primary ml-10">SUBMIT</button>
      </div>
      <div className="flex grid-cols-2 justify-center mt-10">
        <div>
          <span>Job Description:</span>
          <form onSubmit={handleSubmit}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-80 h-96 rounded-xl"
            ></textarea>
          </form>
        </div>
        <div className="ml-10 mt-5">
          <div className="card w-72 h-96 bg-primary text-primary-content">
            <div className="card-body  flex justify-center items-center">
              <p>
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPage;
