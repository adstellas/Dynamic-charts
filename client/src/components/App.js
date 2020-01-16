import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { getModels } from '../actions/actions';
import ChartLegend from './ChartLegend'
import Chart from './Chart'
import '../assets/App.css';

class App extends Component {
  static propTypes = {
    error: PropTypes.string.isRequired,
    models: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.dispatch(getModels());
  }
  render() {
    const { error, isFetching } = this.props;
    return(
      <div className="App">{
        error
          ? <p className="App-error">{error}</p>
          : isFetching
            ? <p>Loading...</p>
            : <div>
                <div className="App-title">Select model:</div>
                <ChartLegend/>
                <Chart/>
              </div>
      }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { error, models, isFetching } = state;
  return {
    error,
    models,
    isFetching,
  }
};

export default connect(mapStateToProps)(App);