import "../styles/components/storeItem.css";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useCurrency } from "../context/CurrencyTypeContext";
import { Link } from "react-router-dom";

export type StoreItemProps = {
  id: number;
  name: string;
  author: string;
  publisher: string;
  genre: string[];
  publication_year: number;
  price: number;
  imgUrl: string;
  pages: number;
  description: string[];
  rating: number;
};

export function StoreItem({ id, name, author, price, imgUrl }: StoreItemProps) {
  const { getItemQuantity, increaseItemQuantity, removeFromCart } =
    useShoppingCart();
  let quantity = getItemQuantity(id);
  const { currencyType, multiplier } = useCurrency();

  return (
    <div className="bookCard">
      <Link
        to="/product"
        state={{
          id,
        }}
      >
        <div className="coverImage">
          <img src={imgUrl} />
        </div>
      </Link>
      <div className="body">
        <h3 className="bookName">{name}</h3>
        <h4 className="bookAuthor">{author}</h4>
      </div>
      <div className="footer">
        <div className="price">{currencyType.format(price * multiplier)}</div>
        {quantity === 0 ? (
          <button
            className="cardButton"
            onClick={() => increaseItemQuantity(id)}
          >
            Add to cart
          </button>
        ) : (
          <button className="cardButton" onClick={() => removeFromCart(id)}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
