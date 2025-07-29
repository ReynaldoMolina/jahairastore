import { formatNumber } from '@/app/lib/formatNumber';
import MoneyIcon from '@/app/ui/icons/money.svg';
import FinancesIcon from '@/app/ui/icons/finances.svg';
import { isDemo } from '@/middleware';

function Report({ children, title }) {
  const icon =
    title === 'Flujo de efectivo' ? (
      <MoneyIcon className="size-5" />
    ) : (
      <FinancesIcon className="size-5" />
    );

  const bgColor =
    title === 'Flujo de efectivo'
      ? 'bg-green-200 dark:bg-green-900'
      : 'bg-blue-200 dark:bg-blue-900';

  return (
    <div className="flex flex-col gap-3 justify-center items-center w-full p-5 rounded-lg bg-white dark:bg-neutral-900">
      <div
        className={`flex items-center gap-2 p-2 w-full rounded-md ${bgColor}`}
      >
        {icon}
        <span className="font-bold">{title}</span>
      </div>
      <div className="flex gap-7 flex-col w-full">{children}</div>
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
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800">
            <th className="py-1.5 text-left">Ingresos recibidos</th>
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
            <td className="py-1.5 text-left">Total</td>
            <td className="py-1.5 text-right">{formatNumber(totalIncome)}</td>
          </tr>
        </tfoot>
      </table>
      {/* Gastos */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800">
            <th className="py-1.5 text-left">Costos y Gastos</th>
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
            <td className="py-1.5 text-left">{'Gastos asociados a compras'}</td>
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
            <td className="py-1.5 text-left">Total</td>
            <td className="py-1.5 text-right">{formatNumber(totalExpenses)}</td>
          </tr>
        </tfoot>
      </table>
      {/* Ganancia */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800">
            <th className="py-1.5 text-left">Ganancia</th>
            <th className="py-1.5 text-right">Monto C$</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-xs">
            <td className="py-1.5 text-left">
              Ingresos recibidos - Costos y gastos
            </td>
            <td className="py-1.5 text-right">{formatNumber(profit)}</td>
          </tr>
          <tr className="text-xs">
            <td className="py-1.5 text-left">10% para inversor</td>
            <td className="py-1.5 text-right">{formatNumber(profit * 0.1)}</td>
          </tr>
        </tbody>
      </table>
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
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800">
            <th className="py-1.5 text-left">Ingresos devengados</th>
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
            <td className="py-1.5 text-left">Total</td>
            <td className="py-1.5 text-right">{formatNumber(totalIncome)}</td>
          </tr>
        </tfoot>
      </table>
      {/* Gastos */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800">
            <th className="py-1.5 text-left">Costos y Gastos</th>
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
            <td className="py-1.5 text-left">{'Gastos asociados a compras'}</td>
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
            <td className="py-1.5 text-left">Total</td>
            <td className="py-1.5 text-right">{formatNumber(totalExpenses)}</td>
          </tr>
        </tfoot>
      </table>
      {/* Ganancia */}
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800">
            <th className="py-1.5 text-left">Utilidad</th>
            <th className="py-1.5 text-right">Monto C$</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-xs">
            <td className="py-1.5 text-left">
              Ingresos devengados - Costos y gastos
            </td>
            <td className="py-1.5 text-right">{formatNumber(profit)}</td>
          </tr>
          {!isDemo && (
            <tr className="text-xs">
              <td className="py-1.5 text-left">10% para inversor</td>
              <td className="py-1.5 text-right">
                {formatNumber(profit * 0.1)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Report>
  );
}
