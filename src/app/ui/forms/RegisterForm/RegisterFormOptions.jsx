import { OrderOptions } from '../Options/OrderOptions';
import { PurchaseOptions } from '../Options/PurchaseOptions';
import { useFormContext } from '../RegisterForm';

export function RegisterFormOptions() {
  const { formName } = useFormContext();

  const formOptions = {
    compras: <PurchaseOptions />,
    pedidos: <OrderOptions />,
  };

  return <>{formOptions[formName]}</>;
}
