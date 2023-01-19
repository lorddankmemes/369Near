import React, { useState } from 'react'

function SearchHeader() {

  /* const [APIData, setAPIData] = useState([]) */ 
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = APIData.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(APIData)
    }
}

  return (
    <>
    <div htmlFor="search-form">
        <input
              type="search"
              name="search-form"
              id="search-form"
              className="outline outline-gray-500 h-10 rounded-full"
              placeholder="Search items, collections, and accounts"
              style={{width:"320px", padding:"20px", background:"none", fontSize: "13px"}}
              onChange={(e) => searchItems(e.target.value)}
              //use viewMethod nft smart contract
        />
        <div>
               {/*  {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <Card>
                                <Card.Content>
                                    <Card.Header>{item.name}</Card.Header>
                                    <Card.Description>
                                        {item.email}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })
                ) : (
                    APIData.map((item) => {
                        return (
                            <Card>
                                <Card.Content>
                                    <Card.Header>{item.name}</Card.Header>
                                    <Card.Description>
                                        {item.email}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })
                )} */}
            </div>
    </div>
    </>
  )
}

export default SearchHeader