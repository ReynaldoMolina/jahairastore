import { getExpenses } from '@/app/lib/data';
import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListInfoDetail,
  ListDetail,
  ListDate,
  ListDescription,
} from '@/components/lists/lists';
import { Pagination } from '@/components/lists/Pagination';
import EmptyList from '@/components/lists/EmptyList';
import { ExpensesListTotal } from './ListTotal';
import { ExpensesListHeader } from './ListHeader';

export default async function Expenses({ searchParams }) {
  const { data, query, totalPages } = await getExpenses(searchParams);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <ExpensesListHeader />
        {data.map((register) => (
          <ListCard key={register.Id} href={`/gastos/${register.Id}`}>
            <ListInfo>
              <ListId id={register.Id} label="ID GASTO" />
              <ListName name={register.Nombre_empresa} />
            </ListInfo>
            <ListInfoDetail>
              <ListDescription detail={register.Concepto} />
              <ListDate date={register.Fecha} />
              <ListDetail
                detail={register.Id_compra}
                label="Id compra"
                color="gray"
                number={false}
              />
              <ListDetail
                detail={register.Gasto * register.Cambio_dolar}
                label="Gasto"
                color="red"
                nio={true}
              />
            </ListInfoDetail>
          </ListCard>
        ))}
        <ExpensesListTotal data={data} />
      </List>
      <Pagination totalPages={totalPages} />
    </>
  );
}
