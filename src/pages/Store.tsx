import { StoreItem } from "../components/StoreItem";
import books from "../data/books.json";
import "../styles/pages/store.css";

export function Store() {
  return (
    <>
      <div className="items">
        {books.map((book) => (
          <div key={book.id}>
            <StoreItem {...book} />
          </div>
        ))}
      </div>
    </>
  );
}
