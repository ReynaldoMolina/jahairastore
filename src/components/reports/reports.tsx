import { formatNumber } from '@/lib/formatters';
import {
  ArrowDown,
  ArrowUp,
  Coins,
  Equal,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { DashboardData } from '@/types/types';
import { Badge } from '../ui/badge';

interface ReportData {
  data: DashboardData;
}

export function OrdersOnlyReport({ data }: ReportData) {
  const profit = data.totalOrdersInDollars - data.ordersCostsInDollars;

  return (
    <>
      <span className="inline-flex items-center gap-2 text-sm mt-6">
        <ShoppingBag className="size-4" />
        Solo pedidos
      </span>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Ingresos</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              ${formatNumber(data.totalOrdersInDollars)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <ArrowUp />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm">
            <div className="text-muted-foreground">Abonos de pedidos</div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Costos</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              - ${formatNumber(data.ordersCostsInDollars)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <ArrowDown />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm">
            <div className="text-muted-foreground">Costos de pedidos</div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Ganancia</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              ${formatNumber(profit)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <Equal />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm">
            <div className="text-muted-foreground">Ganancia total</div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="text-blue-600 dark:text-blue-400">
            <CardDescription>Ganancia inversor</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              ${formatNumber(profit * 0.1)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <Equal />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm">
            <div className="text-muted-foreground">10% para inversor</div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export function SalesOnlyReport({ data }: ReportData) {
  const profit = data.salesContado + data.salesCreditAbonos - data.salesCosts;

  return (
    <>
      <span className="inline-flex items-center text-sm gap-2 mt-6">
        <Coins className="size-4" />
        Solo ventas
      </span>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-3 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Al contado</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              C${formatNumber(data.salesContado)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <ArrowUp />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm">
            <div className="text-muted-foreground">Ventas hechas y pagadas</div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Al crédito</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              C${formatNumber(data.salesCreditAbonos)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <ArrowUp />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm">
            <div className="text-muted-foreground">
              Abonos de ventas al crédito
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Costos</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              - C${formatNumber(data.salesCosts)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <ArrowDown />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm">
            <div className="text-muted-foreground">Costos de ventas</div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Ganancia</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              C${formatNumber(profit)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <Equal />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm">
            <div className="text-muted-foreground">Ganancia total</div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="text-blue-600 dark:text-blue-400">
            <CardDescription>Ganancia inversor</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              C${formatNumber(profit * 0.1)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <Equal />
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm">
            <div className="text-muted-foreground">10% para inversor</div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

// export function CashFlowReport({ data }: ReportData) {
//   const totalIncome =
//     data.salesContado + data.salesCreditAbonos + data.ordersAbonos;
//   const totalExpenses =
//     data.comprasInventario + data.comprasGastos + data.ordersCosts;
//   const profit = totalIncome - totalExpenses;

//   return (
//     <Report name="flujoEfectivo">
//       <table className="w-full">
//         <thead>
//           <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800">
//             <th className="py-1.5 text-left">Ingresos recibidos</th>
//             <th className="py-1.5 text-right">Monto C$</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="text-xs">
//             <td className="py-1.5 text-left">Ventas al contado</td>
//             <td className="py-1.5 text-right">
//               {formatNumber(data.salesContado)}
//             </td>
//           </tr>
//           <tr className="text-xs">
//             <td className="py-1.5 text-left">Abonos de ventas al crédito</td>
//             <td className="py-1.5 text-right">
//               {formatNumber(data.salesCreditAbonos)}
//             </td>
//           </tr>
//           <tr className="text-xs">
//             <td className="py-1.5 text-left">Abonos de pedidos</td>
//             <td className="py-1.5 text-right">
//               {formatNumber(data.ordersAbonos)}
//             </td>
//           </tr>
//         </tbody>
//         <tfoot>
//           <tr className="text-xs font-semibold border-t border-neutral-300 dark:border-neutral-600">
//             <td className="py-1.5 text-left">Total</td>
//             <td className="py-1.5 text-right">{formatNumber(totalIncome)}</td>
//           </tr>
//         </tfoot>
//       </table>
//       {/* Gastos */}
//       <table className="w-full">
//         <thead>
//           <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800">
//             <th className="py-1.5 text-left">Costos y Gastos</th>
//             <th className="py-1.5 text-right">Monto C$</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="text-xs">
//             <td className="py-1.5 text-left">
//               {'Compras (productos inventario)'}
//             </td>
//             <td className="py-1.5 text-right">
//               {formatNumber(data.comprasInventario)}
//             </td>
//           </tr>
//           <tr className="text-xs">
//             <td className="py-1.5 text-left">{'Gastos asociados a compras'}</td>
//             <td className="py-1.5 text-right">
//               {formatNumber(data.comprasGastos)}
//             </td>
//           </tr>
//           <tr className="text-xs">
//             <td className="py-1.5 text-left">Costos de pedidos</td>
//             <td className="py-1.5 text-right">
//               {formatNumber(data.ordersCosts)}
//             </td>
//           </tr>
//         </tbody>
//         <tfoot>
//           <tr className="text-xs font-semibold border-t border-neutral-300 dark:border-neutral-600">
//             <td className="py-1.5 text-left">Total</td>
//             <td className="py-1.5 text-right">{formatNumber(totalExpenses)}</td>
//           </tr>
//         </tfoot>
//       </table>
//       {/* Ganancia */}
//       <table className="w-full">
//         <thead>
//           <tr className="border-b border-neutral-300 dark:border-neutral-600 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800">
//             <th className="py-1.5 text-left">Ganancia</th>
//             <th className="py-1.5 text-right">Monto C$</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="text-xs">
//             <td className="py-1.5 text-left">
//               Ingresos recibidos - Costos y gastos
//             </td>
//             <td className="py-1.5 text-right">{formatNumber(profit)}</td>
//           </tr>
//           <tr className="text-xs text-blue-800 dark:text-blue-300">
//             <td className="py-1.5 text-left">10% para inversor</td>
//             <td className="py-1.5 text-right">{formatNumber(profit * 0.1)}</td>
//           </tr>
//         </tbody>
//       </table>
//     </Report>
//   );
// }
