import {
  ListDetail,
  ListInfoDetail,
  ListId,
  ListFooter,
  ListName,
  ListInfo,
} from '@/app/ui/lists/lists';

export function OrderListTotal({ data }) {
  const totals = data.reduce(
    (acc, item) => {
      acc.TotalPedidoVenta += item.TotalPedidoVenta;
      acc.TotalPedidoCompra += item.TotalPedidoCompra;
      acc.TotalAbono += item.TotalAbono;
      return acc;
    },
    {
      TotalPedidoVenta: 0,
      TotalPedidoCompra: 0,
      TotalAbono: 0,
    }
  );

  return (
    <ListFooter>
      <ListId id={data.length} color="gray" />
      <ListInfo>
        <ListName name="TOTAL" />
        <ListInfoDetail>
          <ListDetail
            detail={totals.TotalPedidoVenta}
            label="Total"
            color="gray"
          />
          <ListDetail detail={totals.TotalAbono} label="Abonos" color="green" />
          <ListDetail
            detail={totals.TotalPedidoVenta - totals.TotalAbono}
            label="Saldo"
            color="red"
          />
          <ListDetail
            detail={totals.TotalPedidoVenta - totals.TotalPedidoCompra}
            label="Ganancia"
            color="blue"
          />
        </ListInfoDetail>
      </ListInfo>
    </ListFooter>
  );
}

export function ReceiptListTotal({ data }) {
  const totals = data.reduce(
    (acc, item) => {
      acc.Abono += item.Abono;
      return acc;
    },
    {
      Abono: 0,
    }
  );

  return (
    <ListFooter>
      <ListId id={data.length} color="gray" />
      <ListName name="TOTAL" />
      <ListInfoDetail>
        <ListDetail detail={totals.Abono} color="green" />
      </ListInfoDetail>
    </ListFooter>
  );
}

export function PurchaseListTotal({ data }) {
  const totals = data.reduce(
    (acc, item) => {
      acc.TotalCompraVenta += item.TotalCompraVenta;
      acc.TotalCompraCompra += item.TotalCompraCompra;
      acc.TotalGasto += item.TotalGasto;
      return acc;
    },
    {
      TotalCompraVenta: 0,
      TotalCompraCompra: 0,
      TotalGasto: 0,
    }
  );

  return (
    <ListFooter>
      <ListId id={data.length} color="gray" />
      <ListInfo>
        <ListName name="TOTAL" />
        <ListInfoDetail>
          <ListDetail
            detail={totals.TotalCompraCompra}
            label="Compra"
            color="gray"
            nio={true}
          />
          <ListDetail
            detail={totals.TotalGasto}
            label="Gastos"
            color="red"
            nio={true}
          />
          <ListDetail
            detail={
              totals.TotalCompraVenta -
              totals.TotalCompraCompra -
              totals.TotalGasto
            }
            label="Ganancia"
            color="blue"
            nio={true}
          />
        </ListInfoDetail>
      </ListInfo>
    </ListFooter>
  );
}

export function ExpensesListTotal({ data }) {
  const totals = data.reduce(
    (acc, item) => {
      acc.Gasto += item.Gasto * item.Cambio_dolar;
      return acc;
    },
    {
      Gasto: 0,
    }
  );

  return (
    <ListFooter>
      <ListId id={data.length} color="gray" />
      <ListName name="TOTAL" />
      <ListInfoDetail>
        <ListDetail detail={totals.Gasto} color="red" nio={true} />
      </ListInfoDetail>
    </ListFooter>
  );
}

export function SaleListTotal({ data }) {
  const totals = data.reduce(
    (acc, item) => {
      acc.TotalVenta += item.TotalVenta;
      acc.TotalCompra += item.TotalCompra;
      acc.totalAbono += item.Abono;
      return acc;
    },
    {
      TotalVenta: 0,
      TotalCompra: 0,
      totalAbono: 0,
    }
  );

  return (
    <ListFooter>
      <ListId id={data.length} color="gray" />
      <ListInfo>
        <ListName name="TOTAL" />
        <ListInfoDetail>
          <ListDetail
            detail={totals.TotalVenta}
            label="Total"
            color="gray"
            nio={true}
          />
          <ListDetail
            detail={totals.TotalVenta - totals.totalAbono}
            label="Saldo"
            color="red"
            nio={true}
          />
          <ListDetail
            detail={totals.TotalVenta - totals.TotalCompra}
            label="Ganancia"
            color="blue"
            nio={true}
          />
        </ListInfoDetail>
      </ListInfo>
    </ListFooter>
  );
}

export function InventoryListTotal({ data }) {
  const totals = data.reduce(
    (acc, item) => {
      acc.Existencias += item.Existencias;
      acc.Ganancia += item.Ganancia;
      return acc;
    },
    {
      Existencias: 0,
      Ganancia: 0,
    }
  );

  return (
    <ListFooter>
      <ListId id={data.length} color="gray" />
      <ListInfo>
        <ListName name="TOTAL" />
        <ListInfoDetail>
          <ListDetail
            detail={totals.Existencias}
            label="Disponibles"
            color="gray"
            number={false}
          />
          <ListDetail detail="-" label="Precio" color="green" number={false} />
          <ListDetail
            detail={totals.Ganancia}
            label="Ganancia"
            color="blue"
            nio={true}
          />
        </ListInfoDetail>
      </ListInfo>
    </ListFooter>
  );
}
