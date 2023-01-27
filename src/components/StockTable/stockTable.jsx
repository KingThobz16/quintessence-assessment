import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../DataTable/dataTable';
import '../tables.css'

function StockTable() {
  // Initial state to store the list of stocks, stock id and stock name
  const [stocksList, setStocksList] = useState([]);
  const [stockId, setStockId] = useState(null);
  const [stockName, setStockName] = useState('');

  // To retrieve the stocks list from the API endpoint after the component loads and everytime the stock ID changes.
  useEffect(() => {
    // Get the stocks data using the json-server api endpoint
    axios.get('http://localhost:5000/Stocks')
    // Update the stocksList state with the response data
    .then(res => setStocksList(res.data))
      .catch(err => console.log(err));
    }, [stockId]);

  return (
    <>
      <h1 className='heading'>Stocks</h1>
      <div className='upper__table'>
          <table>
              <thead>
                  <tr>
                    <th>Stock</th>
                    <th>Industry</th>
                    <th>Sector</th>
                    <th>Currency Code</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                    <td className="search__cell" colSpan="4">
                      <input type="text" className="search__input" placeholder="Search" />
                    </td>
                  </tr>
                  {/* iterate through the stocksList data and generate a row for each set of information */}
                  {stocksList.map(({id, stock, industry, sector, currency_code}) => (
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