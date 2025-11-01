import { getSales } from '@/fetch-data/sales';
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
import { SaleListHeader } from './list-header';
import { SaleListTotal } from './list-total';
import { Pagination } from './pagination';

export default async function Sales({ searchParams }) {
  const { data, query, totalPages } = await getSales(searchParams);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <List>
      <SaleListHeader />
      {data.map((register) => (
        <ListCard key={register.id} href={`/ventas/${register.id}`}>
          <ListInfo>
            <ListId id={register.id} />
            <ListName name={register.nombreCliente} />
          </ListInfo>
          <ListInfoDetail>
            <ListDate date={register.fecha} />
            <ListDetail
              detail={register.totalVenta}
              label="Total venta"
              color="gray"
              nio={true}
            />
            <ListDetail
              detail={register.saldo || 0}
              label="Saldo"
              color="red"
              nio={true}
              ping={register.saldo > 0}
            />
            <ListDetail
              detail={
                Number(register.totalVenta) - Number(register.totalCompra)
              }
              label="Ganancia"
              color="blue"
              nio={true}
            />
          </ListInfoDetail>
        </ListCard>
      ))}
      <SaleListTotal data={data} />
      <Pagination totalPages={totalPages} />
    </List>
  );
}
