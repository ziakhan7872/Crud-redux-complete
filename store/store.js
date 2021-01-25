import {createStore, combineReducers} from 'redux';
import studentsReducer from './reducers/studentsReducer';

const rootReducer = combineReducers({
  students: studentsReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
