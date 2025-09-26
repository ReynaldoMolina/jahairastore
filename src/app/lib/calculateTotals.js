export function calculateTotals(list, convert = false) {
  let totalSell = 0, totalCost = 0, quantity = 0;
  let items = list.length;

  for (const element of list) {
    if (convert) {
      totalSell += (element.Cantidad * element.Precio_venta * element.Cambio_dolar);
    } else {
      totalSell += (element.Cantidad * element.Precio_venta);
    }
  }

  for (const element of list) {
    if (convert) {
      totalCost += (element.Cantidad * element.Precio_compra * element.Cambio_dolar);
    } else {
      totalCost += (element.Cantidad * element.Precio_compra);
    }
  }

  for (const element of list) {
    quantity += element.Cantidad;
  }

  let profit = totalSell - totalCost;
 
  return { totalSell, totalCost, profit, quantity, items };
}