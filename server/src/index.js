const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());

//all currency names
app.get("/getAllCurrencies", async (req, res) => {
    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=api_id";
    try {
        const nameResponce = await axios.get(nameURL);
        const nameData = nameResponce.data;

        return res.json(nameData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to fetch currency names" });
    }
});

//get the target amount
app.get("/convert", async (req, res) => {
    const { date, sourceCurreny, targetCurreny, sourceAmount} = req.query;
    
    try{
        const dataURL = "https://openexchangerates.org/api/historical/${date}.json?app_id=api_id";

        const dataResponse = await axios.get(dataURL);
        const rates = dataResponse.data.rates;

        //rates
        const sourceRate = rates[sourceCurreny];
        const targetRate = rates[targetCurreny];

        //target value
        const targetValue = (targetRate / sourceRate) * sourceAmount;
        return res.json(targetValue.toFixed(2));

    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Failed curreny convert and date" });
    }
});

//listen to port
app.listen(5000, () => {
    console.log("SERVER STARTED");
});
