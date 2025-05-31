import { getOrders, getOrdersPages } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDetail, ListDate } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import EmptyList from "@/app/ui/lists/EmptyList";
import getDate from "@/app/lib/getDate";

export default async function Orders({ query, currentPage }) {
  const data = await getOrders(query, currentPage);
  const totalPages = await getOrdersPages(query);
  const currentDate = getDate();

  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List>
      {data.map(register => (
        <ListCard
          key={register.Id_pedido}
          href={`/orders/${register.Id_pedido}/edit?query=${currentDate}`}
        >
          <ListId id={register.Id_pedido}/>
          <ListInfo>
            <ListName name={register.NombreCompleto} />
              <ListInfoDetail>
                <ListDate date={register.Fecha} />
                <div className="flex gap-1 sm:gap-2 flex-wrap md:flex-nowrap">
                  <ListDetail detail={register.TotalPedidoVenta} color="bg-neutral-200/60 dark:bg-neutral-700 text-right" type="number" />
                  <ListDetail detail={register.TotalAbono} color="bg-green-200 dark:bg-green-900 text-right" type="number" />
                  <ListDetail detail={(register.TotalPedidoVenta - register.TotalAbono)} color="bg-red-200 dark:bg-red-900 text-right" type="number" />
                  <ListDetail detail={(register.TotalPedidoVenta - register.TotalPedidoCompra)} color="bg-blue-200 dark:bg-blue-900 text-right" type="number" />
                </div>
              </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      <Pagination totalPages={totalPages} />
    </List>
  );
}