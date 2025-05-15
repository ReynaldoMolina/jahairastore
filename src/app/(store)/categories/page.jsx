import Link from "next/link";
import ActionTools from "@/app/ui/actiontools/ActionTools";
import { getCategories } from "@/app/lib/data";

export default async function Page() {
  const data = await getCategories();

  if (data.length === 0) return <p>No hay resultados</p>;

  return (
    <>
      <ActionTools />
      <section className="flex flex-col w-full overflow-scroll gap-1 rounded-xl">
        {data.map(register => (
          <Link
            key={register.Id_categoria}
            href={`/categories/${register.Id_categoria}`}
            className="flex rounded-xl bg-white dark:bg-neutral-700 p-2 items-center shadow-sm gap-2 hover:bg-sky-100 dark:hover:bg-neutral-600"
          >
            <span className="flex items-center justify-center bg-sky-200 p-1 min-w-12 h-6 rounded-xl text-xs text-black">{register.Id_categoria}</span>
            <span className="flex w-full text-xs">{register.Nombre_categoria}</span>
          </Link>
        ))}
      </section>
    </>
  );
};
