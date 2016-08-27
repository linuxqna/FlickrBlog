import React from 'react';
import { connect } from 'react-redux';
import { selectTag, setPage, fetchPhotosIfNotCached } from '../actions';
import Slides from '../components/Slides.jsx';
import Menu from '../components/Menu.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch, selectedTag} = this.props;

        dispatch(fetchPhotosIfNotCached(selectedTag));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTag !== this.props.selectedTag) {
            const {dispatch, selectedTag} = nextProps;

            dispatch(fetchPhotosIfNotCached(selectedTag));
        }
    }

    render() {
        return (
            <div id='app'>
                <Slides {...this.props} />
                <Menu {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {selectedTag, photosByTag} = state;
    const {isFetching, page, photos} = photosByTag[selectedTag] || {
            isFetching: false,
            page: 1,
            photos: []
    };

    return {
        selectedTag,
        isFetching,
        page,
        photos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        selectTag: (tag) => {
            dispatch(selectTag(tag));
        },
        setPage: (tag, page) => {
            dispatch(setPage(tag, page));
        },
        fetchPhotos: (tag) => {
            dispatch(fetchPhotosIfNotCached(tag));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
