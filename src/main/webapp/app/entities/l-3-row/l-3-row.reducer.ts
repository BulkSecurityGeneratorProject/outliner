import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IL3Row, defaultValue } from 'app/shared/model/l-3-row.model';

export const ACTION_TYPES = {
  SEARCH_L3ROWS: 'l3Row/SEARCH_L3ROWS',
  FETCH_L3ROW_LIST: 'l3Row/FETCH_L3ROW_LIST',
  FETCH_L3ROW: 'l3Row/FETCH_L3ROW',
  CREATE_L3ROW: 'l3Row/CREATE_L3ROW',
  UPDATE_L3ROW: 'l3Row/UPDATE_L3ROW',
  DELETE_L3ROW: 'l3Row/DELETE_L3ROW',
  RESET: 'l3Row/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IL3Row>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type L3RowState = Readonly<typeof initialState>;

// Reducer

export default (state: L3RowState = initialState, action): L3RowState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_L3ROWS):
    case REQUEST(ACTION_TYPES.FETCH_L3ROW_LIST):
    case REQUEST(ACTION_TYPES.FETCH_L3ROW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_L3ROW):
    case REQUEST(ACTION_TYPES.UPDATE_L3ROW):
    case REQUEST(ACTION_TYPES.DELETE_L3ROW):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_L3ROWS):
    case FAILURE(ACTION_TYPES.FETCH_L3ROW_LIST):
    case FAILURE(ACTION_TYPES.FETCH_L3ROW):
    case FAILURE(ACTION_TYPES.CREATE_L3ROW):
    case FAILURE(ACTION_TYPES.UPDATE_L3ROW):
    case FAILURE(ACTION_TYPES.DELETE_L3ROW):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_L3ROWS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_L3ROW_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_L3ROW):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_L3ROW):
    case SUCCESS(ACTION_TYPES.UPDATE_L3ROW):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_L3ROW):
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

const apiUrl = 'api/l-3-rows';
const apiSearchUrl = 'api/_search/l-3-rows';

// Actions

export const getSearchEntities: ICrudSearchAction<IL3Row> = query => ({
  type: ACTION_TYPES.SEARCH_L3ROWS,
  payload: axios.get<IL3Row>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IL3Row> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_L3ROW_LIST,
  payload: axios.get<IL3Row>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IL3Row> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_L3ROW,
    payload: axios.get<IL3Row>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IL3Row> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_L3ROW,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IL3Row> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_L3ROW,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IL3Row> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_L3ROW,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
