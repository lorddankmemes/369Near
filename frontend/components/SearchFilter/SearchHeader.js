import React from 'react'

function SearchHeader() {
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
        />
    </div>
    </>
  )
}

export default SearchHeader