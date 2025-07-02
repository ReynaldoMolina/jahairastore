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
  NameDateDiv,
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination2';
import EmptyList from '@/app/ui/lists/EmptyList';
import { ExpensesListTotal } from './ListTotal';
import { ExpensesListHeader } from './ListHeader';

export default async function Expenses({ query, currentPage }) {
  const data = await getExpenses(query, currentPage);
  const totalPages = await getExpensesPages(query);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <List blankSpaceBottom={false}>
      <ExpensesListHeader />
      {data.map((register) => (
        <ListCard key={register.Id} href={`/gastos/${register.Id}`}>
          <ListId id={register.Id} />
          <ListInfo>
            <NameDateDiv>
              <ListName name={register.Nombre_empresa} />
              <ListDate date={register.Fecha} />
            </NameDateDiv>
            <ListDescription detail={register.Concepto} />
            <ListInfoDetail>
              <ListDetail detail={register.Id_compra} type="text" />
              <ListDetail
                detail={register.Gasto * register.Cambio_dolar}
                color="red"
              />
            </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      <ExpensesListTotal data={data} />
      <Pagination totalPages={totalPages} />
    </List>
  );
}
