import { getOrders, getOrdersPages } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDate, ListDetail } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import EmptyList from "@/app/ui/lists/EmptyList";
import { OrderListTotal } from "./ListTotal";

export default async function Orders({ query, currentPage }) {
  const data = await getOrders(query, currentPage);
  const totalPages = await getOrdersPages(query);

  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List>
      {data.map(register => (
        <ListCard
          key={register.Id}
          href={`/pedidos/${register.Id}`}
        >
          <ListId id={register.Id}/>
          <ListInfo>
            <ListName name={register.NombreCliente} />
              <ListInfoDetail>
                <ListDate date={register.Fecha} />
                <div className="flex gap-1 sm:gap-2 flex-wrap md:flex-nowrap">
                  <ListDetail detail={register.TotalPedidoVenta} color="gray" />
                  <ListDetail detail={register.TotalAbono} color="green" />
                  <ListDetail detail={(register.TotalPedidoVenta - register.TotalAbono)} color="red" />
                  <ListDetail detail={(register.TotalPedidoVenta - register.TotalPedidoCompra)} color="blue" />
                </div>
              </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      <OrderListTotal data={data} />
      <Pagination totalPages={totalPages} />
    </List>
  );
}