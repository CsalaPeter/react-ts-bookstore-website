import "../styles/components/storeItem.css";

type StoreItemProps = {
  id: number;
  name: string;
  author: string;
  genre: string;
  publication_year: number;
  price: number;
  imgUrl: string;
};

export function StoreItem({
  id,
  name,
  author,
  genre,
  publication_year,
  price,
  imgUrl,
}: StoreItemProps) {
  return (
    <div className="card">
      <div className="image">
        <img src={imgUrl} />
      </div>
      <div className="body">
        <h3>{name}</h3>
        <h4>{author}</h4>
      </div>
      <div className="footer">
        <button>Add to cart</button>
        <span className="price">{price}$</span>
      </div>
    </div>
  );
}
