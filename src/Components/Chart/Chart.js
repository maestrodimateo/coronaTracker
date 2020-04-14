import React, {useState, useEffect} from "react";
import {fetchDailyData} from '../../Api';
import {Line, Bar} from 'react-chartjs-2';
import style from './Chart.module.css'

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {
    
    const [dailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        const getDailyData = async () => {
            const data = await fetchDailyData();
            setDailyData(data)
        }
        getDailyData();
    }, []);

    // graphe pour les données globales
    const LineChart = dailyData.length ? (
        <Line 
            data = {{
                labels: dailyData.map(({reportDate}) => reportDate),
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infectés',
                    borderColor: "#3333ff",
                    fill:true
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Morts',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill:true
                }]
            }}
        />
    ): null;

    // graphe pour les données par pays
    const BarChart = confirmed ?
    (
        <Bar 
            data = {{
                labels: ['Infectés', 'Morts', 'Guerris'],
                datasets: [
                    {data: [confirmed.value, deaths.value, recovered.value]},
                    {backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)']},
                    {label: 'Personnes'}
                ],
            }}
            legend = {{ title: {display: true, text: `Données du ${country}`}, display: false }}
        />
    ) : null;

    return (

        <div className = {style.container}>
        { country ? BarChart : LineChart}
        </div>
    )
}

export default Chart;