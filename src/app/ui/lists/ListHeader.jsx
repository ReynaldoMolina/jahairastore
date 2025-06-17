import { ListDetail, ListInfoDetail, ListName, ListId, ListDate, NameDateDiv, ListCardNoLink, ListInfo, ListDescription } from "@/app/ui/lists/lists";

export function OrderListHeader() {
  return (
    <ListCardNoLink>
      <ListId id="Id"/>
      <ListInfo>
        <NameDateDiv>
          <ListName name="Cliente" />
          <ListDate date="Fecha" />
        </NameDateDiv>
        <ListInfoDetail>
          <ListDetail detail="Total" color="gray" type="text" />
          <ListDetail detail="Abono" color="green" type="text" />
          <ListDetail detail="Saldo" color="red" type="text" />
          <ListDetail detail="Ganancia" color="blue" type="text" />
        </ListInfoDetail>
      </ListInfo>
    </ListCardNoLink>
  );
}

export function ReceiptListHeader() {
  return (
    <ListCardNoLink>
      <ListId id="Id"/>
      <ListInfo>
        <NameDateDiv>
          <ListName name="Cliente" />
          <ListDate date="Fecha" />
        </NameDateDiv>
        <ListInfoDetail>
          <ListDetail detail="Id pedido" type="text" />
          <ListDetail detail="Abono" color="green" type="text" />
        </ListInfoDetail>
      </ListInfo>
    </ListCardNoLink>
  );
}

export function PurchaseListHeader() {
  return (
    <ListCardNoLink>
      <ListId id="Id"/>
      <ListInfo>
        <NameDateDiv>
          <ListName name="Proveedor" />
          <ListDate date="Fecha" />
        </NameDateDiv>
        <ListInfoDetail>
          <ListDetail detail="T. venta" color="green" type="text" />
          <ListDetail detail="T. compr" color="red" type="text" />
          <ListDetail detail="Gastos" color="amber" type="text" />
          <ListDetail detail="Ganancia" color="blue" type="text" />
        </ListInfoDetail>
      </ListInfo>
    </ListCardNoLink>
  );
}

export function ExpensesListHeader() {
  return (
    <ListCardNoLink>
      <ListId id="Id"/>
      <ListInfo>
        <NameDateDiv>
          <ListName name="Proveedor" />
          <ListDate date="Fecha" />
        </NameDateDiv>
        <ListDescription detail="Descripción" />
        <ListInfoDetail>
          <ListDetail detail="Id compr" type="text" />
          <ListDetail detail="Gasto" color="red" type="text" />
        </ListInfoDetail>
      </ListInfo>
    </ListCardNoLink>
  );
}

export function SaleListHeader() {
  return (
    <ListCardNoLink>
      <ListId id="Id" />
      <ListInfo>
        <NameDateDiv>
          <ListName name="Cliente" />
          <ListDate date="Fecha" />
        </NameDateDiv>
        <ListInfoDetail>
          <ListDetail detail="Total" color="green" type="text" />
          <ListDetail detail="Saldo" color="red" type="text" />
          <ListDetail detail="Ganancia" color="blue" type="text" />
        </ListInfoDetail>
      </ListInfo>
    </ListCardNoLink>
  );
}

export function InventoryListHeader() {
  return (
    <ListCardNoLink>
      <ListId id="Id" />
      <ListInfo>
        <NameDateDiv>
          <ListName name="Producto" />
          <ListDate date="" />
        </NameDateDiv>
        <ListInfoDetail>
          <ListDetail detail="Cantidad" type="text" />
          <ListDetail detail="P. venta" color="green" type="text" />
          <ListDetail detail="Ganancia" color="blue" type="text" />
        </ListInfoDetail>
      </ListInfo>
    </ListCardNoLink>
  );
}

export function ProductListHeader() {
  return (
    <ListCardNoLink>
      <ListId id="Id" />
      <ListInfo>
        <NameDateDiv>
          <ListName name="Producto" />
          <ListDate date="Fecha agregado" />
        </NameDateDiv>
        <ListInfoDetail>
          <ListDetail detail="P. venta" color="green" type="text" />
          <ListDetail detail="P. comp" color="red" type="text" />
          <ListDetail detail="Ganancia" color="blue" type="text" />
        </ListInfoDetail>
      </ListInfo>
    </ListCardNoLink>
  );
}