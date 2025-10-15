import { getRegisters } from '@/fetch-data/data';
import { ClientListHeader } from './list-header';
import EmptyList from './empty-list';
import {
  List,
  ListBlankSpace,
  ListCard,
  ListId,
  ListInfo,
  ListInfoDetail,
  ListName,
  ListPhone,
} from './lists';
import { Pagination } from './pagination';

export default async function Clients({ searchParams }) {
  const { data, query, totalPages } = await getRegisters(
    'clientes',
    searchParams
  );

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <ClientListHeader />
        {data.map((register) => (
          <ListCard key={register.Id} href={`/clientes/${register.Id}`}>
            <ListInfo>
              <ListId id={register.Id} label="ID CLIENTE" />
              <ListName name={`${register.Nombre} ${register.Apellido}`} />
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
