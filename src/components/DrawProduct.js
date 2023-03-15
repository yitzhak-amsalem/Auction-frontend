import React from "react";
import "../css/Product.css"

export default function DrawProduct({productToPaint}) {
    const product = productToPaint;
    return (
        <div id={"product-container"}>
            <p>{product.name}</p>
            <img alt={product.description} src={product.imageLink}/>
        </div>
    );
}
