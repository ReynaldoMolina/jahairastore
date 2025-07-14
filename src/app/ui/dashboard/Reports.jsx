import { formatNumber } from '@/app/lib/formatNumber';
import SaleIcon from '@/app/ui/sidemenu/SideMenuIcon/pos.svg';
import OrderIcon from '@/app/ui/sidemenu/SideMenuIcon/orders.svg';

function Report({ children, title }) {
  const icons = {
    Pedidos: <OrderIcon className="size-4" />,
    Ventas: <SaleIcon className="size-4" />,
  };
  return (
    <div className="flex flex-col gap-3 justify-center items-center w-full p-3 rounded-lg border border-neutral-200 dark:border-neutral-600 flex-wrap">
      <div className="flex items-center gap-2 py-1 w-full">
        {icons[title]}
        <span className="font-bold">{title}</span>
      </div>
      <div className="flex gap-7 flex-col w-full">{children}</div>
    </div>
  );
}

function PanelSpan({ label, value, borderBottom }) {
  return (
    <div
      className={`flex justify-between w-full gap-1 py-1 ${
        borderBottom && 'border-b border-b-neutral-500'
      }`}
    >
      <p className="text-xs opacity-60 text-center">{label}</p>
      <span className="text-xs font-semibold">C${formatNumber(value)}</span>
    </div>
  );
}

