import uniqid from "uniqid";

export async function POST(req) {
  const data = await req.formData();
  if (data.get("file ")) {
    // upload the file by azazon aws
    const file = data.get("file ");
    const ext = file.name.split(".").slice(-1)[0];
    const newFileName = uniqid() + "." + ext;
  }

  return Response.json(true);
}
