"use client";

// import Succesbox from "@/Components/layout/SuccessBox";
// import InfoBox from "@/Components/layout/InfoBox";
import UserForm from "@/Components/layout/UserForm";
import UserTabs from "@/Components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((res) => {
        res.json().then((data) => {
          console.log(data);
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving",
      success: "Profile saved!",
      error: "Could not save",
    });
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="mt-8 ">
      <Toaster position="top-center" reverseOrder={false} />
      <UserTabs isAdmin={isAdmin} />

      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}
