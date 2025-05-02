import React from "react";
import { OrderContext } from "../Context/OrderContext";
import { useGetData } from "../Hooks/useGetData";
import { Loading } from "../Loading";
import { ReactComponent as SvgDelete } from "./delete.svg";
import { getOrderTotals } from "../Hooks/getOrderTotals";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { productList, setProductList, setOrderTotals } = React.useContext(OrderContext);
  const { data, isLoading } = useGetData('products/' + product.productId);
  const [quantity, setQuantity] = React.useState(product.quantity);

  function findId() {
    const index = productList.findIndex((e) => e.productId === product.productId);
    return index;
  }

  function reduceQuantity() {
    if (quantity > 1) {
      const newList = productList.map((item, idx) =>
        idx === findId() ? { ...item, quantity: item.quantity - 1 } : item
      )
      setProductList(newList);
      setQuantity((prev) => prev - 1);
      setOrderTotals(getOrderTotals(newList));
    }
  }

  function addQuantity() {
    const newList = productList.map((item, idx) =>
      idx === findId() ? { ...item, quantity: item.quantity + 1 } : item
    )
    setProductList(newList);
    setQuantity((prev) => prev + 1);
    setOrderTotals(getOrderTotals(newList));
  }

  if (isLoading) return <Loading/>;

  return (
    <div
      key={product.productId}
      className="flx flx-center product-card"
    >
      <span className="flx flx-center product-id">{product.productId}</span>

      <div className="flx product-info-container">
        <span className="flx product-name">{data.name}</span>
        <div className="flx product-info">
          <span className="product-price">$ {(product.sellPrice).toFixed(2)}</span>
          <div className="flx flx-center quantity-container">
            <button
              className={`quantity-button ${quantity === 1 && "quantity-button-disabled"}`}
              type="button"
              onClick={() => reduceQuantity()}
            >-</button>
            <span className="flx flx-center quantity">{quantity}</span>
            <button
              className="quantity-button"
              type="button"
              onClick={() => addQuantity()}
            >+</button>
          </div>
        </div>
      </div>
      <span className="flx subtotal">$ {(product.sellPrice * quantity).toFixed(2)}</span>
      <SvgDelete
        className="product-delete"
        onClick={() => {
          const newList = productList.filter(e => e.productId !== product.productId);
          setProductList(newList);
          setOrderTotals(getOrderTotals(newList));
        }}
      />
    </div>
  )
}

export { ProductCard };