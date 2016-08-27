import { getPhotoUrl, getLinkUrl } from './common';

class Photos {
    constructor({config, client, oauth_token: token, user_nsid: user_id}) {
        this.config = config;
        this.client = client;
        //this.token = token;
        //this.user_id = user_id;
    }

    /**
     * Get information about a photo. The calling user must have permission to view the photo
     * @param {String} photo_id - The id of the photo to get information for
     */
    getInfo(photo_id) {
        return new Promise((resolve, reject) => {
            this.client.get('?method=flickr.photos.getInfo')
                .qs({api_key: this.config.key, photo_id})
                .request((error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        const {id, secret, server, farm, title, description} = body.photo;
                        const url = getPhotoUrl(body.photo, 'b');
                        const link = getLinkUrl(body.photo, this.config.owner_nsid);

                        resolve({
                            id,
                            url,
                            link,
                            title: title._content,
                            description: description._content
                        });
                    }
                });
        });
    }

    /**
     * Return a list of photos matching tags
     * @param {String} tags - A comma delimited list of tags
     */
    search(tags) {
        const promise = new Promise((resolve, reject) => {
            this.client.get('?method=flickr.photos.search')
                //.auth({token: this.token})
                .qs({api_key: this.config.key, user_id: this.config.owner_nsid, tags})
                .request((error, response, body) => {
                    if (error) {
                        reject(error);
                    } else {
                        const photoIds = body.photos.photo.map(photo => photo.id);

                        resolve(photoIds);
                    }
                });
        });

        return promise.then(data => {
            const getInfoPromises = data.map(photo_id => {
                return this.getInfo(photo_id);
            });

            return Promise.all(getInfoPromises);
        });
    }
}

export default Photos;
