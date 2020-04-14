import React, {useState, useEffect} from "react"
import style from "./CountryPicker.module.css"
import {FormControl, NativeSelect} from '@material-ui/core'
import { fetchCountries } from '../../Api'

const CountryPicker = ({handleOnChange}) => {

    const [fetchedCountries, setfetchedCountries] = useState([]);

    useEffect(() => {

        const getCountries = async () => setfetchedCountries(await fetchCountries());
        getCountries();

    }, [setfetchedCountries]);

    return (
        <div className = {style.container}>
            <FormControl className = {style.formControl}>
                <NativeSelect onChange = {(e) => handleOnChange(e.target.value)}>
                    <option value="">Global</option>
                    { fetchedCountries.map((countryName, id) => <option key = {id} value={countryName}>{countryName}</option>) }
                </NativeSelect>
            </FormControl>
        </div>
    )
}

export default CountryPicker;