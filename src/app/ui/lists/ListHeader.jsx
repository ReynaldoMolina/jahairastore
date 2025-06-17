import { ListDetail, ListInfoDetail, ListName, ListId, ListDate, NameDateDiv, ListHeader, ListInfo, ListDescription } from "@/app/ui/lists/lists";

export function OrderListHeader() {
  return (
    <ListHeader>
      <ListId id="Id" color="gray"/>
      <ListInfoDetail>
        <ListDetail detail="Total" color="gray" type="text" />
        <ListDetail detail="Abono" color="green" type="text" />
        <ListDetail detail="Saldo" color="red" type="text" />
        <ListDetail detail="Ganancia" color="blue" type="text" />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function ReceiptListHeader() {
  return (
    <ListHeader>
      <ListId id="Id" color="gray" />
      <ListInfoDetail>
        <ListDetail detail="Id pedido" type="text" />
        <ListDetail detail="Abono" color="green" type="text" />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function PurchaseListHeader() {
  return (
    <ListHeader>
      <ListId id="Id" color="gray"/>
      <ListInfoDetail>
        <ListDetail detail="Total" type="text" />
        <ListDetail detail="Gastos" color="red" type="text" />
        <ListDetail detail="Ganancia" color="blue" type="text" />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function ExpensesListHeader() {
  return (
    <ListHeader>
      <ListId id="Id" color="gray" />
      <ListInfoDetail>
        <ListDetail detail="Id compr" type="text" />
        <ListDetail detail="Gasto" color="red" type="text" />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function SaleListHeader() {
  return (
    <ListHeader>
      <ListId id="Id" color="gray" />
      <ListInfoDetail>
        <ListDetail detail="Total" type="text" />
        <ListDetail detail="Saldo" color="red" type="text" />
        <ListDetail detail="Ganancia" color="blue" type="text" />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function InventoryListHeader() {
  return (
    <ListHeader>
      <ListId id="Id" color="gray" />
      <ListInfoDetail>
        <ListDetail detail="Cantidad" type="text" />
        <ListDetail detail="Precio" color="green" type="text" />
        <ListDetail detail="Ganancia" color="blue" type="text" />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function ProductListHeader() {
  return (
    <ListHeader>
      <ListId id="Id" color="gray" />
      <ListInfoDetail>
        <ListDetail detail="Venta" color="green" type="text" />
        <ListDetail detail="Compra" color="red" type="text" />
        <ListDetail detail="Ganancia" color="blue" type="text" />
      </ListInfoDetail>
    </ListHeader>
  );
}

export function ProductSearchListHeader({ price }) {
  return (
    <ListHeader>
      <ListId id="Id" color="gray" />
      <ListInfoDetail>
        <ListDetail detail="Precio" color={price === 'venta' ? 'green' : 'red'} type="text" />
        <ListDetail detail="Cantidad" type="text" />
      </ListInfoDetail>
    </ListHeader>
  );
}