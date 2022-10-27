import classNames from "classnames/bind";
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('page-footer', 'text-center', 'font-small', 'mt-4', 'fadeIn')}>
            {/*Copyright*/}
            <div className="footer-copyright py-3">
                <span style={{ color: 'white' }}>©Copyright:</span>
                <a style={{ color: '#8B0000', marginLeft: '4px' }} href='https://mdbootstrap.com/education/bootstrap/' target="_blank" rel="noreferrer">
                    MDBootstrap.com
                </a>
            </div>
            {/*/.Copyright*/}
        </footer >
    );
}

export default Footer;