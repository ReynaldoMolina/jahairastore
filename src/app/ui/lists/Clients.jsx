import { getClients, getClientsPages } from '@/app/lib/data';
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

export default async function Clients({ query, currentPage }) {
  const data = await getClients(query, currentPage);
  const totalPages = await getClientsPages(query);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <>
      <List>
        <ClientListHeader />
        {data.map((register) => (
          <ListCard key={register.Id} href={`/clientes/${register.Id}`}>
            <ListInfo>
              <ListId id={register.Id} label="ID CLIENTE" />
              <ListName name={register.NombreCliente} />
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
