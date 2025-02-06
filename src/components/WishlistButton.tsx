import { HeartIcon } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";

interface WishlistButtonProps {
  productId: IProductId;
  className?: string;
}

export function WishlistButton({
  productId,
  className = "",
}: WishlistButtonProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(productId);

  return (
    <button
      onClick={() => toggleWishlist(productId)}
      className={`p-1.5 rounded-full bg-white/80 hover:bg-white ${className}`}
    >
      <HeartIcon
        className={`size-5 ${
          isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
        }`}
      />
    </button>
  );
}
