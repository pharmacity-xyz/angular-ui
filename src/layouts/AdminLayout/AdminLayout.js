import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'

const cx = classNames.bind(styles)
function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <Sidebar />
                    <div className={cx('content', 'col-lg-9')}>
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminLayout;