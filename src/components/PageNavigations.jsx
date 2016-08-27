import React from 'react';
import styles from './styles/PageNavigations.css';

const PageNavigations = React.createClass({
    handleVerticalClick(idx) {
        this.props.setPage(this.props.selectedTag, idx);
    },

    handleHorizontalClick(status) {
        if (this.props.showContent !== status) {
            this.props.toggleContent();
        }
    },

    render() {
        const {photos, page, showContent} = this.props;
        const verticalNavs = photos.map((photo, idx) => {
            return (
                <li className={styles({selected: idx === page})} key={idx} onClick={this.handleVerticalClick.bind(this, idx)}></li>
            )
        });

        return(
            <div id='navigations'>
                <nav className={styles.vertical}>
                    <div className={styles.navs}>
                        <ul>
                            {verticalNavs}
                        </ul>
                    </div>
                </nav>
                <nav className={styles.horizontal}>
                    <div className={styles.navs}>
                        <ul>
                            <li className={styles({selected: !showContent})} onClick={this.handleHorizontalClick.bind(this, false)}></li>
                            <li className={styles({selected: showContent})} onClick={this.handleHorizontalClick.bind(this, true)}></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
});

export default PageNavigations;
