import React from 'react';
import axios from 'axios';
import './App.css';
import ChartLegend from './ChartLegend'
import Chart from './Chart'

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleModelSelected = this.handleModelSelected.bind(this);
    this.state = {
      chartModels: null,
    };
  }
  componentDidMount() {
    api.get('/').then(
      response => this.setState({ chartModels: response.data })
    );
  }
  handleModelSelected(updatedModel) {
    this.setState(state => {
      const models = state.chartModels.map(model => model.name === updatedModel.name ? updatedModel : model);

      return {
        chartModels: models
      };
    });
  }
  render() {
    if (this.state.chartModels === null) {
      return(
        <div className="App">Loading...</div>
      );
    } else {
      return(
        <div className="App">
          <div className="App-title">Select model:</div>
          <ChartLegend models={this.state.chartModels} onSelected={this.handleModelSelected}/>
          <Chart models={this.state.chartModels}/>
        </div>
      );
    }
  }
}

export default App;
