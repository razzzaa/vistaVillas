import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  padding: 0.8rem;
  box-shadow: var(--shadow-sm);
`;

function Sort({ options, value }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledSelect onChange={handleChange} value={sortBy}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Sort;
