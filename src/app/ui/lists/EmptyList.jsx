export default function EmptyList({ query }) {
  return (
    <p
      className="flex bg-white dark:bg-neutral-800 rounded-xl justify-center text-sm p-3 text-neutral-500 dark:text-neutral-300 cursor-default shadow-xs dark:shadow-none text-center"
    >No hay resultados para "{query}"</p>
  );
}