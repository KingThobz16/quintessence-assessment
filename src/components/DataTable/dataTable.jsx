import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { saveAs } from 'file-saver';
import { BsArrowDownUp } from 'react-icons/bs'
import '../tables.css'
import { InfinitySpin } from 'react-loader-spinner';

const DataTable = ({stockId, stockName}) => {
    // The initial stockData state which will be updated by the OK response of the json-server API Request.
    const [stockData, setStockData] = useState([]);

    // Initial sorting state, default ascending
    const [order, setOrder] = useState("ASC");

    // To retrieve the stocks data from the API endpoint after the component loads.
    useEffect(() => {
        // Get the stocks data using json-server api endpoint
        axios.get('http://localhost:5001/stockValues')
        // To update the stocksData state with the response data
            .then(res => setStockData(res.data))
            .catch(err => console.log(err));
    }, [stockId]);

    // Filter the data to be exported.
    // We filter the data by returning only the data with a stock_id which matches the stockId prop
    let filterdData = stockData.filter(({ stock_id }) => stock_id === stockId);

    // To export the data using the npm libary "file-saver"
    // This function will allow us to stringify the filterdData object and return it as a json file.
    const exportData = () => {
        const jsonExport = JSON.stringify(filterdData);
        const blob = new Blob([jsonExport], {type: "application/json"});
        saveAs(blob, `${stockName}.json`);
    }


      // Function for sorting the data in Ascending or descending order 
  const sortData = (col) => {
    if (order === "ASC") {
      // create a new array by spreading the original stocksList array
      // then sort this new array based on the value of the selected column
      const sorted = [...filterdData].sort((a, b) => a[col] > b[col] ? 1 : -1 );
      // update the original stocksList with the newly sorted array
      setStockData(sorted);
      // change the order state to 'DESC'
      setOrder('DESC')
    }
    // Repeat the same for Desc order
    if (order === "DESC") {
      const sorted = [...filterdData].sort((a, b) => a[col] < b[col] ? 1 : -1 );
      setStockData(sorted);
      setOrder('ASC')
    }
  }
    
  return (
    <>
        <h1 className='heading'>{stockName}</h1>
        <div className='lower__table'>
            <table>
                <thead>
                    <tr>
                        {/* An onClick event listener on column heading to run the sortData function */}
                        <th>Stock</th>
                        <th onClick={() => sortData('date')}>Date <BsArrowDownUp/></th>
                        <th onClick={() => sortData('value')}>Value <BsArrowDownUp/></th>
                    </tr>
                </thead>
                <tbody>
                    {/* Iterate through the filtered data and generate a row for each set of information */}
                    {
                        filterdData ? 
                        (filterdData.map(({date, value}, index) => {
                            return (
                                <tr key={index}>
                                    <td>{stockName}</td>
                                    <td>{date}</td>
                                    <td>{value}</td>
                                </tr>
                            )
                        }))
                        :
                        <InfinitySpin color="#000" height={200} width={200} />
                    }
                </tbody>
            </table>
        </div>
        {/* An onclick event listener on the button to execute the exportData function */}
        <button onClick={exportData}>Export As Json</button>
    </>
  )
}

export default DataTable