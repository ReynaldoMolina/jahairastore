import { ListDetail, ListInfoDetail, ListName, ListId, ListDate, NameDateDiv } from "./lists";

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
        <NameDateDiv>
          <ListName name="Total" />
          <ListDate date="" />
        </NameDateDiv>
        <ListInfoDetail>
          <ListDetail detail={totals.TotalPedidoVenta} color="gray" />
          <ListDetail detail={totals.TotalAbono} color="green" />
          <ListDetail detail={(totals.TotalPedidoVenta - totals.TotalAbono)} color="red" />
          <ListDetail detail={(totals.TotalPedidoVenta - totals.TotalPedidoCompra)} color="blue" />
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
        <NameDateDiv>
          <ListName name="Total" />
          <ListDate date="" />
        </NameDateDiv>
        <ListInfoDetail>
          <ListDetail detail="-" type="text" />
          <ListDetail detail={totals.Abono} color="green" />
        </ListInfoDetail>
      </ListInfo>
    </ListCard>
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
    <ListCard href="">
      <ListId id={data.length} />
      <ListInfo>
        <NameDateDiv>
          <ListName name="Total" />
          <ListDate date="" />
        </NameDateDiv>
        <ListInfoDetail>
          <ListDetail detail={totals.TotalCompraVenta} color="green" />
          <ListDetail detail={totals.TotalCompraCompra} color="red" />
          <ListDetail detail={totals.TotalGasto} color="amber" />
          <ListDetail detail={(totals.TotalCompraVenta - totals.TotalCompraCompra - totals.TotalGasto)} color="blue" />
        </ListInfoDetail>
      </ListInfo>
    </ListCard>
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
    <ListCard
      href="">
      <ListId id={data.length} />
      <ListInfo>
        <NameDateDiv>
          <ListName name="Total" />
          <ListDate date="" />
        </NameDateDiv>
        <ListInfoDetail>
          <ListDetail detail="-" type="text" />
          <ListDetail detail={totals.Gasto} color="green" />
        </ListInfoDetail>
      </ListInfo>
    </ListCard>
  );
}

export function SaleListTotal({ data }) {
  const totals = data.reduce((acc, item) => {
    acc.TotalVenta += item.TotalVenta;
    acc.TotalCompra += item.TotalCompra;
    acc.Abono += item.Abono;
    return acc;
  }, {
    TotalVenta: 0,
    TotalCompra: 0,
    Abono: 0,
  });

  return (
    <ListCard href="">
      <ListId id={data.length} />
      <ListInfo>
        <ListName name="Total" />
        <ListDate date="" />
        <ListInfoDetail>
          <div className="flex gap-1 sm:gap-2 flex-wrap md:flex-nowrap">
            <ListDetail detail={totals.TotalVenta} />
            <ListDetail detail={totals.Abono} color="green" />
            <ListDetail detail={totals.TotalVenta - totals.Abono} color="red" />
            <ListDetail detail={(totals.TotalVenta - totals.TotalCompra)} color="blue" />
          </div>
        </ListInfoDetail>
      </ListInfo>
    </ListCard>
  );
}

export function InventoryListTotal({ data }) {
  const totals = data.reduce((acc, item) => {
    acc.TotalCompraCantidad += item.TotalCompraCantidad;
    acc.TotalVentaCantidad += item.TotalVentaCantidad;
    acc.Existencias += item.Existencias;
    acc.Ganancia += item.Ganancia;
    return acc;
  }, {
    TotalCompraCantidad: 0,
    TotalVentaCantidad: 0,
    Existencias: 0,
    Ganancia: 0,
  });

  return (
    <ListCard href="">
      <ListId id={data.length} />
      <ListInfo>
        <NameDateDiv>
          <ListName name="Total" />
          <ListDate date="" />
        </NameDateDiv>
        <ListInfoDetail>
          <div className="flex gap-1 sm:gap-2 flex-wrap md:flex-nowrap">
            <ListDetail detail={totals.Existencias} type="text" />
            <ListDetail detail={totals.Ganancia} color="blue" />
            <ListDetail detail={totals.TotalCompraCantidad} color="green" type="text" />
            <ListDetail detail={totals.TotalVentaCantidad} color="red" type="text" />
          </div>
        </ListInfoDetail>
      </ListInfo>
    </ListCard>
  );
}

function ListInfo({ children, display = "flex-col md:flex-row items-end md:items-center" }) {
  return (
    <div className={`flex ${display} grow md:gap-2 justify-between`}>
      {children}
    </div>
  );
}

function ListCard({ children}) {
  return (
    <div
      className="flex p-2 items-center gap-2"
    >
      {children}
    </div>
  );
}