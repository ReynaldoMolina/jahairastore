export default function EmptyList({ search }: { search: string }) {
  return (
    <p className="flex bg-white dark:bg-neutral-900 rounded-lg justify-center text-sm p-4 text-neutral-500 dark:text-neutral-300 cursor-default shadow-xs dark:shadow-none text-center">
      {`No hay resultados para "${search}"`}
    </p>
  );
}
