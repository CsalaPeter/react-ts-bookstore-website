import { StoreItemProps } from "./StoreItem";
import { useEffect, useState } from "react";
import { Card, CardImg } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import "../styles/components/carousel.css";

export function BooksCarousel() {
  const [bestBooks, setBooks] = useState<StoreItemProps[]>([]);

  useEffect(() => {
    fetch("/api/bestRated")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <>
      <h2>Best Rated Books</h2>
      <div className=" align-items-center carouselWrapper container-fluid">
        {bestBooks.map((book, key) => (
          <Card key={key}>
            <CardImg className="carouselImg" src={book.imgUrl} />
            <CardHeader>{book.name}</CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
}
