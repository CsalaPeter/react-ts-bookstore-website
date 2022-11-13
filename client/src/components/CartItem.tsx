import { useShoppingCart } from "../context/ShoppingCartContext";
import { Button, Stack } from "react-bootstrap";
import storeItems from "../data/books.json";
import "../styles/components/cartItem.css";
import { useCurrency } from "../context/CurrencyTypeContext";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { currencyType, multiplier } = useCurrency();
  const { removeFromCart, decreaseItemQuantity, increaseItemQuantity } =
    useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="cartItem">
      <img className="cartItemImg" src={item.imgUrl} />
      <div className="me-auto">
        <div>{item.name} </div>
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
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
