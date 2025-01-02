import { useSearchParams } from "react-router-dom";
import Button from "./Button";

function Filter({ filterField, options }) {
  console.log(filterField);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;
  console.log(currentFilter);

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <div className="flex bg-white p-1 m-2 rounded-l-md rounded-r-md border items-center ">
      {options.map((option) => (
        <Button
          key={option.value}
          isPressed={option.value !== currentFilter}
          active={
            option.value === currentFilter
              ? "bg-medium-yellow rounded-md p-1"
              : "hover:bg-medium-yellow rounded-md p-1"
          }
          onClick={() => handleClick(option.value)}
          buttonContainer={
            "items-center p-1 text-darker-yellow font-bold text-md transition-all rounded-md "
          }
          text={option.label}
        />
      ))}
    </div>
  );
}

export default Filter;
