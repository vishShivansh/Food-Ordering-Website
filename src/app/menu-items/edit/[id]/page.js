"use client";
import DeleteButton from "@/Components/DeleteButton";
import { useProfile } from "@/Components/UseProfile";
import Left from "@/Components/icons/Left";
import MenuItemForm from "@/Components/layout/MenuItemForm";
import UserTabs from "@/Components/layout/UserTabs";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function EditMenuItemPage() {
  const { id } = useParams();
  const { loading, data } = useProfile();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, [id]);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item...",
      success: "Saved",
      error: "Error",
    });

    setRedirectToItems(true);
  }
  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });
    setRedirectToItems(true);
  }

  if (loading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an admin";
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  return (
    <section className="mt-8">
      <Toaster position="top-center" reverseOrder={false} />
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-auto pl-4">
          <DeleteButton
            label="Delete this menu item"
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
    </section>
  );
}