export function CashFlowReport({ data }) {
  const totalIncome =
    data.VentasAlContado + data.VentasCreditoAbonos + data.PedidosAbonos;
  const totalExpenses =
    data.ComprasInventario + data.ComprasGastos + data.PedidosCostos;
  const profit = totalIncome - totalExpenses;

  return (
    <Report title="Flujo de efectivo">
      <div className="flex flex-col gap-3">
        <p className="font-bold text-xs bg-neutral-100 dark:bg-neutral-800 py-1">
          Ingresos recibidos
        </p>
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold">
              <th className="py-1.5 text-left">Concepto</th>
              <th className="py-1.5 text-right">Monto C$</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-xs">
              <td className="py-1.5 text-left">Ventas al contado</td>
              <td className="py-1.5 text-right">
                {formatNumber(data.VentasAlContado)}
              </td>
            </tr>
            <tr className="text-xs">
              <td className="py-1.5 text-left">Abonos de ventas al crédito</td>
              <td className="py-1.5 text-right">
                {formatNumber(data.VentasCreditoAbonos)}
              </td>
            </tr>
            <tr className="text-xs">
              <td className="py-1.5 text-left">Abonos de pedidos</td>
              <td className="py-1.5 text-right">
                {formatNumber(data.PedidosAbonos)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="text-xs font-semibold border-t border-neutral-300 dark:border-neutral-600">
              <td className="py-1.5 text-left">Total ingresos recibidos</td>
              <td className="py-1.5 text-right">{formatNumber(totalIncome)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Gastos */}
      <div className="flex flex-col gap-3">
        <p className="font-bold text-xs bg-neutral-100 dark:bg-neutral-800 py-1">
          Costos y Gastos
        </p>
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold">
              <th className="py-1.5 text-left">Concepto</th>
              <th className="py-1.5 text-right">Monto C$</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-xs">
              <td className="py-1.5 text-left">
                {'Compras (productos inventario)'}
              </td>
              <td className="py-1.5 text-right">
                {formatNumber(data.ComprasInventario)}
              </td>
            </tr>
            <tr className="text-xs">
              <td className="py-1.5 text-left">
                {'Gastos asociados a compras'}
              </td>
              <td className="py-1.5 text-right">
                {formatNumber(data.ComprasGastos)}
              </td>
            </tr>
            <tr className="text-xs">
              <td className="py-1.5 text-left">Costos de pedidos</td>
              <td className="py-1.5 text-right">
                {formatNumber(data.PedidosCostos)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="text-xs font-semibold border-t border-neutral-300 dark:border-neutral-600">
              <td className="py-1.5 text-left">Total costos y gastos</td>
              <td className="py-1.5 text-right">
                {formatNumber(totalExpenses)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Ganancia */}
      <div className="flex flex-col gap-3">
        <p className="font-bold text-xs bg-neutral-100 dark:bg-neutral-800 py-1">
          Ganancia Neta Real
        </p>
        <table className="w-full">
          <tbody>
            <tr className="text-xs">
              <td className="py-1.5 text-left">
                Ingresos recibidos - Costos y gastos
              </td>
              <td className="py-1.5 text-right">{formatNumber(profit)}</td>
            </tr>
            <tr className="text-xs">
              <td className="py-1.5 text-left">10% para inversor</td>
              <td className="py-1.5 text-right">
                {formatNumber(profit * 0.1)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Report>
  );
}

export function AccountingReport({ data }) {
  const totalIncome = data.VentaTotal + data.PedidosTotal;
  const totalExpenses =
    data.VentaCostoTotal + data.ComprasGastos + data.PedidosCostos;
  const profit = totalIncome - totalExpenses;

  return (
    <Report title="Informe Contable">
      <div className="flex flex-col gap-3">
        <p className="font-bold text-xs bg-neutral-100 dark:bg-neutral-800 py-1">
          Ingresos totales
        </p>
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold">
              <th className="py-1.5 text-left">Concepto</th>
              <th className="py-1.5 text-right">Monto C$</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-xs">
              <td className="py-1.5 text-left">
                {'Total ventas (contado + crédito)'}
              </td>
              <td className="py-1.5 text-right">
                {formatNumber(data.VentaTotal)}
              </td>
            </tr>
            <tr className="text-xs">
              <td className="py-1.5 text-left">Total pedidos</td>
              <td className="py-1.5 text-right">
                {formatNumber(data.PedidosTotal)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="text-xs font-semibold border-t border-neutral-300 dark:border-neutral-600">
              <td className="py-1.5 text-left">Total ingresos totales</td>
              <td className="py-1.5 text-right">{formatNumber(totalIncome)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Gastos */}
      <div className="flex flex-col gap-3">
        <p className="font-bold text-xs bg-neutral-100 dark:bg-neutral-800 py-1">
          Costos y Gastos Devengados
        </p>
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold">
              <th className="py-1.5 text-left">Concepto</th>
              <th className="py-1.5 text-right">Monto C$</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-xs">
              <td className="py-1.5 text-left">Costos de ventas</td>
              <td className="py-1.5 text-right">
                {formatNumber(data.VentaCostoTotal)}
              </td>
            </tr>
            <tr className="text-xs">
              <td className="py-1.5 text-left">
                {'Gastos asociados a compras'}
              </td>
              <td className="py-1.5 text-right">
                {formatNumber(data.ComprasGastos)}
              </td>
            </tr>
            <tr className="text-xs">
              <td className="py-1.5 text-left">Costos de pedidos</td>
              <td className="py-1.5 text-right">
                {formatNumber(data.PedidosCostos)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="text-xs font-semibold border-t border-neutral-300 dark:border-neutral-600">
              <td className="py-1.5 text-left">Total costos y gastos</td>
              <td className="py-1.5 text-right">
                {formatNumber(totalExpenses)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Ganancia */}
      <div className="flex flex-col gap-3">
        <p className="font-bold text-xs bg-neutral-100 dark:bg-neutral-800 py-1">
          Utilidad
        </p>
        <table className="w-full">
          <tbody>
            <tr className="text-xs">
              <td className="py-1.5 text-left">
                Ingresos totales - Costos y gastos
              </td>
              <td className="py-1.5 text-right">{formatNumber(profit)}</td>
            </tr>
            <tr className="text-xs">
              <td className="py-1.5 text-left">10% para inversor (total)</td>
              <td className="py-1.5 text-right">
                {formatNumber(profit * 0.1)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Report>
  );
}
