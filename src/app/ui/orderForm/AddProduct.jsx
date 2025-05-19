'use client';

import Add from "@/app/ui/actiontools/add.svg";

export default function AddProduct({ id }) {
  const isInList = false;

  return (
    <button
      type="button"
      className={`flex rounded-xl ${isInList ? "cursor-not-allowed" : "cursor-pointer"}`}
      // onClick={() => {
      //   if (!isInList) {
      //     addProduct(register);
      //   } else {
      //     alert('El producto ya está agregado');
      //   }
      // }}
      onClick={() => {
        if (!isInList) {
          alert(`Producto ${id} agregado`);
        }
      }}
      >
        <Add className={`size-8 min-w-8 ${isInList ? "fill-neutral-600" : "hover:fill-green-300"}`} />
    </button>
  );
}