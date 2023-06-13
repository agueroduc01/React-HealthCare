import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  // regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp, processLogout } from '../../../store/actions';
import { handleLogoutApi } from '../../../services/userService';
import { withRouter } from 'react-router';

class HomeHeader extends Component {
  // dang bi bug chuyen huong tu trang login sang home chua update component login/register
  changeLanguage = (language) => {
    // fire redux event : actions
    this.props.changeLanguageAppRedux(language);
  };
  handleLogOut = () => {
    this.props.processLogout();
    handleLogoutApi(this.props.userInfo.accessToken);
  };

  goToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  goToAboutPage = () => {
    if (this.props.history) {
      this.props.history.push(`/about`);
    }
  };

  goToBlogPage = () => {
    if (this.props.history) {
      this.props.history.push(`/blog`);
    }
  };

  goToContactPage = () => {
    if (this.props.history) {
      this.props.history.push(`/contact`);
    }
  };

  goToDoctorsPage = () => {
    if (this.props.history) {
      this.props.history.push(`/doctors`);
    }
  };

  render() {
    let { language, isLoggedIn, userInfo } = this.props;
    let accessToken = userInfo?.accessToken;
    return (
      <>
        {/* <!-- Back to top button --> */}
        <div className="back-to-top"></div>
        <header>
          <div className="topbar">
            <div className="container">
              <div className="row">
                <div className="col-sm-8 text-sm">
                  <div className="site-info">
                    <p onClick={this.goToHome}>
                      <span className="text-primary">
                        <FontAwesomeIcon icon={solid('phone')} />
                      </span>{' '}
                      +00 123 4455 6666
                    </p>
                    <span className="divider">|</span>
                    <p onClick={this.goToHome}>
                      <span className="text-primary">
                        <FontAwesomeIcon icon={solid('envelope')} />
                      </span>{' '}
                      agueroduc01@gmail.com
                    </p>
                  </div>
                </div>
                <div className="col-sm-4 text-right text-sm right-content">
                  <div className="languages">
                    <div
                      className={
                        language === LANGUAGES.VI
                          ? 'language-vi active'
                          : 'language-vi'
                      }
                    >
                      <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                        VN
                      </span>
                    </div>
                    <div
                      className={
                        language === LANGUAGES.EN
                          ? 'language-en active'
                          : 'language-en'
                      }
                    >
                      <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                        EN
                      </span>
                    </div>
                  </div>
                  <div className="social-mini-button">
                    <p>
                      <span>
                        <FontAwesomeIcon icon={brands('facebook-f')} />
                      </span>
                    </p>
                    <p>
                      <span>
                        <FontAwesomeIcon icon={brands('twitter')} />
                      </span>
                    </p>
                    <p>
                      <span>
                        <FontAwesomeIcon icon={brands('dribbble')} />
                      </span>
                    </p>
                    <p>
                      <span>
                        <FontAwesomeIcon icon={brands('instagram')} />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
            <div className="container">
              <p className="navbar-brand" onClick={this.goToHome}>
                <span className="text-primary">One</span>-Health
              </p>

              <form action="">
                <div className="input-group input-navbar">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="icon-addon1">
                      <span className="">
                        <FontAwesomeIcon icon={solid('magnifying-glass')} />
                      </span>
                    </span>
                  </div>
                  <FormattedMessage id="home-header.search">
                    {(placeholder) => (
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placeholder}
                        aria-label="Username"
                        aria-describedby="icon-addon1"
                      />
                    )}
                  </FormattedMessage>
                </div>
              </form>

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupport"
                aria-controls="navbarSupport"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupport">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <p className="nav-link" onClick={this.goToHome}>
                      <FormattedMessage id="home-header.home" />
                    </p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link" onClick={this.goToAboutPage}>
                      <FormattedMessage id="home-header.about-us" />
                    </p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link" onClick={this.goToDoctorsPage}>
                      <FormattedMessage id="home-header.doctors" />
                    </p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link" onClick={this.goToBlogPage}>
                      <FormattedMessage id="home-header.news" />
                    </p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link" onClick={this.goToContactPage}>
                      <FormattedMessage id="home-header.contact" />
                    </p>
                  </li>
                  {/* Chua bat truong hop cookie het han se update lai component login/register */}
                  {accessToken && isLoggedIn ? (
                    <li className="nav-item">
                      <span>Avatar</span>{' '}
                      <span>
                        {language === LANGUAGES.EN
                          ? userInfo && userInfo.firstName
                            ? userInfo.firstName
                            : ''
                          : userInfo && userInfo.lastName
                          ? userInfo.lastName
                          : ''}{' '}
                        !
                      </span>
                      <div
                        className="btn btn-logout"
                        onClick={() => this.handleLogOut()}
                        title="Log out"
                      >
                        <i className="fas fa-sign-out-alt"></i>
                      </div>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <p
                        className="btn btn-primary ml-lg-3"
                        onClick={this.goToHome}
                      >
                        <span>
                          <FormattedMessage id="home-header.login-register" />
                        </span>
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
