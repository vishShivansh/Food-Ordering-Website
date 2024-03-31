export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {
  return (
    <button
      onClick={onClick}
      className="bg-primary mt-4 text-white rounded-full px-8 py-2"
    >
      {hasSizesOrExtras ? (
        <span>Add to cart (from ${basePrice})</span>
      ) : (
        <span>Add to cart ${basePrice}</span>
      )}
    </button>
  );
}
