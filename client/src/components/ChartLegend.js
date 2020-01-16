import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { toggleModel } from '../actions/actions';

class ChartLegend extends Component {
  static propTypes = {
    models: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  handleModelSelected(e, model) {
    this.props.dispatch(toggleModel(e.target.checked, model));
  }
  render() {
    return(
      <div className="App-chart-legend">
        {this.props.models.map((model, index) => (
          <div key={`item-${index}`}>
            <input type="checkbox"
                   checked={Boolean(model.selected)}
                   onChange={(e) => this.handleModelSelected(e, model)}/>
            <span style={{color: model.color}}>{model.name} [{model.valuesRange[0]}:{model.valuesRange[1]}]</span>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { models } = state;
  return {
    models,
  }
};

export default connect(mapStateToProps)(ChartLegend);
