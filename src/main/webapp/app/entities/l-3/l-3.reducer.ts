import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IL3, defaultValue } from 'app/shared/model/l-3.model';

export const ACTION_TYPES = {
  SEARCH_L3S: 'l3/SEARCH_L3S',
  FETCH_L3_LIST: 'l3/FETCH_L3_LIST',
  FETCH_L3: 'l3/FETCH_L3',
  CREATE_L3: 'l3/CREATE_L3',
  UPDATE_L3: 'l3/UPDATE_L3',
  DELETE_L3: 'l3/DELETE_L3',
  SET_BLOB: 'l3/SET_BLOB',
  RESET: 'l3/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IL3>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type L3State = Readonly<typeof initialState>;

// Reducer

export default (state: L3State = initialState, action): L3State => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_L3S):
    case REQUEST(ACTION_TYPES.FETCH_L3_LIST):
    case REQUEST(ACTION_TYPES.FETCH_L3):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_L3):
    case REQUEST(ACTION_TYPES.UPDATE_L3):
    case REQUEST(ACTION_TYPES.DELETE_L3):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_L3S):
    case FAILURE(ACTION_TYPES.FETCH_L3_LIST):
    case FAILURE(ACTION_TYPES.FETCH_L3):
    case FAILURE(ACTION_TYPES.CREATE_L3):
    case FAILURE(ACTION_TYPES.UPDATE_L3):
    case FAILURE(ACTION_TYPES.DELETE_L3):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_L3S):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_L3_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_L3):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_L3):
    case SUCCESS(ACTION_TYPES.UPDATE_L3):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_L3):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/l-3-s';
const apiSearchUrl = 'api/_search/l-3-s';

// Actions

export const getSearchEntities: ICrudSearchAction<IL3> = query => ({
  type: ACTION_TYPES.SEARCH_L3S,
  payload: axios.get<IL3>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IL3> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_L3_LIST,
  payload: axios.get<IL3>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IL3> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_L3,
    payload: axios.get<IL3>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IL3> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_L3,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IL3> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_L3,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IL3> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_L3,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
