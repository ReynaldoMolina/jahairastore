import { getReceipts } from '@/fetch-data/data';
import EmptyList from './empty-list';
import {
  List,
  ListCard,
  ListDate,
  ListDetail,
  ListId,
  ListInfo,
  ListInfoDetail,
  ListName,
} from './lists';
import { ReceiptListHeader } from './list-header';
import { ReceiptListTotal } from './list-total';
import { Pagination } from './pagination';

export default async function Receipts({ searchParams }) {
  const { data, query, totalPages } = await getReceipts(searchParams);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <List>
      <ReceiptListHeader />
      {data.map((register) => (
        <ListCard key={register.Id} href={`/recibos/${register.Id}`}>
          <ListInfo>
            <ListId id={register.Id} />
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
      <Pagination totalPages={totalPages} />
    </List>
  );
}
