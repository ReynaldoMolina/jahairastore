import { OrderOptions } from './order-options';
import { PurchaseOptions } from './purchase-options';
import { useFormContext } from '../register';
import { ReceiptOptions } from './receipt-options';

export function RegisterFormOptions({ registerPdf }) {
  const { formName } = useFormContext();

  const formOptions = {
    compras: <PurchaseOptions />,
    pedidos: <OrderOptions />,
    ventas: <ReceiptOptions register={registerPdf} formName="ventas" />,
  };

  return <>{formOptions[formName]}</>;
}
