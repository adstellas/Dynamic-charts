import React from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

class Legend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: props.models,
    };
  }
  handleModelSelected(e, model) {
   if(e.target.checked) {
    api.get(`/${encodeURI(model.name)}`).then(response => {
      this.props.onSelected({
        ...response.data,
        selected: true,
      });
    });
   } else {
     this.props.onSelected({
       ...model,
       selected: false,
      });
   }
  }
  render() {
    return (
    <div className="App-chart-legend">
      {this.state.models.map((model, index) => (
        <div key={`item-${index}`}>
          <input type="checkbox" value={Boolean(model.selected)} onChange={(e) => this.handleModelSelected(e, model)}/>
          <span style={{color: model.color}}>{model.name} [{model.values_range[0]}:{model.values_range[1]}]</span>
        </div>
      ))}
    </div>
    );
  }
}

export default Legend;