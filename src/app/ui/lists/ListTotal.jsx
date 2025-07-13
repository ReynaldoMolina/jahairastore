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
      <ListInfo>
        <ListId id={data.length} label="CONTEO" color="mdgray" />
        <ListName name="TOTAL" />
      </ListInfo>
      <ListInfoDetail>
        <ListDetail
          detail={totals.TotalPedidoVenta}
          label="Total pedido"
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
    </ListFooter>
  );
}

export function RegisterListTotal({ formTotals, productList, convert }) {
  return (
    <ListFooter>
      <ListInfo>
        <ListId id={productList.length} label="CONTEO" color="mdgray" />
        <ListName name="TOTAL" />
      </ListInfo>
      <ListInfoDetail>
        <ListDetail
          detail={formTotals.quantity}
          label="Cantidad"
          color="gray"
          number={false}
        />
        <ListDetail
          detail={formTotals.totalSell}
          label="Venta"
          color="green"
          nio={convert}
        />
        <ListDetail
          detail={formTotals.totalCost}
          label="Compra"
          color="red"
          nio={convert}
        />
        <ListDetail
          detail={formTotals.profit}
          label="Ganancia"
          color="blue"
          nio={convert}
        />
      </ListInfoDetail>
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
      <ListInfo>
        <ListId id={data.length} label="CONTEO" color="mdgray" />
        <ListName name="TOTAL" />
      </ListInfo>
      <ListInfoDetail>
        <ListDetail detail={totals.Abono} label="Abonos" color="green" />
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
      <ListInfo>
        <ListId id={data.length} label="CONTEO" color="mdgray" />
        <ListName name="TOTAL" />
      </ListInfo>
      <ListInfoDetail>
        <ListDetail
          detail={totals.TotalCompraCompra}
          label="Total compras"
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
      <ListInfo>
        <ListId id={data.length} label="CONTEO" color="mdgray" />
        <ListName name="TOTAL" />
      </ListInfo>
      <ListInfoDetail>
        <ListDetail
          detail={totals.Gasto}
          label="Gasto"
          color="red"
          nio={true}
        />
      </ListInfoDetail>
    </ListFooter>
  );
}

export function SaleListTotal({ data }) {
  console.log(data);

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
      <ListInfo>
        <ListId id={data.length} label="CONTEO" color="mdgray" />
        <ListName name="TOTAL" />
      </ListInfo>
      <ListInfoDetail>
        <ListDetail
          detail={totals.TotalVenta}
          label="Total ventas"
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
      <ListInfo>
        <ListId id={data.length} label="CONTEO" color="mdgray" />
        <ListName name="TOTAL" />
      </ListInfo>
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
    </ListFooter>
  );
}
