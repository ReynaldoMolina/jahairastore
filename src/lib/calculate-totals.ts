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
    const exchangeRate = convert ? element.cambioDolar : 1;

    if (isOrder) {
      totalSell +=
        roundToTwoDecimals(element.precioVenta * exchangeRate) *
        element.cantidad;
    } else {
      totalSell += element.precioPorMayor
        ? roundToPointZeroOrFive(element.precioVentaPorMayor * exchangeRate) *
          element.cantidad
        : roundToPointZeroOrFive(
            element.precioVenta * exchangeRate * element.cantidad
          );
    }

    totalCost += element.cantidad * element.costo * exchangeRate;

    quantity += element.cantidad;
  }

  let profit = roundToTwoDecimals(totalSell) - roundToTwoDecimals(totalCost);

  return {
    totalSell: roundToTwoDecimals(totalSell),
    totalCost: roundToTwoDecimals(totalCost),
    profit,
    quantity,
    items,
  };
}
