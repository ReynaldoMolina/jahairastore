import NewRegister from "@/app/ui/actiontools/NewRegister";
import WebsiteProducts from "@/app/ui/lists/WebsiteProducts";

export const metadata = {
  title: 'Productos website'
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <WebsiteProducts query={query} currentPage={currentPage} />
      <NewRegister />
    </>
  );
};