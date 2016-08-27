import React from 'react';
import Menu from './Menu.jsx';
import PageNavigations from './PageNavigations.jsx';
import Content from './Content.jsx';
import styles from './styles/Slides.css';

const Slides = React.createClass({
    /**
     * Init showContent
     * This is the right content pane visible status
     */
    getInitialState() {
        return {
            showContent: false
        }
    },

    /**
     * Init mouse wheel event related variables
     */
    componentWillMount() {
        this._delta = 0;
        this._debounceTimer = 0;
        this._touches = {
            "touchstart": {"x":-1, "y":-1},
            "touchmove" : {"x":-1, "y":-1},
            "touchend"  : false,
            "direction" : "undetermined"
        }
    },

    /**
     * Get Slides Component a focus to handle keydown event
     */
    componentDidMount() {
        this._container.focus();
    },

    /**
     * Get Slides Component a focus to handle keydown event
     */
    componentDidUpdate() {
        this._container.focus();
    },

    /**
     * Handle Click on Title container
     * Result in toggling Content component
     */
    handleToggleContent() {
        this.setState({
            showContent: !this.state.showContent
        });
    },

    /**
     * Handle Keydown event
     *  - ArrowUP: previous slide
     *  - ArrowDown: next slide
     *  - ArrowLeft: show content
     *  - ArrowRight: hide content
     */
    handleKeyDown(e) {
        e.preventDefault();

        switch (e.key) {
            case 'Escape':
                // TODO: show menu
                break;

            case 'ArrowUp':
                this.setSlide(this.props.page - 1, false);
                break;

            case 'ArrowDown':
                this.setSlide(this.props.page + 1, false);
                break;

            case 'ArrowLeft':
                if (!this.state.showContent) {
                    return;
                }
                this.handleToggleContent();
                break;

            case 'ArrowRight':
                if (this.state.showContent) {
                    return;
                }
                this.handleToggleContent();
                break;
        }
    },

    /**
     * Handle onWheel event
     *  - scroll down: next slide
     *  - scroll up: previous slide
     */
    handleOnWheel(e) {
        if (e.deltaY > 0) {
            this._delta++;

            if (this._delta > 30) {
                this.setSlide(this.props.page + 1);
            }
        } else {
            this._delta--;

            if (Math.abs(this._delta) > 30) {
                this.setSlide(this.props.page - 1);
            }
        }
    },

    handleTouch(e) {
        e.preventDefault();

        const type = e.type;
        const touch = e.touches[0];

        switch (type) {
            case 'touchstart':
            case 'touchmove':
                this._touches[type].x = touch.pageX;
                this._touches[type].y = touch.pageY;
                break;

            case 'touchend':
                if (this._touches.touchstart.x > -1 && this._touches.touchmove.x > -1) {
                    let deltaX = this._touches.touchstart.x - this._touches.touchmove.x;

                    if (Math.abs(deltaX) > 300) {
                        // swipe left and content is hide
                        if (deltaX > 0 && !this.state.showContent) {
                            this.handleToggleContent();
                        // swipe right and content is shown
                        } else if (deltaX < 0 && this.state.showContent) {
                            this.handleToggleContent();
                        }
                    }
                }

                if (this._touches.touchstart.y > -1 && this._touches.touchmove.y > -1) {
                    let deltaY = this._touches.touchstart.y - this._touches.touchmove.y;

                    if (Math.abs(deltaY) > 300) {
                        // swipe down
                        if (deltaY > 0) {
                            this.setSlide(this.props.page + 1);
                        // swipe up
                        } else {
                            this.setSlide(this.props.page - 1);
                        }
                    }
                }
                break;
        }
    },

    /**
     * Show slide by given idx
     * @param {Number} idx - Slide index number to show
     * @param {Boolean} debounce - Turn on/ff debouncing changePage function for 1.5sec
     */
     setSlide(idx, debounce = true) {
        if (idx < 0 || idx >= this.props.photos.length) {
            return;
        }

        if (debounce) {
            this._delta = 0;

            if (this._debounceTimer) {
                return;
            }

            this._debounceTimer = setTimeout(() => {
                this._debounceTimer = null;
            }, 1000);
        }

        this.props.setPage(this.props.selectedTag, idx);
    },

    render() {
        const {photos, page} = this.props;
        const slideSections = photos.map((photo, idx) => {
            const slideStyle = {
                backgroundImage: 'url(' + photo.url + ')',
                zIndex: 100 - idx
            };
            const slideClass = styles({
                slide: true,
                active: idx >= page
            });
            const titleClass = styles({
                titleContainer: true,
                active: idx === page,
                showContent: this.state.showContent
            });

            return (
                <section className={slideClass} style={slideStyle} key={photo.id}>
                    <div className={titleClass} onClick={this.handleToggleContent}>
                        <h1 className={styles.title}>{photo.title}</h1>
                    </div>
                </section>
            );
        });

        return (
            <div
                className={styles.main}
                ref={(c) => this._container = c}
                onWheel={this.handleOnWheel}
                onKeyDown={this.handleKeyDown}
                onTouchStart={this.handleTouch}
                onTouchMove={this.handleTouch}
                onTouchEnd={this.handleTouch}
                tabIndex='1'>
                    {slideSections}
                    <Content {...this.props} showContent={this.state.showContent} />
                    <PageNavigations {...this.props} showContent={this.state.showContent} toggleContent={this.handleToggleContent}/>
            </div>
        );
    }
});

export default Slides;
