import { combineReducers } from 'redux';
import selectedTag from './selectedTag';
import photosByTag from './photosByTag';

const rootReducer = combineReducers({
    selectedTag,
    photosByTag
});

export default rootReducer;
