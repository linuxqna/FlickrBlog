import Config from '../../config.json';

const tag = Config.menu.Home;

/**
 * Render Iniitial page
 */
export default function (req, res) {
    req.flickr.photos.search(tag).then(photos => {
        if (photos.length > 5) {
            photos = photos.slice(0, 5);
        }

        // TODO:
        const preloadedState = {
            "selectedTag": tag,
            "photosByTag": Object.assign({}, {
                [tag]: {
                    isFetching: false,
                    page: 0,
                    photos
                }
            })
        };

        // Send the rendered page back to the client
        res.send(renderFullPage(preloadedState));
    });
}

/**
 * Construct Initial page html
 */
function renderFullPage(preloadedState) {
    return `
        <!DOCTYPE HTML>
        <html>
            <head>
                <title>Junwon's Flickr Blog App</title>
            </head>
            <body style='overflow: hidden'>
                <div id="root"></div>
                <script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
                </script>
                <script src="/static/bundle.js"></script>
            </body>
        </html>
    `;
}
