import {
  ListDetail,
  ListInfoDetail,
  ListName,
  ListId,
  ListHeader,
  ListPhone,
  ListDescription,
  ListDate,
  ListInfo,
} from '@/components/lists/lists';

export function CategoryListHeader() {
  return (
    <ListHeader>
      <ListInfo>
        <ListId id="ID" color="none" />
        <ListName name="NOMBRE" />
      </ListInfo>
    </ListHeader>
  );
}

export function ProviderListHeader() {
  return (
    <ListHeader>
      <ListInfo>
        <ListId id="ID" color="none" />
        <ListName name="NOMBRE" />
      </ListInfo>
      <ListInfoDetail>
        <ListPhone phone="TELÉFONO" color="none" />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function ClientListHeader() {
  return (
    <ListHeader>
      <ListInfo>
        <ListId id="ID" color="none" />
        <ListName name="NOMBRE" />
      </ListInfo>
      <ListInfoDetail>
        <ListPhone phone="TELÉFONO" color="none" />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function OrderListHeader() {
  return (
    <ListHeader>
      <ListInfo>
        <ListId id="ID" color="none" />
        <ListName name="CLIENTE" />
      </ListInfo>
      <ListInfoDetail>
        <ListDate />
        <ListDetail detail="TOTAL" color="none" number={false} />
        <ListDetail detail="ABONO" color="none" number={false} />
        <ListDetail detail="SALDO" color="none" number={false} />
        <ListDetail detail="GANANCIA" color="none" number={false} />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function RegisterDetailListHeader() {
  return (
    <ListHeader>
      <ListInfo>
        <ListId id="ID" color="none" />
        <ListName name="PRODUCTO" />
      </ListInfo>
      <ListInfoDetail>
        <ListDetail detail="PRECIO" number={false} />
        <ListDetail detail="CANTIDAD" number={false} />
        <ListDetail detail="VENTA" number={false} />
        <ListDetail detail="COMPRA" number={false} />
        <ListDetail detail="GANANCIA" number={false} />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function ReceiptListHeader() {
  return (
    <ListHeader>
      <ListInfo>
        <ListId id="ID" color="none" />
        <ListName name="CLIENTE" color="none" />
      </ListInfo>
      <ListInfoDetail>
        <ListDate />
        <ListDetail detail="ID PEDIDO" color="none" number={false} />
        <ListDetail detail="ABONO" color="none" number={false} />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function PurchaseListHeader() {
  return (
    <ListHeader>
      <ListInfo>
        <ListId id="ID" color="none" />
        <ListName name="EMPRESA" />
      </ListInfo>
      <ListInfoDetail>
        <ListDate />
        <ListDetail detail="TOTAL" number={false} />
        <ListDetail detail="GASTOS" number={false} />
        <ListDetail detail="GANANCIA" number={false} />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function ExpensesListHeader() {
  return (
    <ListHeader>
      <ListInfo>
        <ListId id="ID" color="none" />
        <ListName name="EMPRESA" color="none" />
      </ListInfo>
      <ListInfoDetail>
        <ListDescription detail="CONCEPTO" header={true} />
        <ListDetail detail="FECHA" color="none" number={false} />
        <ListDetail detail="ID COMPRA" color="none" number={false} />
        <ListDetail detail="GASTO" color="none" number={false} />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function SaleListHeader() {
  return (
    <ListHeader>
      <ListInfo>
        <ListId id="ID" color="none" />
        <ListName name="CLIENTE" />
      </ListInfo>
      <ListInfoDetail>
        <ListDate />
        <ListDetail detail="TOTAL" number={false} />
        <ListDetail detail="SALDO" number={false} />
        <ListDetail detail="GANANCIA" number={false} />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function InventoryListHeader() {
  return (
    <ListHeader>
      <ListInfo>
        <ListId id="ID" color="none" />
        <ListName name="PRODUCTO" />
      </ListInfo>
      <ListInfoDetail>
        <ListDetail detail="ID EXTERNO" number={false} />
        <ListDetail detail="DISPONIBLES" number={false} />
        <ListDetail detail="PRECIO" number={false} />
        <ListDetail detail="GANANCIA" number={false} />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function ProductListHeader() {
  return (
    <ListHeader>
      <ListInfo>
        <ListId id="ID" color="none" />
        <ListName name="PRODUCTO" />
      </ListInfo>
      <ListInfoDetail>
        {/* <ListDate /> */}
        <ListDetail detail="ID EXTERNO" number={false} />
        <ListDetail detail="VENTA" number={false} />
        <ListDetail detail="COMPRA" number={false} />
        <ListDetail detail="GANANCIA" number={false} />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function ProductSearchListHeader({ inventario }) {
  return (
    <ListHeader>
      <ListInfo>
        <ListId id="ID" color="none" />
        <ListName name="PRODUCTO" />
      </ListInfo>
      <ListInfoDetail>
        <ListDetail detail="ID EXTERNO" number={false} />
        <ListDetail detail="PRECIO" number={false} />
        {inventario && <ListDetail detail="DISPONIBLES" number={false} />}
        <div className="h-3 min-w-7"></div>
      </ListInfoDetail>
    </ListHeader>
  );
}
