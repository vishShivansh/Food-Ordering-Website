/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { app } from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  const session = useSession();
  if (!link) {
    useEffect(() => {
      setLink(session?.data?.user?.image);
    }, [session]);
  }
  async function handleFileChange(ev) {
    const file = ev.target.files[0];
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);
        setLink(downloadURL);
      }
    );
    // await toast.promise(uploadPromise, {
    //   loading: "Uploading...",
    //   success: "Uploaded successfully",
    //   error: "Error",
    // });
  }

  return (
    <>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          width={250}
          height={250}
          alt="avatar"
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
