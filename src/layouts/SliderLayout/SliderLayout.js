import classNames from 'classnames/bind';
import styles from './SliderLayout.module.scss';

import Header from '../components/Header'
import Slider from '../components/Slider'
import Footer from '../components/Footer'

const cx = classNames.bind(styles)

function SliderLayout({ children }) {
    return (
            <div className={cx('wrapper')}>
                <Header />
                <Slider />
                <div className={cx('container')}>
                    {children}
                </div>
                <Footer />
            </div>
    );
}

export default SliderLayout;