import React from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

function Chart(props) {
  const selectedModels = props.models.filter(model => model.selected);
  if (selectedModels.length) {
    const scatters = selectedModels.map((model, index) => {
      return <Scatter key={`chart-${index}`} name={model.name} data={[model.data]} fill={model.color} line/>
    });
    return(
      <ScatterChart width={800} height={400} margin={{top: 20, right: 5, bottom: 20, left: 5}}>
        <CartesianGrid />
        <XAxis type="number" dataKey={'timestamp'} name='Timestamp'
          domain={['dataMin - 100000', 'dataMax + 100000']}/>
        <YAxis type="number" dataKey={'value'} name='Value'/>
        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
        {scatters}
      </ScatterChart>
    );
  } else {
     return (
        <div></div>
      );
  }
};

export default Chart;