import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IL3Table, defaultValue } from 'app/shared/model/l-3-table.model';

export const ACTION_TYPES = {
  SEARCH_L3TABLES: 'l3Table/SEARCH_L3TABLES',
  FETCH_L3TABLE_LIST: 'l3Table/FETCH_L3TABLE_LIST',
  FETCH_L3TABLE: 'l3Table/FETCH_L3TABLE',
  CREATE_L3TABLE: 'l3Table/CREATE_L3TABLE',
  UPDATE_L3TABLE: 'l3Table/UPDATE_L3TABLE',
  DELETE_L3TABLE: 'l3Table/DELETE_L3TABLE',
  RESET: 'l3Table/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IL3Table>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type L3TableState = Readonly<typeof initialState>;

// Reducer

export default (state: L3TableState = initialState, action): L3TableState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_L3TABLES):
    case REQUEST(ACTION_TYPES.FETCH_L3TABLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_L3TABLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_L3TABLE):
    case REQUEST(ACTION_TYPES.UPDATE_L3TABLE):
    case REQUEST(ACTION_TYPES.DELETE_L3TABLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_L3TABLES):
    case FAILURE(ACTION_TYPES.FETCH_L3TABLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_L3TABLE):
    case FAILURE(ACTION_TYPES.CREATE_L3TABLE):
    case FAILURE(ACTION_TYPES.UPDATE_L3TABLE):
    case FAILURE(ACTION_TYPES.DELETE_L3TABLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_L3TABLES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_L3TABLE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_L3TABLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_L3TABLE):
    case SUCCESS(ACTION_TYPES.UPDATE_L3TABLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_L3TABLE):
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

const apiUrl = 'api/l-3-tables';
const apiSearchUrl = 'api/_search/l-3-tables';

// Actions

export const getSearchEntities: ICrudSearchAction<IL3Table> = query => ({
  type: ACTION_TYPES.SEARCH_L3TABLES,
  payload: axios.get<IL3Table>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IL3Table> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_L3TABLE_LIST,
  payload: axios.get<IL3Table>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IL3Table> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_L3TABLE,
    payload: axios.get<IL3Table>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IL3Table> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_L3TABLE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IL3Table> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_L3TABLE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IL3Table> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_L3TABLE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
