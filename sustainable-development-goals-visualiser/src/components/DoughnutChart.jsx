import React from "react";
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = props => {
    const { countryData } = props;
    // TODO: maybe move this somewhere nicer
    const labels = ['Less than $1.75', 'More than $1.75']

    const data = {
        labels: labels,
        datasets: [{
            data: countryData,
            backgroundColor: ['cyan', 'lightgrey']
        }]
    };

    return <Doughnut data={data} />
}

export default DoughnutChart;