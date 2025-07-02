import { getCategories, getCategoriesPages } from '@/app/lib/data';
import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination2';
import EmptyList from '@/app/ui/lists/EmptyList';

export default async function Categories({ query, currentPage }) {
  const data = await getCategories(query, currentPage);
  const totalPages = await getCategoriesPages(query);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <List>
      {data.map((register) => (
        <ListCard key={register.Id} href={`/categorias/${register.Id}`}>
          <ListId id={register.Id} />
          <ListInfo>
            <ListName name={register.Nombre} />
          </ListInfo>
        </ListCard>
      ))}
      <Pagination totalPages={totalPages} />
    </List>
  );
}
