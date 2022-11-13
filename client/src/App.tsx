import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { CurrencyTypeProvider } from "./context/CurrencyTypeContext";
import { Product } from "./pages/Product";

function App() {
  return (
    <CurrencyTypeProvider>
      <ShoppingCartProvider>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </div>
      </ShoppingCartProvider>
    </CurrencyTypeProvider>
  );
}

export default App;
