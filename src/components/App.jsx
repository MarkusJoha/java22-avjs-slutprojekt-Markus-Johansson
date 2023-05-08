import '../css/App.css';
import Product from './Product';
import { useEffect, useState } from 'react';
import ShoppingCart from './ShoppingCart';
import Navbar from './Navbar';

export default function App() {
    const [products, setProducts] = useState([]);
    const [cartBalance, setCartBalance] = useState([]);
    const [showCart, setShowCart] = useState(false);

    async function getProducts() {
        const res = await fetch('https://webshop-507a5-default-rtdb.europe-west1.firebasedatabase.app/products/.json');
        const data = await res.json();

        const newProducts = Object.values(data).map(p => {
            return {
                img: p.img,
                name: p.name,
                price: p.price,
                description: p.description,
                stock: p.stock,
            }
        });
        setProducts(newProducts);
    }
    useEffect(() => {
        getProducts();
    }, [])
    console.log('App cartBalance: ', cartBalance);
    return (
        <>
            <Navbar showCart={showCart} setShowCart={setShowCart} cartBalance={cartBalance} />
            {showCart ? (
                <ShoppingCart cartBalance={cartBalance} setCartBalance={setCartBalance} setShowCart={setShowCart} />
            ) : (
                <div className="result">
                    {products.map((p) => (
                        <Product
                            key={p.name}
                            addProductToCart={setCartBalance}
                            img={p.img}
                            name={p.name}
                            price={p.price}
                            description={p.description}
                            stock={p.stock}
                        />
                    ))}
                </div>
            )}
        </>

    )
}
