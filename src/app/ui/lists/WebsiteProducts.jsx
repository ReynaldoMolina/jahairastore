import { getWebsiteProducts, getWebsiteProductsPages } from '@/app/lib/data';
import {
  List,
  ListCard,
  ListId,
  ListName,
  ListInfo,
  ListInfoDetail,
  ListDetail,
} from '@/app/ui/lists/lists';
import { Pagination } from '@/app/ui/lists/Pagination2';
import EmptyList from '@/app/ui/lists/EmptyList';

export default async function WebsiteProduts({ query, currentPage }) {
  const data = await getWebsiteProducts(query, currentPage);
  const totalPages = await getWebsiteProductsPages(query);

  if (data.length === 0) return <EmptyList query={query} />;

  return (
    <List>
      {data.map((register) => (
        <ListCard key={register.Id} href={`/website/${register.Id}`}>
          <ListId id={register.Id} />
          <ListInfo>
            <ListName name={register.Nombre} />
            <ListInfoDetail>
              <ListDetail detail={register.Precio} color="green" />
            </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      <Pagination totalPages={totalPages} />
    </List>
  );
}
