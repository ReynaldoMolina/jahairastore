import {
  ListDetail,
  ListInfoDetail,
  ListName,
  ListId,
  ListHeader,
  ListPhone,
  ListDescription,
  ListDate,
} from '@/app/ui/lists/lists';

export function CategoryListHeader() {
  return (
    <ListHeader hide={false}>
      <ListId id="ID" color="none" />
      <ListName name="NOMBRE" />
    </ListHeader>
  );
}

export function ProviderListHeader() {
  return (
    <ListHeader hide={false}>
      <ListId id="ID" color="none" />
      <ListName name="NOMBRE" />
      <ListInfoDetail>
        <ListPhone phone="TELÉFONO" color="none" />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function ClientListHeader() {
  return (
    <ListHeader hide={false}>
      <ListId id="ID" color="none" />
      <ListName name="NOMBRE" />
      <ListInfoDetail>
        <ListPhone phone="TELÉFONO" color="none" />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function OrderListHeader() {
  return (
    <ListHeader>
      <ListId id="ID" color="none" />
      <ListName name="CLIENTE" />
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

export function ReceiptListHeader() {
  return (
    <ListHeader>
      <ListId id="ID" color="none" />
      <ListName name="CLIENTE" color="none" />
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
      <ListId id="ID" color="none" />
      <ListName name="EMPRESA" />
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
      <ListId id="ID" color="none" />
      <ListName name="EMPRESA" color="none" />
      <ListInfoDetail>
        <ListDetail detail="FECHA" color="none" number={false} />
        <ListDescription detail="CONCEPTO" header={true} />
        <ListDetail detail="ID COMPRA" color="none" number={false} />
        <ListDetail detail="GASTO" color="none" number={false} />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function SaleListHeader() {
  return (
    <ListHeader>
      <ListId id="ID" color="none" />
      <ListName name="CLIENTE" />
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
      <ListId id="ID" color="none" />
      <ListName name="PRODUCTO" />
      <ListInfoDetail>
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
      <ListId id="ID" color="none" />
      <ListName name="PRODUCTO" />
      <ListInfoDetail>
        <ListDate />
        <ListDetail detail="VENTA" number={false} />
        <ListDetail detail="COMPRA" number={false} />
        <ListDetail detail="GANANCIA" number={false} />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function ProductSearchListHeader({ price, inventario }) {
  return (
    <ListHeader>
      <ListId id="Id" />
      <ListInfoDetail>
        <ListDetail
          detail="Precio"
          color={price === 'venta' ? 'green' : 'red'}
          number={false}
        />
        {inventario && <ListDetail detail="Cantidad" number={false} />}
        <div className="size-7"></div>
      </ListInfoDetail>
    </ListHeader>
  );
}
