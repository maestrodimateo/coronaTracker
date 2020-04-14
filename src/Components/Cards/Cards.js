import React from "react";
import './Cards';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames'
import style from './Cards.module.css'

const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate} }) => {

    const confirmed_number = confirmed ? confirmed.value : 0;
    const deaths_number    = deaths ? deaths.value : 0;
    const recovered_number = recovered ? recovered.value : 0;

    const options = {

        year:   "numeric",
        month:  "numeric",
        day:    "numeric",
        hour:   "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false
    };

    const formated_date = lastUpdate ?
    new Intl.DateTimeFormat('fr-FR', options).format(new Date(lastUpdate)) : 'loading...';

    return (
        <div>
            <Grid container spacing = {3} justify = "center">
                <Grid item component = {Card} xs = {12} md = {3} className = {cx(style.card, style.infected)}>
                    <CardContent>
                        <Typography color = "textSecondary" gutterBottom>Infectés</Typography>
                        <Typography variant = "h5">
                            <CountUp start = {0} end = {confirmed_number} separator = ',' duration = {2.5} />
                        </Typography>
                        <Typography color = "textSecondary" >{formated_date}</Typography>
                        <Typography variant = "body2">Nombres actif de cas du COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component = {Card} xs = {12} md = {3} className = {cx(style.card, style.recovered)}>
                    <CardContent>
                        <Typography color = "textSecondary" gutterBottom>Guerris</Typography>
                        <Typography variant = "h5">
                            <CountUp start = {0} end = {recovered_number} separator = ',' duration = {2.5} />
                        </Typography>
                        <Typography color = "textSecondary" >{formated_date}</Typography>
                        <Typography variant = "body2">Nombres de cas guerris du COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component = {Card} xs = {12} md = {3} className = {cx(style.card, style.deaths)}>
                    <CardContent>
                        <Typography color = "textSecondary" gutterBottom>Morts</Typography>
                        <Typography variant = "h5">
                            <CountUp start = {0} end = {deaths_number} separator = ',' duration = {2.5} />
                        </Typography>
                        <Typography color = "textSecondary" >{formated_date}</Typography>
                        <Typography variant = "body2">Nombres de cas morts du COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}

export default Cards;