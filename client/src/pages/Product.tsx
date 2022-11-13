import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useCurrency } from "../context/CurrencyTypeContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import "../styles/pages/product.css";

export function Product() {
  let { state } = useLocation();
  const { getItemQuantity, increaseItemQuantity, removeFromCart } =
    useShoppingCart();
  let quantity = getItemQuantity(state.id);
  console.log(state);
  const { currencyType, multiplier } = useCurrency();
  return (
    <Container className="productDet">
      <Row>
        <Col className="left" xs lg="2">
          <img src={state.imgUrl} />
          <br />
          {quantity === 0 ? (
            <button
              className="prodButton"
              onClick={() => increaseItemQuantity(state.id)}
            >
              Add to cart
            </button>
          ) : (
            <button
              className="prodButton"
              onClick={() => removeFromCart(state.id)}
            >
              Remove
            </button>
          )}
          <BookInfo />
        </Col>
        <Col className="right">
          <h3>{state.name}</h3>
          <p>{currencyType.format(state.price * multiplier)}</p>
          <div>
            {state.description.map((description: string, key: any) => (
              <p key={key}>{description}</p>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const BookInfo = () => {
  let { state } = useLocation();
  return (
    <div className="info">
      <h4>Information</h4>
      <hr />
      <div>
        <span>
          <b>Author:</b> {state.author}
        </span>
      </div>
      <div>
        <span>
          <b>Publisher:</b> {state.publisher}
        </span>
      </div>
      <div>
        <span>
          <b>Genre:</b>
        </span>
        {state.genre.map((genres: string, key: any) => (
          <span key={key}> {genres},</span>
        ))}
      </div>
      <div>
        <span>
          <b>Publication Year:</b> {state.publication_year}
        </span>
      </div>
      <div>
        <span>
          <b>Pages:</b> {state.pages} pages
        </span>
      </div>
    </div>
  );
};

const BuyOptions = () => {
  let { state } = useLocation();
};
