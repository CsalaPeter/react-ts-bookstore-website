import { useShoppingCart } from "../context/ShoppingCartContext";
import { useCurrency } from "../context/CurrencyTypeContext";
import { StoreItemProps } from "./StoreItem";
import { Offcanvas, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { CartItem } from "./CartItem";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const { currencyType, multiplier } = useCurrency();
  const [booksData, setBooks] = useState<StoreItemProps[]>([]);
  const [post, setPost] = useState(null);
  let price: number;

  useEffect(() => {
    axios.get("api/store").then((response) => setBooks(response.data));
  }, []);

  function placeOrder(bookNames: string, totalPrice: number) {
    axios
      .post("api/placeOrder", {
        bookNames: bookNames,
        totalPrice: totalPrice,
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Books in Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {currencyType.format(
              cartItems.reduce((total, cartItem) => {
                const item = booksData.find((i) => i.bookID === cartItem.id);
                return (price =
                  (total + (item?.price || 0) * cartItem.quantity) *
                  multiplier);
              }, 0)
            )}
          </div>
          <button onClick={() => placeOrder("Test book", price)}>
            Place Order
          </button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
