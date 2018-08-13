import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IL1, defaultValue } from 'app/shared/model/l-1.model';

export const ACTION_TYPES = {
  SEARCH_L1S: 'l1/SEARCH_L1S',
  FETCH_L1_LIST: 'l1/FETCH_L1_LIST',
  FETCH_L1: 'l1/FETCH_L1',
  CREATE_L1: 'l1/CREATE_L1',
  UPDATE_L1: 'l1/UPDATE_L1',
  DELETE_L1: 'l1/DELETE_L1',
  RESET: 'l1/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IL1>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type L1State = Readonly<typeof initialState>;

// Reducer

export default (state: L1State = initialState, action): L1State => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_L1S):
    case REQUEST(ACTION_TYPES.FETCH_L1_LIST):
    case REQUEST(ACTION_TYPES.FETCH_L1):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_L1):
    case REQUEST(ACTION_TYPES.UPDATE_L1):
    case REQUEST(ACTION_TYPES.DELETE_L1):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_L1S):
    case FAILURE(ACTION_TYPES.FETCH_L1_LIST):
    case FAILURE(ACTION_TYPES.FETCH_L1):
    case FAILURE(ACTION_TYPES.CREATE_L1):
    case FAILURE(ACTION_TYPES.UPDATE_L1):
    case FAILURE(ACTION_TYPES.DELETE_L1):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_L1S):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_L1_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_L1):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_L1):
    case SUCCESS(ACTION_TYPES.UPDATE_L1):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_L1):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/l-1-s';
const apiSearchUrl = 'api/_search/l-1-s';

// Actions

export const getSearchEntities: ICrudSearchAction<IL1> = query => ({
  type: ACTION_TYPES.SEARCH_L1S,
  payload: axios.get<IL1>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IL1> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_L1_LIST,
  payload: axios.get<IL1>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IL1> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_L1,
    payload: axios.get<IL1>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IL1> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_L1,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IL1> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_L1,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IL1> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_L1,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
