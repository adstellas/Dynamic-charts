import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  error: '',
  models: [],
};
const chartModels = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_MODELS:
      return {
        ...state,
        isFetching: true,
      };
    case ActionTypes.RECEIVE_MODELS:
      return {
        ...state,
        isFetching: false,
        models: action.models,
        error: '',
      };
    case ActionTypes.RECEIVE_MODEL:
      return {
        ...state,
        isFetching: false,
        error: '',
        models: state.models.map(model =>
          (model.name === action.model.name)
            ? {...action.model, selected: action.isSelected}
            : model
        ),
      };
    case ActionTypes.RESPONSE_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default chartModels;
