import axios from "axios";

// Url de l'api
const url = "https://covid19.mathdro.id/api";

// Récupération des données
export const fetchData = async (country) => {

    let changeableUrl = url;

    if (country) changeableUrl = `${url}/countries/${country}`

    try {

        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);
        return { confirmed, recovered, deaths, lastUpdate};

    } catch (error) {

        console.log(error);
    }
}

// Récupération des données journalière
export const fetchDailyData = async () => {

    try {

        const {data} = await axios.get(`${url}/daily`);
        const modifiedData = data.map((value) => {

            return {
                confirmed: value.totalConfirmed,
                deaths: value.deaths.total,
                reportDate: value.reportDate
            }
        });

        return modifiedData;

    } catch (error) {
        console.log(error)
    }
}

export const fetchCountries = async () => {

    try {
        const {data: {countries}} = await axios.get(`${url}/countries`)
        
        return countries.map((country) => country.name);

    } catch (error) {
        
        console.log(error)
    }
}