import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";

function CabinTableOperations() {
  return (
    <div className="flex items-center">
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <Sort />
    </div>
  );
}

export default CabinTableOperations;
