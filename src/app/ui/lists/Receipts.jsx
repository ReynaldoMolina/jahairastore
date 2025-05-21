import { getReceipts } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDetail, ListDate } from "@/app/ui/lists/lists";
import EmptyList from "@/app/ui/lists/EmptyList";

export default async function Receipts({ query, currentPage }) {
  const data = await getReceipts(query, currentPage);
  // const abono = data ? data.reduce((sum, item) => sum + item.Abono, 0) : 0;
  // const receiptsGeneralTotal = {
  //   totalCount: data.length,
  //   abono
  // }

  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List>
      {data.map(register => (
        <ListCard
          key={register.Id_venta}
          href={`/receipts/${register.Id_venta}/edit`}
        >
          <ListId id={register.Id_venta}/>
          <ListInfo>
            <ListName name={register.NombreCompleto} />
              <ListInfoDetail>
                <ListDate date={register.Fecha} />
                <ListDetail detail={register.Id_pedido} color="bg-neutral-200/60 dark:bg-neutral-700 text-center" />
                <ListDetail detail={register.Abono} color="bg-green-200 dark:bg-green-900 text-right" type="number" />
              </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      {/* {data.length > 0 && (
        <ReceiptTotal receiptsGeneralTotal={receiptsGeneralTotal}/>
      )} */}
    </List>
  );
}