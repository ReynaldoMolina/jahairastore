import { calculateTotals } from '@/lib/calculate-totals';
import { useFormContext } from '../../register';
import { Trash, Trash2 } from 'lucide-react';

export function ChangeQuantity({ product, overrideLeft, convert }) {
  const { productList, setProductList, setFormTotals } = useFormContext();

  function findId(product) {
    const index = productList.findIndex(
      (e) => e.Id_producto === product.Id_producto
    );
    return index;
  }

  function reduceQuantity() {
    const newList = productList.map((item, idx) =>
      idx === findId(product)
        ? {
            ...item,
            Cantidad: item.Cantidad - 1,
            Existencias: item.Existencias + 1,
          }
        : item
    );
    setProductList(newList);
    setFormTotals(calculateTotals(newList, convert));
  }

  function deleteProduct() {
    const newList = productList.filter(
      (e) => e.Id_producto !== product.Id_producto
    );
    setProductList(newList);
    setFormTotals(calculateTotals(newList, convert));
  }

  function addQuantity() {
    const newList = productList.map((item, idx) =>
      idx === findId(product)
        ? {
            ...item,
            Cantidad: item.Cantidad + 1,
            Existencias: item.Existencias - 1,
          }
        : item
    );
    setProductList(newList);
    setFormTotals(calculateTotals(newList, convert));
  }

  return (
    <div className="flex border-1 md:my-0 rounded-xl overflow-hidden border-neutral-200 dark:border-neutral-700">
      <MinusButton
        icon="-"
        quantity={product.Cantidad}
        action={() => reduceQuantity()}
        deleteAction={() => deleteProduct()}
      />
      <span className="flex justify-center items-center text-xs w-12.5 py-1">
        {product.Cantidad}
      </span>
      <QuantityButton
        icon="+"
        overrideLeft={overrideLeft}
        disabled={overrideLeft ? false : product.Existencias <= 0}
        action={() => addQuantity()}
      />
    </div>
  );
}

function MinusButton({ quantity, icon, action, deleteAction }) {
  if (quantity === 1)
    return (
      <button
        className="flex items-center justify-center min-w-6 text-xs bg-neutral-200 dark:bg-neutral-700 cursor-pointer"
        type="button"
        onClick={deleteAction}
      >
        <Trash2 className="size-3.5 ml-0.5" />
      </button>
    );

  return <QuantityButton icon={icon} action={action} />;
}

function QuantityButton({
  icon,
  action,
  overrideLeft = false,
  disabled = false,
}) {
  function handleButton() {
    if (overrideLeft) {
      action();
    } else if (!disabled) {
      action();
    }
  }

  return (
    <button
      className={`min-w-6 text-xs bg-neutral-200 dark:bg-neutral-700 ${
        !disabled && 'cursor-pointer'
      }`}
      type="button"
      onClick={handleButton}
    >
      {disabled ? '' : icon}
    </button>
  );
}
