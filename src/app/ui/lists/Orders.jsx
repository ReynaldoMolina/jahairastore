import { getOrders, getOrdersPages } from '@/app/lib/data';
import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListInfoDetail,
  ListDetail,
  ListBlankSpace,
  ListDate,
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination';
import EmptyList from '@/app/ui/lists/EmptyList';
import { OrderListTotal } from './ListTotal';
import { OrderListHeader } from './ListHeader';

export default async function Orders({ query, currentPage }) {
  const data = await getOrders(query, currentPage);
  const totalPages = await getOrdersPages(query);
  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <OrderListHeader />
        {data.map((register) => {
          const saldo = register.TotalPedidoVenta - register.TotalAbono;

          return (
            <ListCard key={register.Id} href={`/pedidos/${register.Id}`}>
              <ListInfo>
                <ListId id={register.Id} />
                <ListName name={register.NombreCliente} />
              </ListInfo>
              <ListInfoDetail>
                <ListDate date={register.Fecha} />
                <ListDetail
                  detail={register.TotalPedidoVenta}
                  label="Total"
                  color="gray"
                />
                <ListDetail
                  detail={register.TotalAbono}
                  label="Abonos"
                  color="green"
                />
                <ListDetail
                  detail={saldo}
                  label="Saldo"
                  color="red"
                  ping={saldo > 0}
                />
                <ListDetail
                  detail={
                    register.TotalPedidoVenta - register.TotalPedidoCompra
                  }
                  label="Ganancia"
                  color="blue"
                />
              </ListInfoDetail>
            </ListCard>
          );
        })}
        <OrderListTotal data={data} />
      </List>
      <Pagination totalPages={totalPages} />
      <ListBlankSpace />
    </>
  );
}
