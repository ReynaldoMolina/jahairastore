import { getPurchases, getPurchasesPages } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDate, ListDetail, NameDateDiv } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import EmptyList from "@/app/ui/lists/EmptyList";
import { PurchaseListTotal } from "./ListTotal";
import { PurchaseListHeader } from "./ListHeader";

export default async function Purchases({ query, currentPage }) {
  const data = await getPurchases(query, currentPage);
  const totalPages = await getPurchasesPages(query);

  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List>
      <PurchaseListHeader />
      {data.map(register => (
        <ListCard
          key={register.Id}
          href={`/compras/${register.Id}`}
        >
          <ListId id={register.Id}/>
          <ListInfo>
            <NameDateDiv>
              <ListName name={register.Nombre_empresa} />
              <ListDate date={register.Fecha} />
            </NameDateDiv>
              <ListInfoDetail>
                <ListDetail detail={register.TotalCompraVenta} color="green" />
                <ListDetail detail={register.TotalCompraCompra} color="red" />
                <ListDetail detail={register.TotalGasto} color="amber" />
                <ListDetail detail={(register.TotalCompraVenta - register.TotalCompraCompra - register.TotalGasto)} color="blue" />
              </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      <PurchaseListTotal data={data} />
      <Pagination totalPages={totalPages} />
    </List>
  );
}