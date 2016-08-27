import fetch from 'isomorphic-fetch';

export const SELECT_TAG = 'SELECT_TAG';
export const SET_PAGE = 'SET_PAGE';
export const REQUEST_PHOTOS = 'REQUEST_PHOTOS';
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';

export function selectTag(tag) {
    return {
        type: SELECT_TAG,
        tag
    };
}

export function setPage(tag, page) {
    return {
        type: SET_PAGE,
        tag,
        page
    };
}

function requestPhotos(tag) {
    return {
        type: REQUEST_PHOTOS,
        tag
    };
}

function receivePhotos(tag, photos) {
    return {
        type: RECEIVE_PHOTOS,
        tag,
        photos
    };
}

function fetchPhotos(tag) {
    return function (dispatch) {
        dispatch(requestPhotos(tag));

        return fetch(`api/photos.search/tag/${tag}`)
            .then(response => response.json())
            .then(json => {
                let photos = json.photos;

                if (photos.length > 5) {
                    photos = photos.slice(0, 5);
                }

                return dispatch(receivePhotos(tag, photos));
            });
    }
}

function shouldFetchPhotos(state, tag) {
    const photos = state.photosByTag[tag];

    if (!photos) {
        return true;
    } else if (photos.isFetching) {
        return false;
    }

    return false;
}

export function fetchPhotosIfNotCached(tag) {
    return (dispatch, getState) => {
        if (shouldFetchPhotos(getState(), tag)) {
            return dispatch(fetchPhotos(tag));
        }
    };
}
