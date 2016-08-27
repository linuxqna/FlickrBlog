/**
 * Construct the Photo URL
 * @param {Object} photoObj - photo Object
 * @param {String} size - [mstzb]
 */
export function getPhotoUrl(photoObj, size) {
    const {farm, server, id, title, secret} = photoObj;

    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
}

export function getLinkUrl(photoObj, user_id) {
    const {id: photo_id} = photoObj;

    return `https://www.flickr.com/photos/${user_id}/${photo_id}`;
}
