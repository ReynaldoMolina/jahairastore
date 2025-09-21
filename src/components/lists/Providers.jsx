import { getRegisters } from '@/app/lib/data';
import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListInfoDetail,
  ListPhone,
  ListBlankSpace,
} from '@/components/lists/lists';
import { Pagination } from '@/components/lists/Pagination';
import EmptyList from '@/components/lists/EmptyList';
import { ProviderListHeader } from './ListHeader';

export default async function Providers({ searchParams }) {
  const { data, query, totalPages } = await getRegisters(
    'proveedores',
    searchParams
  );

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
