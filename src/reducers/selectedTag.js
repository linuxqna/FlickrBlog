import { SELECT_TAG } from '../actions';

const initSelectedTag = 'scenery';

const selectedTag = (state = initSelectedTag, action) => {
    switch (action.type) {
        case SELECT_TAG:
            return action.tag;

        default:
            return state;
    }
};

export default selectedTag;
