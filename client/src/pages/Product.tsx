import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useCurrency } from "../context/CurrencyTypeContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useEffect, useState } from "react";
import { StoreItemProps } from "../components/StoreItem";
import "../styles/pages/product.css";

export function Product() {
  let { state } = useLocation();
  const { getItemQuantity, increaseItemQuantity, removeFromCart } =
    useShoppingCart();
  const { currencyType, multiplier } = useCurrency();
  const [booksData, setBooks] = useState<StoreItemProps | null>(null);

  useEffect(() => {
    fetch("/api/product/" + state.id)
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <Container className="productDet">
      {booksData ? (
        <Row>
          <Col className="left" xs lg="2">
            <img src={booksData.imgUrl} />
            <br />
            {getItemQuantity(booksData.id) === 0 ? (
              <button
                className="prodButton"
                onClick={() => increaseItemQuantity(booksData.id)}
              >
                Add to cart
              </button>
            ) : (
              <button
                className="prodButton"
                onClick={() => removeFromCart(booksData.id)}
              >
                Remove
              </button>
            )}
            <BookInfo
              author={booksData.author}
              publisher={booksData.publisher}
              genres={booksData.genre}
              publication_year={booksData.publication_year}
              pages={booksData.pages}
            />
          </Col>
          <Col className="right">
            <h3>{booksData.name}</h3>
            <p>
              {booksData.rating}/5{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="star"
                viewBox="0 0 16 20"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </p>
            <p>{currencyType.format(booksData.price * multiplier)}</p>
            <div>
              {booksData.description.map((description: string, key: any) => (
                <p key={key}>{description}</p>
              ))}
            </div>
          </Col>
        </Row>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
}

const BookInfo = ({
  author,
  publisher,
  genres,
  publication_year,
  pages,
}: {
  author: string;
  publisher: string;
  genres: string[];
  publication_year: number;
  pages: number;
}) => {
  let { state } = useLocation();
  return (
    <div className="info">
      <h4>Information</h4>
      <hr />
      <div>
        <span>
          <b>Author:</b> {author}
        </span>
      </div>
      <div>
        <span>
          <b>Publisher:</b> {publisher}
        </span>
      </div>
      <div>
        <span>
          <b>Genre:</b>
        </span>
        {genres.map((genres: string, key: any) => (
          <span key={key}> {genres},</span>
        ))}
      </div>
      <div>
        <span>
          <b>Publication Year:</b> {publication_year}
        </span>
      </div>
      <div>
        <span>
          <b>Pages:</b> {pages} pages
        </span>
      </div>
    </div>
  );
};
