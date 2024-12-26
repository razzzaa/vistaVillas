import { useSearchParams } from "react-router-dom";
import Button from "./Button";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex bg-white p-1 m-2 rounded-l-md rounded-r-md border">
      {options.map((option) => (
        <Button
          key={options.value}
          onClick={() => handleClick(option.value)}
          buttonContainer={`items-center p-1 text-darker-yellow font-bold text-md transition-all hover:bg-medium-yellow rounded-md ${
            options.value === currentFilter ? "bg-medium-yellow" : ""
          }`}
          text={option.label}
        />
      ))}
    </div>
  );
}

export default Filter;
