import { getSales, getSalesPages } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDetail, ListDate, NameDateDiv } from "@/app/ui/lists/lists";
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
          hasSaldo={register.Saldo > 0.001}
        >
          <ListId id={register.Id}/>
          <ListInfo>
            <NameDateDiv>
              <ListName name={register.NombreCliente} />
              <ListDate date={register.Fecha} />
            </NameDateDiv>
            <ListInfoDetail>
              <ListDetail detail={register.TotalVenta} />
              <ListDetail detail={register.Abono || 0} color="green" />
              <ListDetail detail={register.Saldo || 0} color="red" />
              <ListDetail detail={(register.TotalVenta - register.TotalCompra)} color="blue" />
            </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      <SaleListTotal data={data} />
      <Pagination totalPages={totalPages} />
    </List>
  );
}