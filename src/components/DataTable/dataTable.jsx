import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { saveAs } from 'file-saver';
import '../tables.css'

const DataTable = ({stockId, stockName}) => {
    const [stockData, setStockData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/stockValues')
            .then(res => setStockData(res.data))
            .catch(err => console.log(err));
    }, []);

    let filterdData = stockData.filter(({ stock_id }) => stock_id === stockId);

    const exportData = () => {
        const jsonExport = JSON.stringify(filterdData);
        const blob = new Blob([jsonExport], {type: "application/json"});
        saveAs(blob, `${stockName}.json`);
    }
    
  return (
    <>
        <h1 className='heading'>{stockName}</h1>
        <div className='lower__table'>
            <table>
                <thead>
                    <tr>
                        <th>Stock</th>
                        <th>Date</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {filterdData.map(({date, value}, index) => {
                        return (
                            <tr key={index}>
                                <td>{stockName}</td>
                                <td>{date}</td>
                                <td>{value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <button onClick={exportData}>Export As Json</button>
    </>
  )
}

export default DataTable