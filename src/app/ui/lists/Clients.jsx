import { getRegisters } from '@/app/lib/data';
import { Pagination } from './Pagination';
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
import EmptyList from '@/app/ui/lists/EmptyList';
import { ClientListHeader } from './ListHeader';

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
