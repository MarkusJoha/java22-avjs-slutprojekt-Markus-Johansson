import '../css/ShoppingCart.css';

export default function ShoppingCart({ cartBalance, setCartBalance, setShowCart }) {
  const products = cartBalance.reduce((acc, product) => {
    const existingProduct = acc.find((p) => p.name === product.name);


    if (existingProduct) {
      existingProduct.stock++;
      existingProduct.totalPrice += product.price;
    } else {
      acc.push({
        ...product,
        stock: 1,
        totalPrice: product.price,
      });
    }
    return acc;
  }, []);



  function calculate() {

    let totalCartValue = 0;

    for (let index = 0; index < products.length; index++) {
      totalCartValue += products[index].totalPrice;
    }

    return totalCartValue;
  }

  function handleEmptyCart() {
    if (cartBalance.length != 0) {
      setCartBalance([]);
    } else {
      alert('You need to put something in the cart before emptying it!');
    }

    setShowCart(false);
  }

  async function handleCheckout() {
    if (cartBalance.length != 0) {
      try {
        for (const product of products) {
          const productToUpdate = cartBalance.find(obj => obj.name === product.name)
          productToUpdate.stock = productToUpdate.stock - products.find(obj => obj.name === productToUpdate.name).stock
          const endPoint = productToUpdate.name
          const url = `https://webshop-507a5-default-rtdb.europe-west1.firebasedatabase.app/products/${endPoint.toLowerCase()}/stock.json`;
          const res = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productToUpdate.stock),
          });
          if (!res.ok) {
            throw new Error('Error updating stock');
          }
        }
        setCartBalance([]);
        alert('Thanks for your purchase!');
        setShowCart(false);
      } catch (error) {
        console.error(error);
        alert('An error occurred while processing your order');
      }
    } else {
      alert('Please purchase something!');
    }
  }

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {products.map((product) => (
        <div key={product.name}>
          <h3 className='productTemplate'>
            {product.name} # {product.stock}
          </h3>
          <p>Total Price: ${product.totalPrice}</p>
        </div>
      ))}
      <p>Total Cart Value: ${calculate()}</p>
      <p>Total products in Cart: {cartBalance.length}</p>
      <button onClick={handleEmptyCart}>Empty Cart</button>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}


