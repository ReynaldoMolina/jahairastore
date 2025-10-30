interface CalculateTotals {
  list: any;
  convert?: boolean;
}

export function calculateTotals2({ list, convert = false }: CalculateTotals) {
  let totalSell = 0,
    totalCost = 0,
    quantity = 0;

  let items = list.length;

  for (const element of list) {
    totalSell +=
      element.Cantidad *
      element.Precio_venta *
      (convert ? element.Cambio_dolar : 1);

    totalCost +=
      element.Cantidad *
      element.Precio_compra *
      (convert ? element.Cambio_dolar : 1);

    quantity += element.Cantidad;
  }

  let profit = totalSell - totalCost;

  return { totalSell, totalCost, profit, quantity, items };
}

export function calculateTotals(list, convert = false) {
  let totalSell = 0,
    totalCost = 0,
    quantity = 0;

  let items = list.length;

  for (const element of list) {
    totalSell +=
      element.Cantidad *
      element.Precio_venta *
      (convert ? element.Cambio_dolar : 1);

    totalCost +=
      element.Cantidad *
      element.Precio_compra *
      (convert ? element.Cambio_dolar : 1);

    quantity += element.Cantidad;
  }

  let profit = totalSell - totalCost;

  return { totalSell, totalCost, profit, quantity, items };
}
