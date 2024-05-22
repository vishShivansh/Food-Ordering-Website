import { app } from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { IncomingForm } from "formidable";
import { promises as fs } from "fs";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js built-in body parser
  },
};

export async function POST(req, res) {
  console.log(req);
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "Form parse error" });
    }

    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const fileBuffer = await fs.readFile(file);
      const uploadTask = uploadBytesResumable(storageRef, fileBuffer);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          return res.status(500).json({ error: "Upload error" });
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          res.status(200).json({ downloadURL });
        }
      );
    } catch (error) {
      console.error("Error uploading to Firebase:", error);
      res.status(500).json({ error: "Upload error" });
    }
  });
}
