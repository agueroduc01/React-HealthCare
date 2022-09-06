import React, { Component } from "react";
import { connect } from "react-redux";
import "./BannerPattern.scss";

class BannerPattern extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <>
        <div className="page-section banner-home bg-image2">
          <div className="container py-5 py-lg-0">
            <div className="row align-items-center">
              <div className="col-lg-4 wow zoomIn">
                <div className="img-banner d-none d-lg-block">
                  <img className="img_mobile_app" alt="" />
                </div>
              </div>
              <div className="col-lg-8 wow fadeInRight">
                <h1 className="font-weight-normal mb-3">
                  Get easy access of all features using One Health Application
                </h1>
                <a href="/">
                  <img className="img_google_play" alt="" />
                </a>
                <a href="/">
                  <img className="ml-2 img_app_store" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerPattern);
