import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IL3Cell, defaultValue } from 'app/shared/model/l-3-cell.model';

export const ACTION_TYPES = {
  SEARCH_L3CELLS: 'l3Cell/SEARCH_L3CELLS',
  FETCH_L3CELL_LIST: 'l3Cell/FETCH_L3CELL_LIST',
  FETCH_L3CELL: 'l3Cell/FETCH_L3CELL',
  CREATE_L3CELL: 'l3Cell/CREATE_L3CELL',
  UPDATE_L3CELL: 'l3Cell/UPDATE_L3CELL',
  DELETE_L3CELL: 'l3Cell/DELETE_L3CELL',
  RESET: 'l3Cell/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IL3Cell>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type L3CellState = Readonly<typeof initialState>;

// Reducer

export default (state: L3CellState = initialState, action): L3CellState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_L3CELLS):
    case REQUEST(ACTION_TYPES.FETCH_L3CELL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_L3CELL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_L3CELL):
    case REQUEST(ACTION_TYPES.UPDATE_L3CELL):
    case REQUEST(ACTION_TYPES.DELETE_L3CELL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_L3CELLS):
    case FAILURE(ACTION_TYPES.FETCH_L3CELL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_L3CELL):
    case FAILURE(ACTION_TYPES.CREATE_L3CELL):
    case FAILURE(ACTION_TYPES.UPDATE_L3CELL):
    case FAILURE(ACTION_TYPES.DELETE_L3CELL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_L3CELLS):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_L3CELL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_L3CELL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_L3CELL):
    case SUCCESS(ACTION_TYPES.UPDATE_L3CELL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_L3CELL):
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

const apiUrl = 'api/l-3-cells';
const apiSearchUrl = 'api/_search/l-3-cells';

// Actions

export const getSearchEntities: ICrudSearchAction<IL3Cell> = query => ({
  type: ACTION_TYPES.SEARCH_L3CELLS,
  payload: axios.get<IL3Cell>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IL3Cell> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_L3CELL_LIST,
  payload: axios.get<IL3Cell>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IL3Cell> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_L3CELL,
    payload: axios.get<IL3Cell>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IL3Cell> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_L3CELL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IL3Cell> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_L3CELL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IL3Cell> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_L3CELL,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
