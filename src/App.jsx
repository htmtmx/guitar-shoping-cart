import { useState, useEffect } from "react";
import { Header, ItemShop } from "./components";
import { db } from "./data/db";
function App() {
  const [data, setData] = useState([]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (db) {
      setData(db);
    }
  }, []);

  function addToCart(item) {
    const idItemExists = cart.findIndex(guitar => guitar.id === item.id);
    if (idItemExists === -1) {
      item.quantity = 1;
      setCart([...cart, item]);
    } else if (idItemExists >= 0) {
      const updatedCart = [...cart];
      updatedCart[idItemExists].quantity++;
      setCart(updatedCart);
    }
  }

  return (
    <>
      <Header cart={cart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map(guitar =>
              <ItemShop
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}
              />
            )
          }


        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  );
}

export default App;
