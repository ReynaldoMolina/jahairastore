import { getOrders } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDetail, ListDate } from "@/app/ui/lists/lists";
import EmptyList from "@/app/ui/lists/EmptyList";

export default async function Orders({ query, currentPage }) {
  const data = await getOrders(query, currentPage);

  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List>
      {data.map(register => (
        <ListCard
          key={register.Id_pedido}
          href={`/orders/${register.Id_pedido}/edit`}
        >
          <ListId id={register.Id_pedido}/>
          <ListInfo>
            <ListName name={register.NombreCompleto} />
              <ListInfoDetail>
                <ListDate date={register.Fecha} />
                <div className="flex gap-1 sm:gap-2 flex-wrap md:flex-nowrap">
                  <ListDetail detail={register.TotalPedidoVenta} color="bg-neutral-200 dark:bg-neutral-600 text-right" type="number" />
                  <ListDetail detail={register.TotalAbono} color="bg-green-200 dark:bg-green-800 text-right" type="number" />
                  <ListDetail detail={register.Saldo} color="bg-red-200 dark:bg-red-800 text-right" type="number" />
                  <ListDetail detail={register.Ganancia} color="bg-blue-200 dark:bg-blue-800 text-right" type="number" />
                </div>
              </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
    </List>
  );
}