import { roundToPointZeroOrFive, roundToTwoDecimals } from './formatters';

interface CalculateTotals {
  list: any;
  convert?: boolean;
  isOrder?: boolean;
}

export function calculateTotals({
  list,
  convert = false,
  isOrder = false,
}: CalculateTotals) {
  let totalSell = 0,
    totalCost = 0,
    quantity = 0;

  let items = list.length;

  for (const element of list) {
    // const exchangeRate = convert ? element.cambioDolar : 1;

    if (isOrder) {
      totalSell += element.precioVenta * element.cantidad;
    } else {
      totalSell += element.precioPorMayor
        ? element.precioVentaPorMayor * element.cantidad
        : element.precioVenta * element.cantidad;
    }

    totalCost += element.cantidad * element.costo;

    quantity += element.cantidad;
  }

  let profit = roundToTwoDecimals(totalSell - totalCost);

  return {
    totalSell: roundToTwoDecimals(totalSell),
    totalCost: roundToTwoDecimals(totalCost),
    profit,
    quantity,
    items,
  };
}
