import { getRegisters } from '@/app/lib/data';
import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListBlankSpace,
} from '@/components/lists/lists';
import EmptyList from '@/components/lists/EmptyList';
import { CategoryListHeader } from './ListHeader';
import { Pagination } from '@/components/lists/Pagination';

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
