export default function EmptyList({ query }) {
  return (
    <p className="flex bg-white dark:bg-muted rounded-lg justify-center text-sm p-4 cursor-default shadow-xs dark:shadow-none text-center">
      {`No hay resultados para "${query}"`}
    </p>
  );
}
