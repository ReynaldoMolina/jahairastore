import { getOrders, getOrdersPages } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDate, ListDetail, NameDateDiv } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import EmptyList from "@/app/ui/lists/EmptyList";
import { OrderListTotal } from "./ListTotal";
import { OrderListHeader } from "./ListHeader";

export default async function Orders({ query, currentPage }) {
  const data = await getOrders(query, currentPage);
  const totalPages = await getOrdersPages(query);
  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List>
      <OrderListHeader />
      {data.map(register => {
        const saldo = (register.TotalPedidoVenta - register.TotalAbono);

        return (
          <ListCard
            key={register.Id}
            href={`/pedidos/${register.Id}`}
          >
            <ListId id={register.Id} />
            <ListInfo>
              <NameDateDiv>
                <ListName name={register.NombreCliente} />
                <ListDate date={register.Fecha} />
              </NameDateDiv>
                <ListInfoDetail>
                  <ListDetail detail={register.TotalPedidoVenta} color="gray" />
                  <ListDetail detail={register.TotalAbono} color="green" />
                  <ListDetail detail={saldo} color="red" ping={saldo > 0} />
                  <ListDetail detail={(register.TotalPedidoVenta - register.TotalPedidoCompra)} color="blue" />
                </ListInfoDetail>
            </ListInfo>
          </ListCard>
        )
      })}
      <OrderListTotal data={data} />
      <Pagination totalPages={totalPages} />
    </List>
  );
}