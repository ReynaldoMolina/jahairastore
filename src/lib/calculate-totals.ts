interface CalculateTotals {
  list: any;
  convert?: boolean;
}

export function calculateTotals({ list, convert = false }: CalculateTotals) {
  let totalSell = 0,
    totalCost = 0,
    quantity = 0;

  let items = list.length;

  for (const element of list) {
    totalSell +=
      element.cantidad *
      element.precioVenta *
      (convert ? element.cambioDolar : 1);

    totalCost +=
      element.cantidad *
      element.precioCompra *
      (convert ? element.cambioDolar : 1);

    quantity += element.cantidad;
  }

  let profit = totalSell - totalCost;

  return { totalSell, totalCost, profit, quantity, items };
}
