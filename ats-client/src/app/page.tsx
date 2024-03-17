import Image from "next/image";
import UploadPage from "./upload";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 absolute inset-0 h-full w-full bg-gray-800 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_top,transparent_0%,#000_60%)] ">
      <UploadPage />
    </main>
  );
}



