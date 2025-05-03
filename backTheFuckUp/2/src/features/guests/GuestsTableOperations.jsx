import Search from "../../ui/Search";
import Sort from "../../ui/Sort";

function GuestsTableOperations() {
  return (
    <div className="flex items-center">
      <Search />
      <Sort
        options={[
          { value: "fullName-asc", label: "Sort by name (A-Z)" },
          { value: "fullName-desc", label: "Sort by name (Z-A)" },
          { value: "country-asc", label: "Sort by country (A-Z)" },
          { value: "country-desc", label: "Sort by country (Z-A)" },
          { value: "created_at-asc", label: "Sort by date (earliest first)" },
          { value: "created_at-desc", label: "Sort by date (latest first)" },
        ]}
      />
    </div>
  );
}

export default GuestsTableOperations;
