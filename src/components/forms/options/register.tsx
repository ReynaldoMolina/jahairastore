import { OrderOptions } from './order';
import { PurchaseOptions } from './purchase';
import { useFormContext } from '../register';
import { ReceiptOptions } from './receipt';

export function RegisterFormOptions({ registerPdf }) {
  const { formName } = useFormContext();

  const formOptions = {
    compras: <PurchaseOptions />,
    pedidos: <OrderOptions />,
    ventas: <ReceiptOptions register={registerPdf} formName="ventas" />,
  };

  return <>{formOptions[formName]}</>;
}
