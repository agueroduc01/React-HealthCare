import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class BackgroundMainOverlay extends Component {
  render() {
    return (
      <>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundMainOverlay);
