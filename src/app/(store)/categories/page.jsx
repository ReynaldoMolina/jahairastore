import Link from "next/link";
import ActionTools from "@/app/ui/actiontools/ActionTools";
import Error from "@/app/ui/error/Error";
import fetchData from "@/app/lib/fetchData";

export default async function Page() {
  const data = await fetchData('/categories');

  if (!data) {
    return <Error message={data.message} />;
  }

  return (
    <>
      <ActionTools />
      <section className="flex flex-col w-full overflow-scroll gap-1 rounded-xl">
        {data.length === 0 && <p>No hay datos</p>}
        {data.map(register => (
          <Link
            key={register.id}
            href={`/categories/${register.id}`}
            className="flex rounded-xl bg-white dark:bg-neutral-700 p-2 items-center shadow-sm gap-2 hover:bg-sky-100 dark:hover:bg-neutral-600"
          >
            <span className="flex items-center justify-center bg-sky-200 p-1 min-w-12 h-6 rounded-xl text-xs text-black">{register.id}</span>
            <span className="flex w-full text-xs">{register.name}</span>
          </Link>
        ))}
      </section>
    </>
  );
};