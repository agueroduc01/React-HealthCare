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

class HomeHeader extends Component {
  render() {
    console.log(">>check props ", this.props);
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
                    <div className="language-vi active">VN</div>
                    <div className="language-en">EN</div>
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
                  <input
                    type="text"
                    className="form-control"
                    placeholder={<FormattedMessage id="home-header.search" />}
                    aria-label="Username"
                    aria-describedby="icon-addon1"
                  />
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
                    <a className="nav-link" href="index.html">
                      <FormattedMessage id="home-header.home" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="about.html">
                      <FormattedMessage id="home-header.about-us" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="doctors.html">
                      <FormattedMessage id="home-header.doctors" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="blog.html">
                      <FormattedMessage id="home-header.news" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="contact.html">
                      <FormattedMessage id="home-header.contact" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="btn btn-primary ml-lg-3" href="/">
                      <span>
                        {" "}
                        <FormattedMessage id="home-header.login-register" />
                      </span>
                    </a>
                  </li>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);