import { getRegisters } from '@/fetch-data/data';
import EmptyList from './empty-list';
import { CategoryListHeader } from './list-header';
import {
  ListCard,
  ListInfo,
  ListId,
  ListName,
  ListBlankSpace,
  List,
} from './lists';
import { Pagination } from './pagination';

export default async function Categories({ searchParams }) {
  const { data, query, totalPages } = await getRegisters(
    'categorias',
    searchParams
  );

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <CategoryListHeader />
        {data.map((register) => (
          <ListCard key={register.Id} href={`/categorias/${register.Id}`}>
            <ListInfo hideBorder={true}>
              <ListId id={register.Id} label="ID CATEGORIA" />
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
