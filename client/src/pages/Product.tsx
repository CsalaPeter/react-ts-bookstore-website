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
  const [bookData, setBooks] = useState<StoreItemProps[] | null>(null);

  useEffect(() => {
    fetch("/api/product/" + state.bookID)
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <Container className="productDet">
      {bookData ? (
        <Row>
          <Col className="left" xs lg="2">
            <img src={bookData[0].imgUrl} />
            <br />
            {getItemQuantity(bookData[0].bookID) === 0 ? (
              <button
                className="prodButton"
                onClick={() => increaseItemQuantity(bookData[0].bookID)}
              >
                Add to cart
              </button>
            ) : (
              <button
                className="prodButton"
                onClick={() => removeFromCart(bookData[0].bookID)}
              >
                Remove
              </button>
            )}
            <BookInfo
              author={bookData[0].author}
              publisher={bookData[0].publisher}
              genres={bookData[0].genres}
              publicationYear={bookData[0].publicationYear}
              pages={bookData[0].pages}
            />
          </Col>
          <Col className="right">
            <h3>{bookData[0].bookName}</h3>
            <p>
              {bookData[0].rating}/5{" "}
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
            <p>{currencyType.format(bookData[0].price * multiplier)}</p>
            <div>
              <p>{bookData[0].description}</p>
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
  publicationYear,
  pages,
}: {
  author: string;
  publisher: string;
  genres: string | null;
  publicationYear: number;
  pages: number;
}) => {
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
        <span> {genres}</span>
      </div>
      <div>
        <span>
          <b>Publication Year:</b> {publicationYear}
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
