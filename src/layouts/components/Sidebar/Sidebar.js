import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faBoxesStacked, faReceipt } from '@fortawesome/free-solid-svg-icons';

import Menu, { MenuItem } from './Menu';
import config from '../../../config';

const cx = classNames.bind(styles)

function Sidebar() {
    return (
        <aside className={cx('wrapper', 'col-lg-3')}>
            <Menu>
                <MenuItem title="Products" to={config.routes.admin} icon={<FontAwesomeIcon icon={faBox}/>} />
                <MenuItem title="Categories" to={config.routes.adminCategories} icon={<FontAwesomeIcon icon={faBoxesStacked}/>} />
                <MenuItem title="Orders" to={config.routes.adminOrders} icon={<FontAwesomeIcon icon={faReceipt}/>}/>
            </Menu>
        </aside>
    );
}

export default Sidebar;