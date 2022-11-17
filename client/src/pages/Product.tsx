import { Col, Container, Row } from "react-bootstrap";
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
  const [booksData, setBooks] = useState<StoreItemProps>({
    id: 0,
    name: "",
    author: "",
    publisher: "",
    genre: [""],
    publication_year: 0,
    price: 0,
    imgUrl: "",
    pages: 0,
    description: [""],
    rating: 0,
  });
  let quantity = getItemQuantity(booksData.id);

  useEffect(() => {
    fetch("/api/product/" + state.id)
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  console.log(booksData);
  return (
    <Container className="productDet">
      <Row>
        <Col className="left" xs lg="2">
          <img src={booksData.imgUrl} />
          <br />
          {quantity === 0 ? (
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
          <p>{currencyType.format(booksData.price * multiplier)}</p>
          <div>
            {booksData.description.map((description: string, key: any) => (
              <p key={key}>{description}</p>
            ))}
          </div>
        </Col>
      </Row>
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
