import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  // regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp, processLogout } from "../../store/actions";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    // dang bi bug chuyen huong tu trang login sang home chua update component login/register
    this.state = {
      token: document.cookie || "",
    };
  }
  changeLanguage = (language) => {
    // fire redux event : actions
    this.props.changeLanguageAppRedux(language);
  };
  handleLogOut = () => {
    this.props.processLogout();
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    console.log("check from log out(Header): da xoa cookie", document.cookie);
  };

  render() {
    let { language, isLoggedIn } = this.props;
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
                    <a href="/">
                      <span className="text-primary">
                        <FontAwesomeIcon icon={solid("phone")} />
                      </span>{" "}
                      +00 123 4455 6666
                    </a>
                    <span className="divider">|</span>
                    <a href="/">
                      <span className="text-primary">
                        <FontAwesomeIcon icon={solid("envelope")} />
                      </span>{" "}
                      agueroduc01@gmail.com
                    </a>
                  </div>
                </div>
                <div className="col-sm-4 text-right text-sm right-content">
                  <div className="languages">
                    <div
                      className={
                        language === LANGUAGES.VI
                          ? "language-vi active"
                          : "language-vi"
                      }
                    >
                      <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                        VN
                      </span>
                    </div>
                    <div
                      className={
                        language === LANGUAGES.EN
                          ? "language-en active"
                          : "language-en"
                      }
                    >
                      <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                        EN
                      </span>
                    </div>
                  </div>
                  <div className="social-mini-button">
                    <a href="/">
                      <span>
                        <FontAwesomeIcon icon={brands("facebook-f")} />
                      </span>
                    </a>
                    <a href="/">
                      <span>
                        <FontAwesomeIcon icon={brands("twitter")} />
                      </span>
                    </a>
                    <a href="/">
                      <span>
                        <FontAwesomeIcon icon={brands("dribbble")} />
                      </span>
                    </a>
                    <a href="/">
                      <span>
                        <FontAwesomeIcon icon={brands("instagram")} />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
            <div className="container">
              <a className="navbar-brand" href="/">
                <span className="text-primary">One</span>-Health
              </a>

              <form action="">
                <div className="input-group input-navbar">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="icon-addon1">
                      <span className="">
                        <FontAwesomeIcon icon={solid("magnifying-glass")} />
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
                    <a className="nav-link" href="/home">
                      <FormattedMessage id="home-header.home" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/about">
                      <FormattedMessage id="home-header.about-us" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/doctors">
                      <FormattedMessage id="home-header.doctors" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/blog">
                      <FormattedMessage id="home-header.news" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/contact">
                      <FormattedMessage id="home-header.contact" />
                    </a>
                  </li>
                  {/* Chua bat truong hop cookie het han se update lai component login/register */}
                  {this.state.token && isLoggedIn ? (
                    <li className="nav-item">
                      <a href="/detail-user">Avatar</a>
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
                      <a className="btn btn-primary ml-lg-3" href="/login">
                        <span>
                          <FormattedMessage id="home-header.login-register" />
                        </span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <div className="page-hero bg-image1 overlay-dark">
          <div className="hero-section">
            <div
              className="container text-center wow zoomIn"
              style={{ visibility: "visible", animationName: "zoomIn" }}
            >
              <span className="subhead">
                <FormattedMessage id="banner.title1" />
              </span>
              <h1 className="display-4">
                <FormattedMessage id="banner.title2" />
              </h1>
              <a href="/" className="btn btn-primary">
                <span>
                  <FormattedMessage id="banner.consult" />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="bg-light mt--44px">
          <div className="page-section py-3 mt-md-n5 custom-index">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-4 py-3 py-md-0">
                  <div className="card-service wow fadeInUp">
                    <div className="circle-shape bg-secondary text-white">
                      <span>
                        <FontAwesomeIcon icon={solid("comments")} />
                      </span>
                    </div>
                    <p>
                      <FormattedMessage id="banner.chat-w-doctor" />
                    </p>
                  </div>
                </div>
                <div className="col-md-4 py-3 py-md-0">
                  <div className="card-service wow fadeInUp">
                    <div className="circle-shape bg-primary text-white">
                      <span>
                        <FontAwesomeIcon icon={solid("shield")} />
                      </span>
                    </div>
                    <p>
                      <FormattedMessage id="banner.protection" />
                    </p>
                  </div>
                </div>
                <div className="col-md-4 py-3 py-md-0">
                  <div className="card-service wow fadeInUp">
                    <div className="circle-shape bg-info text-white">
                      <span>
                        <FontAwesomeIcon icon={solid("basket-shopping")} />
                      </span>
                    </div>
                    <p>
                      <FormattedMessage id="banner.pharmacy" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="page-section pb-0">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 py-3">
                  <div style={{ width: "400px" }}>
                    <h1>
                      <FormattedMessage id="about-us.title" />
                    </h1>
                  </div>
                  <p className="text-grey mb-4">
                    <FormattedMessage id="about-us.description" />
                  </p>
                  <a href="about.html" className="btn btn-primary">
                    <span>
                      <FormattedMessage id="about-us.detail-us" />
                    </span>
                  </a>
                </div>
                <div className="col-lg-6">
                  <div className="img-place custom-img-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
