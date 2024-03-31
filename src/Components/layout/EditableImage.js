import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function EditableImage({ image, setImage }) {
  const [link, setLink] = useState(false);

  async function handleFileChange(ev) {
    /* const files = ev.target.files;
    
        if (files?.length === 1) {
          const data = new FormData();
          const file = data.set("file ", files[0]);
          const response = await fetch("/api/upload", {
            method: "POST",
            body: data,
          });
          const link = await response.json();
          setImage(link);
        } */
    // console.log(ev.target.files);

    //adding Toast ...........
    setLink(false);
    const url = URL.createObjectURL(ev.target.files[0]);
    if (url) {
      setLink(true);
      setImage(url);
    }

    toast.success("Upload complete!");
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={image}
          width={250}
          height={250}
          alt="'avatar"
        ></Image>
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}

      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block cursor-pointer border border-gray-300 rounded-lg p-2 text-center">
          Edit
        </span>
      </label>
    </>
  );
}
