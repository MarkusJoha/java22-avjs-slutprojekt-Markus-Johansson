import { useState } from 'react'
import '../css/Product.css'
export default function Product({ img, name, price, description, stock, addProductToCart }) {
    const [productStock, setProductStock] = useState(stock);

    console.log('ProductStock', productStock);

    function addProduct() {
        addProductToCart(prevCart => [...prevCart, { name, price, stock, description, img }]);
        setProductStock(productStock - 1);
    }

    return (
        <div className='product'>
            <img src={img} />
            <h2>{name}</h2>
            <h3>${price}</h3>
            <p>{description}</p>
            <h3>Available: {productStock}</h3>
            <button onClick={addProduct} disabled={productStock <= 0}>Add to Cart</button>
            {productStock < 1 && <p>Out of Stock</p>}
        </div>
    )
}