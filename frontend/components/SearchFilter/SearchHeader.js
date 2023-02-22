import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

function SearchHeader() {
  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchItems(searchTerm);
  };

  return (
    <>
      <div htmlFor="search-form">
        <div className="relative">
          <input
            type="search"
            name="search-form"
            id="search-form"
            className="h-10 rounded-full border border-gray-700 focus:outline focus:outline-gray-500"
            placeholder="Search items, collections, and accounts"
            style={{
              width: "320px",
              padding: "20px",
              background: "none",
              fontSize: "13px",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            //use viewMethod nft smart contract
          />
          <div
            className="pl-2 pr-3 absolute inset-y-0 right-0 flex items-center cursor-pointer"
            onClick={handleSearch}
          >
            <AiOutlineSearch
              theme="outline"
              size="22"
              className="text-gray-500"
            />
          </div>
        </div>
        <div>
          {searchInput.length > 1
            ? filteredResults.map((item) => {
                return (
                  <Card>
                    <Card.Content>
                      <Card.Header>{item.name}</Card.Header>
                      <Card.Description>{item.email}</Card.Description>
                    </Card.Content>
                  </Card>
                );
              })
            : APIData.map((item) => {
                return (
                  <Card>
                    <Card.Content>
                      <Card.Header>{item.name}</Card.Header>
                      <Card.Description>{item.email}</Card.Description>
                    </Card.Content>
                  </Card>
                );
              })}
        </div>
      </div>
    </>
  );
}

export default SearchHeader;
