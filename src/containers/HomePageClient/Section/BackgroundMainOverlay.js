import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class BackgroundMainOverlay extends Component {
  goToAboutPage = () => {
    if (this.props.history) {
      this.props.history.push(`/about`);
    }
  };

  render() {
    return (
      <>
        <div className="page-hero bg-image1 overlay-dark">
          <div className="hero-section">
            <div
              className="container text-center wow zoomIn"
              style={{ visibility: 'visible', animationName: 'zoomIn' }}
            >
              <span className="subhead">
                <FormattedMessage id="banner.title1" />
              </span>
              <h1 className="display-4">
                <FormattedMessage id="banner.title2" />
              </h1>
              <p className="btn btn-primary" onClick={this.goToAboutPage}>
                <span>
                  <FormattedMessage id="banner.consult" />
                </span>
              </p>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BackgroundMainOverlay)
);
