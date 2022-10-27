import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom'
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

function MenuItem({ title, to, icon}) {
    return (
        <NavLink end className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}


export default MenuItem;