import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { useCurrencyType } from "./hooks/useCurrencyType";
import { CurrencyTypeProvider } from "./context/CurrencyTypeContext";

function App() {
  return (
    <CurrencyTypeProvider>
      <ShoppingCartProvider>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
          </Routes>
        </div>
      </ShoppingCartProvider>
    </CurrencyTypeProvider>
  );
}

export default App;
