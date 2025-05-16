import { getCategories } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListPhone } from "@/app/ui/lists/lists";
import EmptyList from "@/app/ui/lists/EmptyList";

export default async function Clients({ query, currentPage }) {
  const data = await getCategories(query, currentPage);

  if (data.length === 0) return <EmptyList query={query} />

  return (
    <List>
      {data.map(register => (
        <ListCard
          key={register.Id_categoria}
          href={`/categories/${register.Id_categoria}/edit`}
        >
          <ListId id={register.Id_categoria}/>
          <ListInfo>
            <ListName name={register.Nombre_categoria} />
          </ListInfo>
        </ListCard>
      ))}
    </List>
  );
}