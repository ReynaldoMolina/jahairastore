import { getReceipts, getReceiptsPages } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDetail, ListDate } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import EmptyList from "@/app/ui/lists/EmptyList";
import { ReceiptListTotal } from "./ListTotal";

export default async function Receipts({ query, currentPage }) {
  const data = await getReceipts(query, currentPage);
  const totalPages = await getReceiptsPages(query);

  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List blankSpaceBottom={false}>
      {data.map(register => (
        <ListCard
          key={register.Id}
          href={`/recibos/${register.Id}`}
        >
          <ListId id={register.Id}/>
          <ListInfo>
            <ListName name={register.NombreCliente} />
              <ListInfoDetail>
                <ListDate date={register.Fecha} />
                <ListDetail detail={register.Id_pedido} type="text" />
                <ListDetail detail={register.Abono} color="green" />
              </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      <ReceiptListTotal data={data} />
      <Pagination totalPages={totalPages} />
    </List>
  );
}