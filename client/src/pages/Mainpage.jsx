import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Mainpage() {

  //states for the form
  const [date, setdate] = useState(null);
  const [sourceCurreny, setSourceCurreny] = useState("");
  const [targetCurreny, setTargetCurreny] = useState("");
  const [sourceAmount, setSourceAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [load, setLoad] = useState(true);

  //handleSubmit functiom
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const respose = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurreny,
          targetCurreny,
          sourceAmount,
        },
      });

      setTargetAmount(respose.data);
      setLoad(false);

    }catch(err){
      console.error(err);

    }
  }

  //get all currency name use useEffect hook
  useEffect(()=>{
    const getCurrencyName = async() => {
      try{
        const respose = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setCurrencyNames(respose.data);
      }catch(err){
        console.error(err);

      }
    }
    getCurrencyName();
  },[])


  return (
    <div>
      <h1 className=" lg:mx-32 text-5xl font-bold text-green-500">
        Convert Your Currencies Today
      </h1>
      <p className="lg:mx-32 opacity-40 py-6"> Welcome to "Convert Your Currencies Today"! This application allows you
        to easily convert currencies based on the latest exchange rates. Whether
        you're planning a trip, managing your finances, or simply curious about
        the value of your money in different currencies, this tool is here to
        help.</p>

      <div className="mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
              <input onChange={(e) => setdate(e.target.value)}
                type="date" id={date} name={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
            </div>

            <div className="mb-4">
              <label htmlFor={sourceCurreny} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency
              </label>
              <select onChange={(e) => setSourceCurreny(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500    focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required name={sourceCurreny} id={sourceCurreny} value={sourceCurreny}>
              <option value="">Select the source Currency</option>
              {Object.keys(currencyNames).map((currency) =>(
                <option className="p-1" key={currency} value={currency}>
                  {currencyNames[currency]}
                </option>
              ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor={targetCurreny} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency
              </label>
              <select onChange={(e)=>setTargetCurreny(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500    focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required name={targetCurreny} id={targetCurreny} value={targetCurreny}>
              <option value="">Select the target Currency</option>
              {Object.keys(currencyNames).map((currency) =>(
                <option className="p-1" key={currency} value={currency}>
                  {currencyNames[currency]}
                </option>
              ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor={sourceAmount} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in source Currency</label>
              <input onChange={(e) => setSourceAmount(e.target.value)}
                type="number" id={sourceAmount} name={sourceAmount} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="amount" required />
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md" >Convert the Currency</button>
          </form>
        </section>
      </div>
      {!load ? <section className="lg:mx-72 text-2xl mt-5">
      {sourceAmount} {currencyNames[sourceCurreny]} is equls to {" "}
      <span className="text-green-500 font-bold">{" "}{targetAmount}</span>{" "} in {currencyNames[targetCurreny]}
      </section> : null}

    </div>

  )
}

export default Mainpage