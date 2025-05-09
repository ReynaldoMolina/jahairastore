import ActionTools from "@/app/ui/actiontools/ActionTools";

export default function Categories({
  // menuOption,
  // openModal,
  // setOpenModal,
  // setRegisterId,
  // setIsNew
}) {
  // const { data, isLoading } = useGetData(menuOption.url);
  // const filteredData = useFilterData(data, menuOption.name);

  // if (isLoading) return <Loading />;
  // if (openModal) return <CategoryForm />;

  return (
    <>
      <ActionTools />
      {/* <div className="flx flx-col register-list">
        {filteredData.length === 0 && <EmptyList/>}
        {filteredData.map(register => (
          <div
            key={register.id}
            className="flx register-card"
            onClick={() => {
              setRegisterId(register.id);
              setIsNew(false);
              setOpenModal(true);
            }}
          >
            <span className="flx flx-center id">{register.id}</span>
            <span className="name">{register.name}</span>
          </div>
        ))}
      </div> */}
    </>
  )
}