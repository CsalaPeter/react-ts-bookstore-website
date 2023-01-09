import { StoreItemProps } from "../components/StoreItem";
import { StoreItem } from "../components/StoreItem";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/pages/store.css";

export function Store() {
  const [booksData, setBooks] = useState<StoreItemProps[]>([]);

  useEffect(() => {
    axios.get("api/store").then((response) => setBooks(response.data));
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
