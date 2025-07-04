import { getSales, getSalesPages } from '@/app/lib/data';
import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListInfoDetail,
  ListDetail,
  ListDate,
  NameDateDiv,
  ListBlankSpace,
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination';
import EmptyList from '@/app/ui/lists/EmptyList';
import { SaleListTotal } from './ListTotal';
import { SaleListHeader } from './ListHeader';

export default async function Sales({ query, currentPage }) {
  const data = await getSales(query, currentPage);
  const totalPages = await getSalesPages(query);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <SaleListHeader />
        {data.map((register) => (
          <ListCard
            key={register.Id}
            href={`/ventas/${register.Id}?query=disponibles`}
          >
            <ListId id={register.Id} />
            <ListInfo>
              <ListName name={register.NombreCliente} />
              <ListInfoDetail>
                <ListDate date={register.Fecha} />
                <ListDetail
                  detail={register.TotalVenta}
                  label="Total"
                  color="gray"
                  nio={true}
                />
                <ListDetail
                  detail={register.Saldo || 0}
                  label="Saldo"
                  color="red"
                  nio={true}
                  ping={register.Saldo > 0.001}
                />
                <ListDetail
                  detail={register.TotalVenta - register.TotalCompra}
                  label="Ganancia"
                  color="blue"
                  nio={true}
                />
              </ListInfoDetail>
            </ListInfo>
          </ListCard>
        ))}
        <SaleListTotal data={data} />
      </List>
      <Pagination totalPages={totalPages} />
      <ListBlankSpace />
    </>
  );
}
