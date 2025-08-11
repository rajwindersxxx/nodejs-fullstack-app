import { IoSearch } from "react-icons/io5";
import { Input } from "../ui/Input";
import { type ChangeEvent } from "react";
import { useUIContext } from "../../context/UIContext";

const SearchForm = () => {
  const { setSearch } = useUIContext();
  let timeoutId: ReturnType<typeof setTimeout>;

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setSearch(e.target.value);
    }, 500);
  }
  return (
    <div className="w-76 hover:w-96 focus:w-96 transition-all">
      <Input
        placeholder="Search For Job"
        type="text"
        style="rounded"

        onChange={handleSearch}
      >
        <IoSearch
          size={33}
          className="fill absolute top-[2px] right-1 rounded-full fill-gray-500 p-1"
        />
      </Input>
    </div>
  );
};

export default SearchForm;
