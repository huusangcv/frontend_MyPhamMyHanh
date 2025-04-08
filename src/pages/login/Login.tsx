import classNames from 'classnames/bind';
import styles from './Login.module.scss';
const cx = classNames.bind(styles);
const Login = () => {
  return (
    <>
      <div className={cx('content')}>
        <form action="" autoComplete="off">
          <div className={cx('content__inner')}>
            <div className={cx('wapper__group')}>
              <div className={cx('labelGroup')}>
                <label className={cx('label')}>Tên đăng nhập</label>
              </div>
              <div className={cx('inputWrap')}>
                <input name="username" placeholder="Email" maxLength={50} spellCheck="false" />
              </div>
            </div>
            <div className={cx('wapper__group')}>
              <div className={cx('labelGroup')}>
                <label className={cx('label')}>Mật khẩu</label>
              </div>
              <div className={cx('inputWrap')}>
                <input type="password" name="password" maxLength={50} spellCheck="false" />
              </div>
            </div>
            <button type="submit" disabled={false} className={'button-submit'}>
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
      <p className={cx('registerOrLogin')}>
        Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
      </p>

      <a className={cx('forgotPassword')} href="/forgot-password">
        Quên mật khẩu?
      </a>

      <p className={cx('wapper__footer')}>
        Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý với{' '}
        <a href="https://myphammyhanh.regis.id.vn/terms" target="_blank">
          điều khoản sử dụng
        </a>{' '}
        của chúng tôi.
      </p>
    </>
  );
};

export default Login;
