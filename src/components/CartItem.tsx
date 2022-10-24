import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { Button, Stack } from "react-bootstrap";
import storeItems from "../data/books.json";
import "../styles/components/cartItem.css";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
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
          {formatCurrency(item.price)}
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
      <div> {formatCurrency(item.price * quantity)}</div>
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
