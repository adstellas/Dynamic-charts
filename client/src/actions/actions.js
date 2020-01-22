import { camelizeKeys } from 'humps'
import * as types from '../constants/ActionTypes';

export const receiveModels = models => ({ type: types.RECEIVE_MODELS, models });
export const requestModels = models => ({ type: types.REQUEST_MODELS, models });
export const updateModel = (isSelected, model) => ({ type: types.RECEIVE_MODEL, model, isSelected });
export const updateResponseError = error => ({ type: types.RESPONSE_ERROR, error });

export const getModels = () => (dispatch, getState, api) => {
  dispatch(requestModels());
  return new Promise((resolve, reject) => {
    api.get('/models')
      .then(response => response.data)
      .then(models => {
        const camelizedModels = camelizeKeys(models);
        dispatch(receiveModels(camelizedModels));
        resolve();
      })
      .catch(error => {
        dispatch(updateResponseError(error.message));
        reject();
      })
  }).catch(error => console.log(error)); // here logging could be done
};

export const toggleModel = (isSelected, model) => (dispatch, getState, api) => {
  if (isSelected) {
    return new Promise((resolve, reject) => {
      api.get(`/models/${encodeURIComponent(model.name)}`)
        .then(response => response.data)
        .then(model => {
          const camelizedModels = camelizeKeys(model);
          dispatch(updateModel(isSelected, camelizedModels));
          resolve();
        })
        .catch(error => {
          dispatch(updateResponseError(error.message));
          reject();
        })
    }).catch(error => console.log(error)); // here logging could be done
  } else {
    dispatch(updateModel(isSelected, model));
  }
};
