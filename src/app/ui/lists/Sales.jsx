import { getSales, getSalesPages } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDetail, ListDate } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import EmptyList from "@/app/ui/lists/EmptyList";
import { SaleListTotal } from "./ListTotal";

export default async function Sales({ query, currentPage }) {
  const data = await getSales(query, currentPage);
  const totalPages = await getSalesPages(query);

  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List>
      {data.map(register => (
        <ListCard
          key={register.Id}
          href={`/ventas/${register.Id}?query=disponibles`}
        >
          <ListId id={register.Id}/>
          <ListInfo>
            <ListName name={register.NombreCliente} />
              <ListInfoDetail>
                <ListDate date={register.Fecha} />
                <div className="flex gap-1 sm:gap-2 flex-wrap md:flex-nowrap">
                  <ListDetail detail={register.TotalVenta} color="green" />
                  <ListDetail detail={register.TotalCompra} color="red" />
                  <ListDetail detail={(register.TotalVenta - register.TotalCompra)} color="blue" />
                </div>
              </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      <SaleListTotal data={data} />
      <Pagination totalPages={totalPages} />
    </List>
  );
}