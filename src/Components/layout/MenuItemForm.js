"use client";
import EditableImage from "@/Components/layout/EditableImage";
import MenuItemPriceProps from "@/Components/layout/MenuItemPriceProps";
import { useEffect, useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [link, setLink] = useState(menuItem?.link || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(menuItem?.category || "");
  console.log(menuItem.link);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          name,
          link,
          description,
          category,
          basePrice,
          sizes,
          extraIngredientPrices,
        })
      }
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div className="">
          <EditableImage link={link} setLink={setLink} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Desciption</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Category</label>

          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                // eslint-disable-next-line react/jsx-key
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>

          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingredients prices"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
