import { isDemo } from '@/middleware';
import { FormId } from '@/components/forms/FormInputs/formInputs';
import LogoutForm from '@/components/login/LogoutForm';
import Link from 'next/link';
import ProvidersIcon from '@/app/ui/sidemenu/SideMenuIcon/providers.svg';
import CategoriesIcon from '@/app/ui/sidemenu/SideMenuIcon/categories.svg';
import OrdersIcon from '@/app/ui/sidemenu/SideMenuIcon/orders.svg';
import ReceiptsIcon from '@/app/ui/sidemenu/SideMenuIcon/receipts.svg';
import StoreIcon from '@/app/ui/icons/store.svg';
import ArrowRightIcon from '@/app/ui/icons/keyboard-arrow-right.svg';

export const metadata = {
  title: 'Ajustes',
};

export default async function Page() {
  return (
    <main className="flex gap-5 flex-col rounded-xl p-2 md:p-7 shadow bg-white dark:bg-neutral-900 max-w-3xl mx-auto w-full">
      <FormId holder="Ajustes" />
      {!isDemo && (
        <SettingsItem label="Infomación del negocio" href="/ajustes/info">
          <StoreIcon className="size-5" />
        </SettingsItem>
      )}
      <SettingsSection title="Administrar">
        <SettingsItem label="Categorías" href="/categorias">
          <CategoriesIcon className="size-5" />
        </SettingsItem>
        <SettingsItem label="Proveedores" href="/proveedores">
          <ProvidersIcon className="size-5" />
        </SettingsItem>
      </SettingsSection>
      <SettingsSection title="Registros sin usar">
        {/* <SettingsItem label="Pedidos" href="/pedidos">
          <OrdersIcon className="size-5" />
        </SettingsItem> */}
        <SettingsItem label="Recibos" href="/recibos">
          <ReceiptsIcon className="size-5" />
        </SettingsItem>
      </SettingsSection>
      {!isDemo && <LogoutForm />}
    </main>
  );
}

function SettingsSection({ children, title = '' }) {
  return (
    <section className="flex flex-col gap-2 w-full">
      <h2 className="text-xs font-semibold px-2 opacity-80">{title}</h2>
      {children}
    </section>
  );
}

function SettingsItem({ label, children, href }) {
  return (
    <Link
      href={href}
      className="flex items-center bg-neutral-200 dark:bg-neutral-800 hover:bg-sky-200 dark:hover:bg-neutral-700 rounded-lg p-3 cursor-pointer gap-2 min-h-9 h-full w-full"
    >
      <div className="flex gap-2 w-full items-center">
        {children}
        <label className="text-xs font-bold cursor-pointer">{label}</label>
      </div>
      <ArrowRightIcon className="size-5" />
    </Link>
  );
}
