from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import os, io, base64
from PIL import Image
import pdf2image
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(openai_api_key=os.getenv("OpenAI"))
app = FastAPI(
    title="ATS"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


input_prompt3 = """
You are an skilled ATS (Applicant Tracking System) scanner with a deep understanding of data science and ATS functionality, 
your task is to evaluate the resume against the provided job description. give me the percentage of match if the resume matches
the job description. First the output should come as percentage and then keywords missing and last final thoughts.
"""


@app.get("/")
def read_root():
    return {"Hello": "World"}


def get_gemini_response(input, pdf_cotent, prompt):
    model = genai.GenerativeModel("gemini-pro-vision")
    response = model.generate_content([input, pdf_cotent[0], prompt])
    return response.text


@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...), JD: str = Form(...)):
    contents = await file.read()
    pdf_content = await pdf_tokens(contents)  # Call pdf_tokens and await its result
    response = get_gemini_response(JD, pdf_content, input_prompt3)
    processed_response = llm.invoke(response)
    return {
        "filename": file.filename,
        "text": JD,
        "file_size": len(contents),
        "res": processed_response,
    }


async def pdf_tokens(contents):
    if contents is not None:
        images = pdf2image.convert_from_bytes(contents)

        first_page = images[0]

        img_byte_arr = io.BytesIO()
        first_page.save(img_byte_arr, format="JPEG")
        img_byte_arr = img_byte_arr.getvalue()

        pdf_parts = [
            {"mime_type": "image/jpeg", "data": base64.b64encode(img_byte_arr).decode()}
        ]
        return pdf_parts
    else:
        raise FileNotFoundError("no file uploaded!!")
