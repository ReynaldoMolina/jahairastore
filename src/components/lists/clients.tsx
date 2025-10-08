import { PaginationComponent } from './pagination';
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
import EmptyList from '@/components/lists/empty-list';
import { ClientListHeader } from './list-header';
import { SearchParamsProps } from '@/types/types';
import { getClients } from '@/fetch-data/client';

export default async function Clients({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  const { data, totalPages } = await getClients(searchParams);

  if (data.length === 0) return <EmptyList />;

  return (
    <>
      <List>
        <ClientListHeader />
        {data.map((register) => (
          <ListCard key={register.id} href={`/clientes/${register.id}`}>
            <ListInfo>
              <ListId id={register.id} label="ID CLIENTE" />
              <ListName name={`${register.nombre} ${register.apellido}`} />
            </ListInfo>
            <ListInfoDetail>
              <ListPhone phone={register.telefono ?? ''} />
            </ListInfoDetail>
          </ListCard>
        ))}
      </List>
      <PaginationComponent totalPages={totalPages} />
      <ListBlankSpace />
    </>
  );
}
