export default function Layout({
  children,
  modal,
  create,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  create: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
      {create}
    </>
  );
}
