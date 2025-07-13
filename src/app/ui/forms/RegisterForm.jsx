'use client';

import { useState, createContext, useContext } from 'react';
import { calculateTotals } from '@/app/lib/calculateTotals';
import {
  FormContainer,
  FormDate,
  FormId,
  FormDiv,
  FormButtons,
  FormSelect,
  FormError,
} from '@/app/ui/forms/FormInputs/formInputs';
import FormDetail from './RegisterForm/DetailList/FormDetail';
import { ProductSearch } from './RegisterForm/ProductList/ProductSearch';
import {
  createSale,
  updateSale,
  createOrder,
  updateOrder,
  createPurchase,
  updatePurchase,
} from '@/app/lib/actions';
import { useActionState } from 'react';
import { FormSubtotals } from './RegisterForm/RegisterSubtotals';
import { RegisterFormOptions } from './Options/RegisterFormOptions';

const FormContext = createContext();
export function useFormContext() {
  const context = useContext(FormContext);
  return context;
}

export function RegisterForm({
  children,
  isNew,
  register,
  registerPdf = {},
  registerId = '',
  detailList = [],
  convert = false,
  allowEmpty = false,
  abono = 0,
  selectData,
  formName,
}) {
  const formInfo = {
    ventas: { create: createSale, update: updateSale, holder: 'Venta' },
    pedidos: { create: createOrder, update: updateOrder, holder: 'Pedido' },
    compras: {
      create: createPurchase,
      update: updatePurchase,
      holder: 'Compra',
    },
  };
  const holder = formInfo[formName].holder;
  const actions = formInfo[formName];
  const action = isNew ? actions.create : actions.update;
  const originalList = detailList;

  const [productList, setProductList] = useState(isNew ? [] : detailList);
  const totals = convert
    ? calculateTotals(productList, convert)
    : calculateTotals(productList);
  const [formTotals, setFormTotals] = useState(totals);
  const [formAbono, setFormAbono] = useState(abono);

  const [state, formAction, isPending] = useActionState(action, {
    message: '',
  });

  function handleRegister(formData) {
    if (!allowEmpty && productList.length === 0) {
      alert('Agrega productos a la lista');
      return;
    }

    if (isNew) {
      formAction({ formData, productList });
    } else {
      const payload = {
        id: registerId,
        formData,
        productList,
        originalList,
      };
      formAction(payload);
    }
  }

  return (
    <FormContainer action={handleRegister} wider={true}>
      <FormContext.Provider
        value={{
          productList,
          setProductList,
          formTotals,
          setFormTotals,
          formAbono,
          setFormAbono,
          formName,
          register,
        }}
      >
        <FormId
          holder={isNew ? `Crear ${holder.toLowerCase()}` : holder}
          value={isNew ? '' : registerId}
        />

        <FormDiv>
          <FormSelect
            value={
              isNew
                ? formName === 'ventas'
                  ? 0
                  : ''
                : formName === 'compras'
                ? register.Id_proveedor
                : register.Id_cliente
            }
            name={formName === 'compras' ? 'Id_proveedor' : 'Id_cliente'}
            data={selectData}
          />
          <FormDate date={isNew ? '' : register.Fecha} />
        </FormDiv>

        <FormSubtotals credit={isNew ? false : register.Credito} />

        <ProductSearch open={isNew}>{children}</ProductSearch>

        <FormDetail />

        {!isNew && <RegisterFormOptions registerPdf={registerPdf} />}

        <FormError isPending={isPending} state={state} />

        <FormButtons
          link={`/${formName}`}
          isNew={isNew}
          isPending={isPending}
        />
      </FormContext.Provider>
    </FormContainer>
  );
}
