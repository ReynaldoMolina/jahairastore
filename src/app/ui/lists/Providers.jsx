import { getProviders, getProvidersPages } from '@/app/lib/data';
import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListInfoDetail,
  ListPhone,
  ListBlankSpace,
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination';
import EmptyList from '@/app/ui/lists/EmptyList';
import { ProviderListHeader } from './ListHeader';

export default async function Providers({ query, currentPage }) {
  const data = await getProviders(query, currentPage);
  const totalPages = await getProvidersPages(query);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <ProviderListHeader />
        {data.map((register) => (
          <ListCard key={register.Id} href={`/proveedores/${register.Id}`}>
            <ListInfo>
              <ListId id={register.Id} label="ID PROVEEDOR" />
              <ListName name={register.Nombre_empresa} />
            </ListInfo>
            <ListInfoDetail>
              <ListPhone phone={register.Telefono} />
            </ListInfoDetail>
          </ListCard>
        ))}
      </List>
      <Pagination totalPages={totalPages} />
      <ListBlankSpace />
    </>
  );
}
