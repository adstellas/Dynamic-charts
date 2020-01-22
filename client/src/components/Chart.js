import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

class Chart extends Component {
  static propTypes = {
    models: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  
  render() {
    const selectedModels = this.props.models.filter(model => model.selected);
    if (selectedModels.length) {
      const scatters = selectedModels.map((model, index) => {
        return <Scatter key={`chart-${index}`} name={model.name} data={[model.data]} fill={model.color} line/>
      });
      return (
        <ScatterChart width={800} height={400} margin={{top: 20, right: 5, bottom: 20, left: 5}}>
          <CartesianGrid/>
          <XAxis type="number" dataKey={'timestamp'} name='Timestamp'
                 domain={['dataMin - 100000', 'dataMax + 100000']}/>
          <YAxis type="number" dataKey={'value'} name='Value'/>
          <Tooltip cursor={{strokeDasharray: '3 3'}}/>
          {scatters}
        </ScatterChart>
      );
    } else {
      return (
        <div>Select models to see a chart</div>
      );
    }
  }
}

const mapStateToProps = state => {
  const { models } = state;
  return {
    models,
  }
};

export default connect(mapStateToProps)(Chart);
