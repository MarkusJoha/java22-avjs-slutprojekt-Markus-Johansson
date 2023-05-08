import '../css/Navbar.css';

export default function Navbar({ setShowCart, cartBalance }) {

  console.log(cartBalance.length);

  function showProduct(event) {
    event.preventDefault();
    setShowCart(false);
  }

  function showCart(event) {
    event.preventDefault();
    setShowCart(true);
  }

  return (
    <div className="navbar">
      <a href="/" className='link' onClick={showProduct}>VegFruit</a>
      <a href="/" className='link' onClick={showProduct}>Products</a>
      <a href="#" className='link' onClick={showCart}>🛒</a>
      <h4>{cartBalance.length}</h4>
    </div>
  )
}