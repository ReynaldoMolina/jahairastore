export default function getOrderTotals(list) {
  let totalSell = 0;
  let totalCost = 0;
  let profit = 0;
  let quantity = 0;
  let items = list.length;

  for (const element of list) {
    totalSell += (element.quantity * element.Precio_venta);
  }

  for (const element of list) {
    totalCost += (element.quantity * element.Precio_compra);
  }

  profit = totalSell - totalCost;

  for (const element of list) {
    quantity += element.quantity;
  }
 
  return { totalSell, totalCost, profit, quantity, items };
}