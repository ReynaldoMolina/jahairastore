import { getWebsiteProducts, getWebsiteProductsPages } from "@/app/lib/data";
import { List, ListCard, ListId, ListName, ListInfo, ListInfoDetail, ListDetail } from "@/app/ui/lists/lists";
import { Pagination } from "@/app/ui/lists/pagination";
import EmptyList from "@/app/ui/lists/EmptyList";

export default async function WebsiteProduts({ query, currentPage }) {
  const data = await getWebsiteProducts(query, currentPage);
  const totalPages = await getWebsiteProductsPages(query);

  if (data.length === 0) return <EmptyList query={query}/>

  return (
    <List>
      {data.map(register => (
        <ListCard
          key={register.id}
          href={`/website/${register.id}/edit`}
        >
          <ListId id={register.id}/>
          <ListInfo>
            <ListName name={register.name} />
              <ListInfoDetail>
                <ListDetail
                  detail={register.price}
                  color="bg-green-200 dark:bg-green-900 text-right" 
                  type="number"  
                />
              </ListInfoDetail>
          </ListInfo>
        </ListCard>
      ))}
      <Pagination totalPages={totalPages} />
    </List>
  );
}