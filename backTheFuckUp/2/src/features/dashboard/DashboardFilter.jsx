import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "last 7 days" },
        { value: "30", label: "last 30 days" },
        { value: "90", label: "last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
