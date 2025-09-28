import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListBlankSpace,
} from '@/components/lists/lists';
import EmptyList from '@/components/lists/empty-list';
import { CategoryListHeader } from './list-header';
import { getCategories } from '@/fetch-data/categories';
import { SearchParamsProps } from '@/types/types';
import { PaginationComponent } from './pagination';

export default async function Categories({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const { data, totalPages } = await getCategories(searchParams);

  if (data.length === 0) return <EmptyList />;

  return (
    <>
      <List>
        <CategoryListHeader />
        {data.map((e) => (
          <ListCard key={e.id} href={`/categorias/${e.id}`}>
            <ListInfo hideBorder={true}>
              <ListId id={e.id} label="ID CATEGORIA" />
              <ListName name={e.categoria} />
            </ListInfo>
          </ListCard>
        ))}
      </List>
      <PaginationComponent totalPages={totalPages} />
      <ListBlankSpace />
    </>
  );
}
