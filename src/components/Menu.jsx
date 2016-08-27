import React from 'react';
import Config from '../../config.json';
import styles from './styles/Menu.css';

const menuDefinition = Config.menu;

const Menu = React.createClass({
    getInitialState() {
        return {
            active: false
        }
    },

    /**
     * Handle click on right-upper 3 bar menu icon
     */
    handleBarClick() {
        this.setState({
            active: !this.state.active,
        });
    },

    /**
     * Handle click on main menu items
     */
    handleMenuClick(tag) {
        this.props.selectTag(tag);
        this.setState({
            active: false
        });
    },

    render() {
        const {isFetching, selectedTag, photos} = this.props;
        let active = this.state.active || isFetching;

        const menuItem = Object.keys(menuDefinition).map((name, idx) => {
            const tag = menuDefinition[name];
            const itemStyle = styles({
                fetching: selectedTag === tag && isFetching
            });

            return (
                <li className={itemStyle} onClick={this.handleMenuClick.bind(this, tag)} key={idx}>{name}</li>
            );
        });

        return (
            <section id='menu'>
                <div className={styles.bar_container} onClick={this.handleBarClick}>
                    <div className={styles({bar: true, active})}></div>
                </div>
                <div className={styles({menu: true, active})}>
                    <ul>
                        {menuItem}
                    </ul>
                </div>
            </section>
        );
    }
});

export default Menu;
