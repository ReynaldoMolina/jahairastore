import { getProviders, getProvidersPages } from '@/app/lib/data';
import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListInfoDetail,
  ListPhone,
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination';
import EmptyList from '@/app/ui/lists/EmptyList';

export default async function Providers({ query, currentPage }) {
  const data = await getProviders(query, currentPage);
  const totalPages = await getProvidersPages(query);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <List>
      {data.map((register) => (
        <ListCard key={register.Id} href={`/proveedores/${register.Id}`}>
          <ListId id={register.Id} />
          <ListInfo display="flex-row items-center">
            <ListName name={register.Nombre_empresa} />
            <ListInfoDetail>
              <ListPhone phone={register.Telefono} />
            </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      <Pagination totalPages={totalPages} />
    </List>
  );
}
