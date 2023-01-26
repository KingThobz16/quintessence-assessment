import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../DataTable/dataTable';
import '../tables.css'

function StockTable() {
  const [stocksList, setStocksList] = useState([]);
  const [stockId, setStockId] = useState(null);
  const [stockName, setStockName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/Stocks')
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
                  <tr><td className="search__cell" colSpan="4"><input type="text" className="search__input" placeholder="Search" /></td></tr>
                  {stocksList.map(({id, stock, industry, sector, currency_code}) => (
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
          stockId && <DataTable stockId={stockId} stockName={stockName}/>
        }
    </>
  );
}

export default StockTable;