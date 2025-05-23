import { useState } from "react";

export default function SearchBar({onSearch}) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        autoComplete="off"
        onChange={handleChange}
        value={searchTerm}
        className="search-bar"
      />
    </>
  );
}
