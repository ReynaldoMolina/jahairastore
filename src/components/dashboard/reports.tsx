import { formatNumber } from '@/lib/formatters';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { DashboardData } from '@/types/types';

interface ReportData {
  data: DashboardData;
}

export function SalesOnlyReport({ data }: ReportData) {
  const profit = data.salesContado + data.salesCreditAbonos - data.salesCosts;

  return (
    <>
      <span className="text-sm mt-6 font-bold">Ventas</span>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-2 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Ganancia</CardDescription>
            <CardTitle className="text-lg font-semibold tabular-nums text-blue-700 dark:text-blue-300">
              <span>C${formatNumber(profit)}</span>
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-xs text-muted-foreground">
            C${formatNumber(profit * 0.1)} (10%)
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Al contado</CardDescription>
            <CardTitle className="text-lg font-semibold tabular-nums">
              C${formatNumber(data.salesContado)}
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-xs text-muted-foreground">
            Ventas pagadas
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Al crédito</CardDescription>
            <CardTitle className="text-lg font-semibold tabular-nums">
              C${formatNumber(data.salesCreditAbonos)}
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-xs text-muted-foreground">
            Abonos
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Costos</CardDescription>
            <CardTitle className="text-lg font-semibold tabular-nums">
              C${formatNumber(data.salesCosts)}
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-xs text-muted-foreground">
            Costos de productos
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export function OrdersOnlyReport({ data }: ReportData) {
  const profit = data.totalOrdersInDollars - data.ordersCostsInDollars;

  return (
    <>
      <span className="text-sm mt-6 font-bold">Pedidos</span>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-2 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Ganancia</CardDescription>
            <CardTitle className="text-lg font-semibold tabular-nums text-blue-700 dark:text-blue-300">
              ${formatNumber(profit)}
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-xs text-muted-foreground">
            ${formatNumber(profit * 0.1)} (10%)
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Ingresos</CardDescription>
            <CardTitle className="text-lg font-semibold tabular-nums">
              ${formatNumber(data.totalOrdersInDollars)}
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-xs text-muted-foreground">
            Abonos
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Costos</CardDescription>
            <CardTitle className="text-lg font-semibold tabular-nums">
              ${formatNumber(data.ordersCostsInDollars)}
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-xs text-muted-foreground">
            Costos de productos
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
