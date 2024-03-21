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
        <div className="grid grid-cols-3 gap-4">
          <div className="col-start-2 flex items-center justify-center">
            <div className="text-center max-w-2xl">
              <h1 className="text-5xl font-bold text-accent">
                Applicant Tracking System!!
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPage;

// <div>
//   <div className="text-center">
//     <h1 className="text-5xl font-bold text-accent">
//       Applicant Tracking System!!
//     </h1>
//   </div>
//   <form
//     onSubmit={handleSubmit}
//     className="justify-center items-center flex"
//   >
//     <div className="w-80">
//       <textarea
//         className="textarea textarea-primary w-[68vh] "
//         placeholder="Bio"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       ></textarea>
//     </div>

//   </form>
// </div>
