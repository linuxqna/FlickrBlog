import React from 'react';
import styles from './styles/Content.css';

const Content = React.createClass({
    render() {
        const {photos, page, showContent: active, isFetching} = this.props;

        if (photos.length === 0) {
            return null;
        }

        const {link, description} = photos[page];
        const containerClass = styles({
            container: true,
            active
        });
        const linkClass = styles({
            link: true,
            active
        });

        return(
            <section id='content' className={containerClass}>
                <h2>{description}</h2>
                <a href={link} target='_blank'><img className={linkClass} src='https://s.yimg.com/pw/images/goodies/white-small-circle.png' width='25' height='25' /></a>
            </section>
        );
    }
});

export default Content;
