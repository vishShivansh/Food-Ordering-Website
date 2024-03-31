"use client";
import DeleteButton from "@/Components/DeleteButton";
import { useProfile } from "@/Components/UseProfile";
import UserTabs from "@/Components/layout/UserTabs";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating category..."
        : "Creating your new category...",
      success: editedCategory ? "Category updated" : "Category created",
      error: "Error, sorry...",
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "error",
    });

    fetchCategories();
  }

  if (profileLoading) {
    return "Loading user info...";
  }
  if (!profileData.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Update category" : "New category name"}
              {editedCategory && (
                <>
                  <b>:{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => {
                setCategoryName(ev.target.value);
              }}
            />
          </div>
          <div className="gap-2 flex pb-2">
            <button type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            {editedCategory && (
              <button
                type="button"
                onClick={() => {
                  setEditedCategory(null);
                  setCategoryName("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
      <div>
        {categories?.length > 0 && (
          <h2 className="mt-8 text-sm text-gray-500">Existing categories:</h2>
        )}
        {categories?.length > 0 &&
          categories.map(
            (c) => (
              {
                /* eslint-disable-next-line react/jsx-key */
              },
              (
                <div className="flex items-center bg-gray-100 rounded-xl p-2 px-4  gap-1 mb-1">
                  <div className="grow ">{c.name}</div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditedCategory(c);
                        setCategoryName(c.name);
                      }}
                    >
                      Edit
                    </button>
                    <DeleteButton
                      label="Delete"
                      onDelete={() => handleDeleteClick(c._id)}
                    />
                  </div>
                </div>
              )
            )
          )}
      </div>
    </section>
  );
}
