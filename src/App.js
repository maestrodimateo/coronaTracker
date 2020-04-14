import React, { Component } from "react";
import { Chart, Cards, CountryPicker } from "./Components";
import styles from "./App.module.css";
import { fetchData } from "./Api";
import corona from "./img/covid.png"

class App extends Component {

    state = {
        data: {},
        country: ''
    }

    async componentDidMount() {

        const result = await fetchData();
        this.setState({data : result})
    }

    handleOnChange = async (country) => {

        const response = await fetchData(country)
        this.setState({country: country, data: response})
    }

    render () {

        const {data, country} = this.state;
        return (
            <div className = {styles.container}>
                <img className = {styles.image} src= { corona } alt="covid-19"/>
                <Cards data = {data} />
                <CountryPicker handleOnChange = {this.handleOnChange} />
                <Chart country = {country} data = {data}/>
            </div>
        )
    }
}

export default App;