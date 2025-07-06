import { getExpenses, getExpensesPages } from '@/app/lib/data';
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
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination';
import EmptyList from '@/app/ui/lists/EmptyList';
import { ExpensesListTotal } from './ListTotal';
import { ExpensesListHeader } from './ListHeader';

export default async function Expenses({ query, currentPage }) {
  const data = await getExpenses(query, currentPage);
  const totalPages = await getExpensesPages(query);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <ExpensesListHeader />
        {data.map((register) => (
          <ListCard key={register.Id} href={`/gastos/${register.Id}`}>
            <ListInfo>
              <ListId id={register.Id} />
              <ListName name={register.Nombre_empresa} />
            </ListInfo>
            <ListInfoDetail>
              <ListDescription detail={register.Concepto} />
              <ListDate date={register.Fecha} />
              <ListDetail
                detail={register.Id_compra}
                label="Compra"
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
