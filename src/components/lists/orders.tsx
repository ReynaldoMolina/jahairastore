import { getOrders } from '@/fetch-data/data';
import EmptyList from './empty-list';
import { OrderListHeader } from './list-header';
import { OrderListTotal } from './list-total';
import {
  ListCard,
  ListInfo,
  ListId,
  ListName,
  ListInfoDetail,
  ListDate,
  ListDetail,
  List,
} from './lists';
import { Pagination } from './pagination';

export default async function Orders({ searchParams }) {
  const { data, query, totalPages } = await getOrders(searchParams);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <List>
      <OrderListHeader />
      {data.map((register) => {
        const saldo = register.TotalPedidoVenta - register.TotalAbono;

        return (
          <ListCard key={register.Id} href={`/pedidos/${register.Id}`}>
            <ListInfo>
              <ListId id={register.Id} label="ID PEDIDO" />
              <ListName name={register.NombreCliente} />
            </ListInfo>
            <ListInfoDetail>
              <ListDate date={register.Fecha} />
              <ListDetail
                detail={register.TotalPedidoVenta}
                label="Total pedido"
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
                detail={register.TotalPedidoVenta - register.TotalPedidoCompra}
                label="Ganancia"
                color="blue"
              />
            </ListInfoDetail>
          </ListCard>
        );
      })}
      <OrderListTotal data={data} />
      <Pagination totalPages={totalPages} />
    </List>
  );
}
