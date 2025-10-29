'use client';

import { useState, createContext, useContext } from 'react';
import FormDetail from './register-form/detail-list/form-detail';
import { useActionState } from 'react';
import {
  createSale,
  updateSale,
  createOrder,
  updateOrder,
  createPurchase,
  updatePurchase,
} from '@/server-actions/actions';
import {
  FormDiv,
  FormSelect,
  FormDate,
  FormError,
  FormButtons,
  FormContainerNew,
  FormIdNew,
} from './form-inputs/form-inputs';
import { ProductSearch } from './register-form/product-list/product-search';
import { FormSubtotals } from './register-form/register-subtotals';
import { calculateTotals } from '@/lib/calculate-totals';
import { RegisterFormOptions } from './options/register';
import { CardContent } from '../ui/card';
import { FieldGroup, FieldSeparator, FieldSet } from '../ui/field';
import { Separator } from '../ui/separator';
import { ProductSearchDialog } from './register-form/product-list/product-search-dialog';

const FormContext = createContext(null);
export function useFormContext() {
  const context = useContext(FormContext);
  return context;
}

interface RegisterForm {
  children: React.ReactNode;
  isNew: boolean;
  register?: any;
  registerPdf?: any;
  registerId?: any;
  detailList?: any;
  convert?: boolean;
  allowEmpty?: boolean;
  abono?: any;
  selectData: any;
  formName: string;
}

type RegisterPayload = {
  formData: any;
  productList: any[];
  id?: string;
  originalList?: any[];
};

export function RegisterForm({
  children,
  isNew,
  register = {},
  registerPdf = {},
  registerId = '',
  detailList = [],
  convert = false,
  allowEmpty = false,
  abono = 0,
  selectData,
  formName,
}: RegisterForm) {
  const formInfo = {
    ventas: { create: createSale, update: updateSale, holder: 'Venta' },
    pedidos: { create: createOrder, update: updateOrder, holder: 'Pedido' },
    compras: {
      create: createPurchase,
      update: updatePurchase,
      holder: 'Compra',
    },
  };
  const actions = formInfo[formName];
  const action = isNew ? actions.create : actions.update;
  const originalList = detailList;
  const holder: string = formInfo[formName].holder;

  const [productList, setProductList] = useState(isNew ? [] : detailList);
  const totals = convert
    ? calculateTotals(productList, convert)
    : calculateTotals(productList);
  const [formTotals, setFormTotals] = useState(totals);
  const [formAbono, setFormAbono] = useState(abono);

  const [state, _formAction, isPending] = useActionState(action, {
    message: '',
  });

  const formAction = _formAction as unknown as (
    payload: RegisterPayload
  ) => any;

  function handleRegister(formData) {
    if (!allowEmpty && productList.length === 0) {
      alert('Agrega productos a la lista');
      return;
    }

    if (isNew) {
      formAction({ formData, productList });
    } else {
      const payload: RegisterPayload = {
        id: registerId,
        formData,
        productList,
        originalList,
      };
      formAction(payload);
    }
  }

  return (
    <FormContainerNew action={handleRegister} wider={true}>
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
        <FormIdNew
          holder={isNew ? `Crear ${holder.toLowerCase()}` : holder}
          value={registerId}
          description="Actualiza la información del registro."
        />
        <CardContent>
          <FieldGroup>
            <FieldSet>
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
            </FieldSet>
            {/* <FieldSet>
              <FormSubtotals credit={isNew ? false : register.Credito} />
            </FieldSet> */}
          </FieldGroup>

          <ProductSearchDialog>{children}</ProductSearchDialog>

          <FormDetail />

          {!isNew && (
            <>
              <Separator className="mb-5" />

              <RegisterFormOptions registerPdf={registerPdf} />
            </>
          )}

          <FormError isPending={isPending} state={state} />
        </CardContent>

        <FormButtons isNew={isNew} isPending={isPending} />
      </FormContext.Provider>
    </FormContainerNew>
  );
}
