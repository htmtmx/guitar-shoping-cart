// 'use client';
import PropTypes from "prop-types";
export default function Header({ cart, setCart }) {

  const handleClick = (guitarId, opt) => {
    const updatedCart = [...cart];
    const idGuitar = cart.findIndex(guitar => guitar.id === guitarId);
    if (opt === 1) {
      updatedCart[idGuitar].quantity--;
    } else if (opt === 2) {
      updatedCart[idGuitar].quantity++;
    } else if (opt === 3) {
      updatedCart.splice(idGuitar);
    }
    if (updatedCart[idGuitar].quantity === 0) {
      updatedCart.splice(idGuitar);
    }
    setCart(updatedCart);
  };

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div
              className="carrito"
            >
              <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

              <div id="carrito" className="bg-white p-3">
                {cart.length === 0 ?
                  <p className="text-center">El carrito esta vacio</p>
                  :
                  <div id="contenedor_carrito">
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map(item => 
                          <tr key={item.id}>
                            <td>
                              <img className="img-fluid" src={`/img/${item.image}.jpg`} alt=" Imagen Guitarra " />
                            </td>
                            <td>{item.name}</td>
                          
                            <td className="fw-bold">
                              ${item.price}
                            </td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={()=> handleClick(item.id, 1)}
                              >
                                -
                              </button>
                              {item.quantity}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={
                                  () => handleClick(item.id, 2)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={()=> handleClick(item.id, 3)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    
                    <p className="text-end">Total pagar: <span className="fw-bold">
                      {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                    </span></p>
                    <button className="btn btn-dark w-100 mt-3 p-2"
                      onClick={()=> setCart([])}
                    >Vaciar Carrito</button>
                  </div>
                  }  
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired
};