import { formatNumber } from '@/lib/formatters';
import { CircleDollarSign, Coins, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DashboardData } from '@/types/types';

interface Report {
  children: React.ReactNode;
  name: 'ventas' | 'pedidos' | 'flujoEfectivo' | 'informeContable';
}

function Report({ children, name }: Report) {
  const reportConfig = {
    ventas: {
      icon: <Coins className="size-4" />,
      bgColor: 'bg-green-200 dark:bg-green-900',
      title: 'Solo ventas',
    },
    pedidos: {
      icon: <ShoppingBag className="size-4" />,
      bgColor: 'bg-blue-200 dark:bg-blue-900',
      title: 'Solo pedidos',
    },
    flujoEfectivo: {
      icon: <CircleDollarSign className="size-4" />,
      bgColor: 'bg-yellow-200 dark:bg-yellow-900',
      title: 'Flujo de efectivo',
    },
  };

  return (
    <Card className="gap-3">
      <CardHeader>
        <CardTitle
          className={`${reportConfig[name].bgColor} inline-flex gap-2 p-1.5 rounded items-center text-xs`}
        >
          {reportConfig[name].icon}
          {reportConfig[name].title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

interface ReportData {
  data: DashboardData;
}

export function OrdersOnlyReport({ data }: ReportData) {
  const profit = data.totalOrdersInDollars - data.ordersCostsInDollars;

  return (
    <Report name="pedidos">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800">
            <th className="py-1.5 text-left">Ingresos y costos</th>
            <th className="py-1.5 text-right">Monto</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-xs">
            <td className="py-1.5 text-left">(+) Ingresos</td>
            <td className="py-1.5 text-right">
              $ {formatNumber(data.totalOrdersInDollars)}
            </td>
          </tr>
          <tr className="text-xs">
            <td className="py-1.5 text-left">(-) Costos</td>
            <td className="py-1.5 text-right">
              $ {formatNumber(data.ordersCostsInDollars)}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="text-xs font-semibold border-t border-neutral-300 dark:border-neutral-600">
            <td className="py-1.5 text-left">Ganancia</td>
            <td className="py-1.5 text-right">$ {formatNumber(profit)}</td>
          </tr>
          <tr className="text-xs text-blue-800 dark:text-blue-300">
            <td className="py-1.5 text-left">10% para inversor</td>
            <td className="py-1.5 text-right">
              $ {formatNumber(profit * 0.1)}
            </td>
          </tr>
        </tfoot>
      </table>
    </Report>
  );
}

export function SalesOnlyReport({ data }: ReportData) {
  const profit = data.salesContado + data.salesCreditAbonos - data.salesCosts;

  return (
    <Report name="ventas">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800">
            <th className="py-1.5 text-left">Ingresos y costos</th>
            <th className="py-1.5 text-right">Monto</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-xs">
            <td className="py-1.5 text-left">(+) Al contado</td>
            <td className="py-1.5 text-right">
              C$ {formatNumber(data.salesContado)}
            </td>
          </tr>
          <tr className="text-xs">
            <td className="py-1.5 text-left">(+) Al crédito (abonos)</td>
            <td className="py-1.5 text-right">
              C$ {formatNumber(data.salesCreditAbonos)}
            </td>
          </tr>
          <tr className="text-xs">
            <td className="py-1.5 text-left">(-) Costos</td>
            <td className="py-1.5 text-right">
              C$ {formatNumber(data.salesCosts)}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="text-xs font-semibold border-t border-neutral-300 dark:border-neutral-600">
            <td className="py-1.5 text-left">Ganancia</td>
            <td className="py-1.5 text-right">C$ {formatNumber(profit)}</td>
          </tr>
          <tr className="text-xs text-blue-800 dark:text-blue-300">
            <td className="py-1.5 text-left">10% para inversor</td>
            <td className="py-1.5 text-right">
              C$ {formatNumber(profit * 0.1)}
            </td>
          </tr>
        </tfoot>
      </table>
    </Report>
  );
}

export function CashFlowReport({ data }: ReportData) {
  const totalIncome =
    data.salesContado + data.salesCreditAbonos + data.ordersAbonos;
  const totalExpenses =
    data.comprasInventario + data.comprasGastos + data.ordersCosts;
  const profit = totalIncome - totalExpenses;

  return (
    <Report name="flujoEfectivo">
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
              {formatNumber(data.salesContado)}
            </td>
          </tr>
          <tr className="text-xs">
            <td className="py-1.5 text-left">Abonos de ventas al crédito</td>
            <td className="py-1.5 text-right">
              {formatNumber(data.salesCreditAbonos)}
            </td>
          </tr>
          <tr className="text-xs">
            <td className="py-1.5 text-left">Abonos de pedidos</td>
            <td className="py-1.5 text-right">
              {formatNumber(data.ordersAbonos)}
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
              {formatNumber(data.comprasInventario)}
            </td>
          </tr>
          <tr className="text-xs">
            <td className="py-1.5 text-left">{'Gastos asociados a compras'}</td>
            <td className="py-1.5 text-right">
              {formatNumber(data.comprasGastos)}
            </td>
          </tr>
          <tr className="text-xs">
            <td className="py-1.5 text-left">Costos de pedidos</td>
            <td className="py-1.5 text-right">
              {formatNumber(data.ordersCosts)}
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
          <tr className="text-xs text-blue-800 dark:text-blue-300">
            <td className="py-1.5 text-left">10% para inversor</td>
            <td className="py-1.5 text-right">{formatNumber(profit * 0.1)}</td>
          </tr>
        </tbody>
      </table>
    </Report>
  );
}
