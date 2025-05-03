import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";

function BookingTableOperations() {
  return (
    <div className="flex items-center">
      <Filter
        filterField="booking"
        options={[
          {
            value: "all",
            label: "All",
          },
          {
            value: "confirmed",
            label: "Checked-in",
          },
          {
            value: "unconfirmed",
            label: "Unconfirmed",
          },
          {
            value: "checked_out",
            label: "Checked out",
          },
        ]}
      />
      <Sort
        options={[
          { value: "startDate-asc", label: "Sort by date (earliest first)" },
          { value: "startDate-desc", label: "Sort by date (latest first)" },
        ]}
      />
    </div>
  );
}

export default BookingTableOperations;
