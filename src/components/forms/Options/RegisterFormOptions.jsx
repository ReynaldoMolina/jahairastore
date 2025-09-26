import { OrderOptions } from './OrderOptions';
import { PurchaseOptions } from './PurchaseOptions';
import { useFormContext } from '../RegisterForm';
import { ReceiptOptions } from './ReceiptOptions';

export function RegisterFormOptions({ registerPdf }) {
  const { formName } = useFormContext();

  const formOptions = {
    compras: <PurchaseOptions />,
    pedidos: <OrderOptions />,
    ventas: <ReceiptOptions register={registerPdf} formName="ventas" />,
  };

  return <>{formOptions[formName]}</>;
}
