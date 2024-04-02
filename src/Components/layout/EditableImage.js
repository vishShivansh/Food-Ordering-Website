/* eslint-disable react-hooks/exhaustive-deps */
import { app } from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function EditableImage({ image, setImage }) {
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0);

  useEffect(() => {
    if (file) {
      handleFileChange(file);
    }
  }, [file]);

  const handleFileChange = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
    toast.success("Image uploaded successfully");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {file && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={formData.avatar}
          width={250}
          height={250}
          alt="'avatar"
        ></Image>
      )}
      {!file && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}

      <label>
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <span className="block cursor-pointer border border-gray-300 rounded-lg p-2 text-center">
          Edit
        </span>
      </label>
    </>
  );
}
