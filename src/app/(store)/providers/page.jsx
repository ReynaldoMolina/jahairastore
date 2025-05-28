import ActionTools from "@/app/ui/actiontools/ActionTools";
import Providers from "@/app/ui/lists/Providers";

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <ActionTools />
      <Providers query={query} currentPage={currentPage} />
    </>
  );
};