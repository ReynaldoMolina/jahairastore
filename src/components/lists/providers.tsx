import { getRegisters } from '@/fetch-data/data';
import EmptyList from './empty-list';
import {
  List,
  ListCard,
  ListId,
  ListInfo,
  ListInfoDetail,
  ListName,
  ListPhone,
} from './lists';
import { ProviderListHeader } from './list-header';
import { Pagination } from './pagination';

export default async function Providers({ searchParams }) {
  const { data, query, totalPages } = await getRegisters(
    'proveedores',
    searchParams
  );

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <List>
      <ProviderListHeader />
      {data.map((register) => (
        <ListCard key={register.Id} href={`/proveedores/${register.Id}`}>
          <ListInfo>
            <ListId id={register.Id} />
            <ListName name={register.Nombre_empresa} />
          </ListInfo>
          <ListInfoDetail>
            <ListPhone phone={register.Telefono} />
          </ListInfoDetail>
        </ListCard>
      ))}
      <Pagination totalPages={totalPages} />
    </List>
  );
}
