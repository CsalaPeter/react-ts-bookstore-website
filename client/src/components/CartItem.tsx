import { useShoppingCart } from "../context/ShoppingCartContext";
import { useCurrency } from "../context/CurrencyTypeContext";
import { StoreItemProps } from "./StoreItem";
import { Button, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import "../styles/components/cartItem.css";
import axios from "axios";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { currencyType, multiplier } = useCurrency();
  const [booksData, setBooks] = useState<StoreItemProps[]>([]);
  const { removeFromCart, decreaseItemQuantity, increaseItemQuantity } =
    useShoppingCart();

  useEffect(() => {
    axios.get("api/store").then((response) => setBooks(response.data));
  }, []);

  const item = booksData.find((i) => i.bookID === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="cartItem">
      <img className="cartItemImg" src={item.imgUrl} />
      <div className="me-auto">
        <div>{item.bookName} </div>
        <div id="price" className="text-muted">
          {currencyType.format(item.price * multiplier)}
        </div>
        <button onClick={() => increaseItemQuantity(id)} className="itemQuant">
          <i className="arrow up"></i>
        </button>
        <div>
          <span className="fs-4 quantity">{quantity}</span>
        </div>
        <button onClick={() => decreaseItemQuantity(id)} className="itemQuant">
          <i className="arrow down"></i>
        </button>
      </div>
      <div>{currencyType.format(item.price * quantity * multiplier)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.bookID)}
      >
        &times;
      </Button>
    </Stack>
  );
}
