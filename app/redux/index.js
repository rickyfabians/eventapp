import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import TrackerRedux from './TrackerRedux'
import { composeWithDevTools } from 'redux-devtools-extension'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  tracker: TrackerRedux
})

const configureStore = (initialState = {}) => {
  const store = createStore(persistReducer({
    key: 'eventApp',
    storage: AsyncStorage,
    whitelist: ['tracker']
  }, reducers), initialState)
  const persister = persistStore(store, null)
  return { store, persister }
}

export default configureStore
