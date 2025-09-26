import { getReceipts } from '@/app/lib/data';
import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListInfoDetail,
  ListDetail,
  ListDate,
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination';
import EmptyList from '@/app/ui/lists/EmptyList';
import { ReceiptListTotal } from './ListTotal';
import { ReceiptListHeader } from './ListHeader';

export default async function Receipts({ searchParams }) {
  const { data, query, totalPages } = await getReceipts(searchParams);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List blankSpaceBottom={false}>
        <ReceiptListHeader />
        {data.map((register) => (
          <ListCard key={register.Id} href={`/recibos/${register.Id}`}>
            <ListInfo>
              <ListId id={register.Id} label="ID RECIBO" />
              <ListName name={register.NombreCliente} />
            </ListInfo>
            <ListInfoDetail>
              <ListDate date={register.Fecha} />
              <ListDetail
                detail={register.Id_pedido}
                label="Id pedido"
                color="gray"
                number={false}
              />
              <ListDetail detail={register.Abono} label="Abono" color="green" />
            </ListInfoDetail>
          </ListCard>
        ))}
        <ReceiptListTotal data={data} />
      </List>
      <Pagination totalPages={totalPages} />
    </>
  );
}
