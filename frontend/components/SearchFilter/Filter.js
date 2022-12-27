import React, { useState }  from 'react'
import marketOption from "../../data/filter/marketOption.json";

function Filter() {

  const [market, setMarket] = useState("");

  return (
    <>
    <select
      className='text-black p-4 box-border h-14 w-40 text-center border-2 bg-white border-orange-600 rounded-md'
      value={market}
      onChange={(e) => setGenre(e.target.value)}
    >
      {marketOption.map((option, i) => {
        return (
          <option value={option.value} key={i} >
              {option.label}
          </option>
        );
      })}
    </select>
    </>
  )
}

export default Filter