/* eslint-disable jsx-a11y/alt-text */
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../AppContext";
import MenuItemTile from "./MenuItemTile";

/* eslint-disable @next/next/no-img-element */
export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const { addToCart } = useContext(CartContext);
  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 && extraIngredientPrices.length > 0;
    if (hasOptions && !showPopUp) {
      setShowPopUp(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    setShowPopUp(false);
    toast.success("Added to cart!");
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }
  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {showPopUp && (
        <div
          onClick={() => setShowPopUp(false)}
          className=" fixed inset-0  bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md"
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "600px" }}
            >
              {/* <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="mx-auto"
              /> */}

              <img
                className="mx-auto"
                width={300}
                height={300}
                src="./pizza2.jpeg"
                alt=""
              />

              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2 ">
                {description}
              </p>

              {sizes?.length > 0 && (
                <div className=" py-2">
                  <h3 className="text-center text-gray-700">Pick your sizes</h3>
                  {sizes.map((size) => (
                    // eslint-disable-next-line react/jsx-key
                    <label className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input
                        type="radio"
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size?.name}
                        name="size"
                      />{" "}
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngredientPrices?.length > 0 && (
                <div className=" py-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {extraIngredientPrices.map((extraThing) => (
                    // eslint-disable-next-line react/jsx-key
                    <label className="flex items-center gap-2 p-4 border rounded-md mb-1">
                      <input
                        type="checkbox"
                        onClick={(ev) => handleExtraThingClick(ev, extraThing)}
                        name={extraThing.name}
                      />
                      {extraThing.name} +${extraThing.price}
                    </label>
                  ))}
                </div>
              )}
              <button
                className="primary sticky bottom-2"
                onClick={handleAddToCartButtonClick}
                type="button"
              >
                Add to cart ${selectedPrice}
              </button>
              <button className="mt-2" onClick={() => setShowPopUp(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
