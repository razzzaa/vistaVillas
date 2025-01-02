import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";

function CabinTableOperations() {
  return (
    <div className="flex items-center">
      <Filter
        filterField="discount-availability"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
          { value: "available", label: "Available" },
        ]}
      />
      <Sort
        options={[
          {
            value: "cabin_name-asc",
            label: "Sort by name (A-Z)",
          },
          {
            value: "cabin_name-desc",
            label: "Sort by name (Z-A)",
          },
          {
            value: "price_per_night-asc",
            label: "Sort by price (low first)",
          },
          {
            value: "price_per_night-desc",
            label: "Sort by price (high first)",
          },
          {
            value: "max_capacity-asc",
            label: "Sort by capacity (low first)",
          },
          {
            value: "max_capacity-desc",
            label: "Sort by capacity (high first)",
          },
        ]}
      />
    </div>
  );
}

export default CabinTableOperations;
