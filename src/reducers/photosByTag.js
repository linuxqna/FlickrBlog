import { REQUEST_PHOTOS, RECEIVE_PHOTOS, SET_PAGE } from '../actions';

const initPhotosState = {
    isFetching: false,
    page: 0,
    photos: []
};

const photos = (state = initPhotosState, action) => {
    switch (action.type) {
        case SET_PAGE:
            return Object.assign({}, state, {
                page: action.page
            });

        case REQUEST_PHOTOS:
            return Object.assign({}, state, {
                isFetching: true
            });

        case RECEIVE_PHOTOS:
            return Object.assign({}, state, {
                isFetching: false,
                page: 0,
                photos: action.photos
            });

        default:
            return state;
    }
};

const photosByTag = (state = {}, action) => {
    switch (action.type) {
        case SET_PAGE:
        case REQUEST_PHOTOS:
        case RECEIVE_PHOTOS:
            return Object.assign({}, state, {
                [action.tag]: photos(state[action.tag], action)
            });

        default:
            return state;
    }
}

export default photosByTag;
