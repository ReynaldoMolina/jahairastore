import { ListCard, ListDetail, ListId, ListInfo, ListInfoDetail, ListDate, ListName } from "./lists";

export function OrderListTotal({ data }) {
  const totals = data.reduce((acc, item) => {
    acc.TotalPedidoVenta += item.TotalPedidoVenta;
    acc.TotalPedidoCompra += item.TotalPedidoCompra;
    acc.TotalAbono += item.TotalAbono;
    return acc;
  }, {
    TotalPedidoVenta: 0,
    TotalPedidoCompra: 0,
    TotalAbono: 0
  });

  return (
    <ListCard href="">
      <ListId id={data.length} />
      <ListInfo>
        <ListName name="" />
        <ListInfoDetail>
          <ListDate date="Total" />
          <div className="flex gap-1 sm:gap-2 flex-wrap md:flex-nowrap">
            <ListDetail detail={totals.TotalPedidoVenta} color="bg-neutral-200/60 dark:bg-neutral-700 text-right" type="number" />
            <ListDetail detail={totals.TotalAbono} color="bg-green-200 dark:bg-green-900 text-right" type="number" />
            <ListDetail detail={(totals.TotalPedidoVenta - totals.TotalAbono)} color="bg-red-200 dark:bg-red-900 text-right" type="number" />
            <ListDetail detail={(totals.TotalPedidoVenta - totals.TotalPedidoCompra)} color="bg-blue-200 dark:bg-blue-900 text-right" type="number" />
          </div>
        </ListInfoDetail>
      </ListInfo>
    </ListCard>
  );
}

export function ReceiptListTotal({ data }) {
  const totals = data.reduce((acc, item) => {
    acc.Abono += item.Abono;
    return acc;
  }, {
    Abono: 0
  });

  return (
    <ListCard
      href=""
    >
      <ListId id={data.length}/>
      <ListInfo>
        <ListName name="" />
          <ListInfoDetail>
            <ListDate date="Total" />
            <ListDetail detail="-" color="bg-neutral-200/60 dark:bg-neutral-700 text-center" />
            <ListDetail detail={totals.Abono} color="bg-green-200 dark:bg-green-900 text-right" type="number" />
          </ListInfoDetail>
      </ListInfo>
    </ListCard>
  );
}