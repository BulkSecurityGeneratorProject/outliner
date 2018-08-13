import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IL2, defaultValue } from 'app/shared/model/l-2.model';

export const ACTION_TYPES = {
  SEARCH_L2S: 'l2/SEARCH_L2S',
  FETCH_L2_LIST: 'l2/FETCH_L2_LIST',
  FETCH_L2: 'l2/FETCH_L2',
  CREATE_L2: 'l2/CREATE_L2',
  UPDATE_L2: 'l2/UPDATE_L2',
  DELETE_L2: 'l2/DELETE_L2',
  SET_BLOB: 'l2/SET_BLOB',
  RESET: 'l2/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IL2>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type L2State = Readonly<typeof initialState>;

// Reducer

export default (state: L2State = initialState, action): L2State => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_L2S):
    case REQUEST(ACTION_TYPES.FETCH_L2_LIST):
    case REQUEST(ACTION_TYPES.FETCH_L2):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_L2):
    case REQUEST(ACTION_TYPES.UPDATE_L2):
    case REQUEST(ACTION_TYPES.DELETE_L2):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_L2S):
    case FAILURE(ACTION_TYPES.FETCH_L2_LIST):
    case FAILURE(ACTION_TYPES.FETCH_L2):
    case FAILURE(ACTION_TYPES.CREATE_L2):
    case FAILURE(ACTION_TYPES.UPDATE_L2):
    case FAILURE(ACTION_TYPES.DELETE_L2):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_L2S):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_L2_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_L2):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_L2):
    case SUCCESS(ACTION_TYPES.UPDATE_L2):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_L2):
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

const apiUrl = 'api/l-2-s';
const apiSearchUrl = 'api/_search/l-2-s';

// Actions

export const getSearchEntities: ICrudSearchAction<IL2> = query => ({
  type: ACTION_TYPES.SEARCH_L2S,
  payload: axios.get<IL2>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IL2> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_L2_LIST,
  payload: axios.get<IL2>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IL2> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_L2,
    payload: axios.get<IL2>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IL2> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_L2,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IL2> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_L2,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IL2> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_L2,
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
