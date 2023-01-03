import { StoreItemProps } from "../components/StoreItem";
import { StoreItem } from "../components/StoreItem";
import { useEffect, useState } from "react";
import "../styles/pages/store.css";

export function Store() {
  const [booksData, setBooks] = useState<StoreItemProps[]>([]);

  useEffect(() => {
    fetch("/api/store")
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <>
      <div className="items">
        {booksData.map((book) => (
          <div key={book.bookID}>
            <StoreItem {...book} />
          </div>
        ))}
      </div>
    </>
  );
}
