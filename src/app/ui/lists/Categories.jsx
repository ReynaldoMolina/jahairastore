import { getCategories, getCategoriesPages } from '@/app/lib/data';
import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListBlankSpace,
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination';
import EmptyList from '@/app/ui/lists/EmptyList';
import { CategoryListHeader } from './ListHeader';

export default async function Categories({ query, currentPage }) {
  const data = await getCategories(query, currentPage);
  const totalPages = await getCategoriesPages(query);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <CategoryListHeader />
        {data.map((register) => (
          <ListCard key={register.Id} href={`/categorias/${register.Id}`}>
            <ListId id={register.Id} />
            <ListInfo>
              <ListName name={register.Nombre} />
            </ListInfo>
          </ListCard>
        ))}
      </List>
      <Pagination totalPages={totalPages} />
      <ListBlankSpace />
    </>
  );
}
