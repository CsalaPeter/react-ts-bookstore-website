import { useShoppingCart } from "../context/ShoppingCartContext";
import { useCurrency } from "../context/CurrencyTypeContext";
import { StoreItemProps } from "./StoreItem";
import { Offcanvas, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CartItem } from "./CartItem";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const { currencyType, multiplier } = useCurrency();
  const [booksData, setBooks] = useState<StoreItemProps[]>([]);

  useEffect(() => {
    fetch("/api/store")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

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
                const item = booksData.find((i) => i.id === cartItem.id);
                return (
                  (total + (item?.price || 0) * cartItem.quantity) * multiplier
                );
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
