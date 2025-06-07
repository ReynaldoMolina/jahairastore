import { getExpenses, getExpensesPages } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDetail, ListDate, ListDescription } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import EmptyList from "@/app/ui/lists/EmptyList";
import { ExpensesListTotal } from "./ListTotal";

export default async function Expenses({ query, currentPage }) {
  const data = await getExpenses(query, currentPage);
  const totalPages = await getExpensesPages(query);

  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List>
      {data.map(register => (
        <ListCard
          key={register.Id}
          href={`/gastos/${register.Id}`}
        >
          <ListId id={register.Id}/>
          <ListInfo>
            <ListName name={register.Nombre_empresa} />
            <ListDescription detail={register.Concepto} />
              <ListInfoDetail>
                <ListDate date={register.Fecha} />
                <ListDetail detail={register.Id_compra} type="text" />
                <ListDetail detail={register.Gasto * register.Cambio_dolar} color="green" />
              </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      <ExpensesListTotal data={data} />
      <Pagination totalPages={totalPages} />
    </List>
  );
}