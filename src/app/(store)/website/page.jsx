import ActionTools from "@/app/ui/actiontools/ActionTools";
import WebsiteProducts from "@/app/ui/lists/WebsiteProducts";

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <ActionTools />
      <WebsiteProducts query={query} currentPage={currentPage} />
    </>
  );
};