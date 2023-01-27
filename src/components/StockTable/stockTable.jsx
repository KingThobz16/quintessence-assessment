import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../DataTable/dataTable';
import '../tables.css'
import { BsArrowDownUp } from 'react-icons/bs'

function StockTable() {
  // Initial state to store the list of stocks, stock id and stock name
  const [stocksList, setStocksList] = useState([]);
  const [stockId, setStockId] = useState(null);
  const [stockName, setStockName] = useState('');

  // Initial sorting state, default ascending
  const [order, setOrder] = useState("ASC");

  // Search term state to filter data.
  const [searchTerm, setSearchTerm] = useState("")


  // To retrieve the stocks list from the API endpoint after the component loads and everytime the stock ID changes.
  useEffect(() => {
    // Get the stocks data using the json-server api endpoint
    axios.get('http://localhost:5000/Stocks')
    // Update the stocksList state with the response data
    .then(res => setStocksList(res.data))
      .catch(err => console.log(err));
  }, [stockId]);


  // Function for sorting the data in Ascending or descending order 
  const sortData = (col) => {
    if (order === "ASC") {
      // create a new array by spreading the original stocksList array
      // then sort this new array based on the value of the selected column
      const sorted = [...stocksList].sort((a, b) => a[col] > b[col] ? 1 : -1 );
      // update the original stocksList with the newly sorted array
      setStocksList(sorted);
      // change the order state to 'DESC'
      setOrder('DESC')
    }
    // Repeat the same for Desc order
    if (order === "DESC") {
      const sorted = [...stocksList].sort((a, b) => a[col] < b[col] ? 1 : -1 );
      setStocksList(sorted);
      setOrder('ASC')
    }
  }


  return (
    <>
      <h1 className='heading'>Stocks</h1>

      <div className='upper__table'>
          <table>
              <thead>
                  <tr>
                    {/* An onClick event listener on column heading to run the sortData function */}
                    <th onClick={() => sortData('stock')}>Stock <BsArrowDownUp/></th>
                    <th onClick={() => sortData('industry')}>Industry <BsArrowDownUp/></th>
                    <th onClick={() => sortData('sector')}>Sector <BsArrowDownUp/></th>
                    <th onClick={() => sortData('currency_code')}>Currency Code <BsArrowDownUp/></th>
                  </tr>
              </thead>
              <tbody>
                  <tr className="search_row">
                    <td className="search__cell" colSpan="4">
                      {/* update the searchTerm with the input value */}
                      <input onChange={(e) => {setSearchTerm(e.target.value)}} type="text" className="search__input" placeholder="Search" />
                    </td>
                  </tr>
                  {/* Filter through the stocksList data based on the search term */}
                  {stocksList.filter((value) => {
                    // if the searchTerm is empty return the data as it is
                    if (searchTerm === "") {
                      return value;
                    
                      // if the searchTerm is not empty, filter the data with the searchTerm value  
                    } else if ( 
                      value.stock.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                      value.industry.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                      value.sector.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                      value.currency_code.toLowerCase().includes(searchTerm.toLocaleLowerCase())
                      ) {
                        return value;
                      }
                    {/* iterate through the stocksList data and generate a row for each set of information */}
                  }).map(({id, stock, industry, sector, currency_code}) => (
                    // An onclick event listener on the table row to update the stockId and stockName state
                    <tr key={id} onClick={() => {setStockId(id); setStockName(stock)}}>
                        <td>{stock}</td>
                        <td>{industry}</td>
                        <td>{sector}</td>
                        <td>{currency_code}</td>
                    </tr>
                  ))}
              </tbody>
          </table>
      </div>
        {
          // If the stockId state is true, render the DataTable component
          // and pass the stockId and stockName as props
          stockId && <DataTable stockId={stockId} stockName={stockName}/>
        }
    </>
  );
}

export default StockTable;