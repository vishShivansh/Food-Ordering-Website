/* eslint-disable @next/next/no-img-element */
"use client";
import { useProfile } from "@/Components/UseProfile";
import Right from "@/Components/icons/Right";
import UserTabs from "@/Components/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }
  if (!data.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button" href={"/menu-items/new"}>
          <span> Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        {menuItems?.length > 0 && (
          <h2 className="mt-8 text-sm text-gray-500">Edit MenuItem:</h2>
        )}
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map(
              (item) => (
                {
                  /* eslint-disable-next-line react/jsx-key */
                },
                (
                  <Link
                    href={"/menu-items/edit/" + item._id}
                    className=" bg-gray-200 rounded-lg p-4"
                  >
                    <div className="relative">
                      <Image
                        src={item.link}
                        alt="PizzaImage"
                        width={200}
                        height={200}
                        className="rounded-md"
                      />
                    </div>
                    <div className="text-center">{item.name}</div>
                  </Link>
                )
              )
            )}
        </div>
      </div>
    </section>
  );
}
