import { ListDetail, ListInfoDetail, ListId, ListFooter } from "@/app/ui/lists/lists";

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
    <ListFooter>
      <ListId id={data.length} color="gray" />
      <ListInfoDetail>
        <ListDetail detail={totals.TotalPedidoVenta} color="gray" />
        <ListDetail detail={totals.TotalAbono} color="green" />
        <ListDetail detail={(totals.TotalPedidoVenta - totals.TotalAbono)} color="red" />
        <ListDetail detail={(totals.TotalPedidoVenta - totals.TotalPedidoCompra)} color="blue" />
      </ListInfoDetail>
    </ListFooter>
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
    <ListFooter>
      <ListId id={data.length} color="gray" />
      <ListInfoDetail>
        <ListDetail detail="-" type="text" />
        <ListDetail detail={totals.Abono} color="green" />
      </ListInfoDetail>
    </ListFooter>
  );
}

export function PurchaseListTotal({ data }) {
  const totals = data.reduce((acc, item) => {
    acc.TotalCompraVenta += item.TotalCompraVenta;
    acc.TotalCompraCompra += item.TotalCompraCompra;
    acc.TotalGasto += item.TotalGasto;
    return acc;
  }, {
    TotalCompraVenta: 0,
    TotalCompraCompra: 0,
    TotalGasto: 0
  });

  return (
    <ListFooter>
      <ListId id={data.length} color="gray" />
      <ListInfoDetail>
        <ListDetail detail={totals.TotalCompraCompra} />
        <ListDetail detail={totals.TotalGasto} color="red" />
        <ListDetail detail={(totals.TotalCompraVenta - totals.TotalCompraCompra - totals.TotalGasto)} color="blue" />
      </ListInfoDetail>
    </ListFooter>
  );
}

export function ExpensesListTotal({ data }) {
  const totals = data.reduce((acc, item) => {
    acc.Gasto += (item.Gasto * item.Cambio_dolar);
    return acc;
  }, {
    Gasto: 0
  });

  return (
    <ListFooter>
      <ListId id={data.length} />
      <ListInfoDetail>
        <ListDetail detail="-" type="text" />
        <ListDetail detail={totals.Gasto} color="red" />
      </ListInfoDetail>
    </ListFooter>
  );
}

export function SaleListTotal({ data }) {
  const totals = data.reduce((acc, item) => {
    acc.TotalVenta += item.TotalVenta;
    acc.TotalCompra += item.TotalCompra;
    acc.totalAbono += item.Abono;
    return acc;
  }, {
    TotalVenta: 0,
    TotalCompra: 0,
    totalAbono: 0,
  });

  return (
    <ListFooter>
      <ListId id={data.length} color="gray" />
      <ListInfoDetail>
        <ListDetail detail={totals.TotalVenta} />
        <ListDetail detail={totals.TotalVenta - totals.totalAbono} color="red" />
        <ListDetail detail={(totals.TotalVenta - totals.TotalCompra)} color="blue" />
      </ListInfoDetail>
    </ListFooter>
  );
}

export function InventoryListTotal({ data }) {
  const totals = data.reduce((acc, item) => {
    acc.Existencias += item.Existencias;
    acc.Ganancia += item.Ganancia;
    return acc;
  }, {
    Existencias: 0,
    Ganancia: 0,
  });

  return (
    <ListFooter>
      <ListId id={data.length} color="gray" />
      <ListInfoDetail>
        <div className="flex gap-1 sm:gap-2 flex-wrap md:flex-nowrap">
          <ListDetail detail={totals.Existencias} type="text" />
          <ListDetail detail="-" color="green" type="text" />
          <ListDetail detail={totals.Ganancia} color="blue" />
        </div>
      </ListInfoDetail>
    </ListFooter>
  );
}