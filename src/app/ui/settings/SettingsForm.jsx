'use client';

import { useActionState } from 'react';
import {
  FormButtons,
  FormContainer,
  FormError,
  FormId,
  FormInput,
} from '../forms/FormInputs/formInputs';
import { updateSettings } from '@/app/lib/actions';
import { isDemo } from '@/middleware';
import LogoutForm from '../login/LogoutForm';
import Link from 'next/link';
import ProvidersIcon from '@/app/ui/sidemenu/SideMenuIcon/providers.svg';
import CategoriesIcon from '@/app/ui/sidemenu/SideMenuIcon/categories.svg';
import OrdersIcon from '@/app/ui/sidemenu/SideMenuIcon/orders.svg';
import ReceiptsIcon from '@/app/ui/sidemenu/SideMenuIcon/receipts.svg';

export function SettingsForm({ data }) {
  const [state, formAction, isPending] = useActionState(updateSettings, {
    message: '',
  });

  return (
    <>
      <FormContainer action={formAction}>
        <FormId holder="Ajustes" />
        <FormInput
          name="Nombre_empresa"
          holder="Nombre del negocio"
          value={data.Nombre_empresa || ''}
        />
        <FormInput name="Eslogan" holder="Eslogan" value={data.Eslogan || ''} />
        <FormInput
          name="Mensaje"
          holder="Mensaje personalizado"
          value={data.Mensaje || ''}
        />
        <SettingsLinks />
        <FormError isPending={isPending} state={state} />
        <FormButtons isNew={false} isPending={isPending} />
      </FormContainer>
      {!isDemo && <LogoutForm />}
    </>
  );
}

function SettingsLinks() {
  return (
    <div className="flex flex-col gap-4 w-full md:justify-center">
      <div className="flex gap-4">
        <FormOption label="Proveedores" href="/proveedores">
          <ProvidersIcon className="size-5" />
        </FormOption>
        <FormOption label="Categorías" href="/categorias">
          <CategoriesIcon className="size-5" />
        </FormOption>
      </div>
      <div className="flex gap-4">
        <FormOption label="Pedidos" href="/pedidos">
          <OrdersIcon className="size-5" />
        </FormOption>
        <FormOption label="Recibos" href="/recibos">
          <ReceiptsIcon className="size-5" />
        </FormOption>
      </div>
    </div>
  );
}

function FormOption({ label, children, href }) {
  return (
    <Link
      href={href}
      className="flex justify-center items-center bg-neutral-200 dark:bg-neutral-700 hover:bg-sky-200 dark:hover:bg-neutral-600 rounded-lg py-2 px-3 cursor-pointer shadow-xs gap-2 min-h-9 h-full w-full"
    >
      {children}
      <label className="text-xs font-bold cursor-pointer">{label}</label>
    </Link>
  );
}
