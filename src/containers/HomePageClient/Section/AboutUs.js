import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  //   regular,
  //   brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { FormattedMessage } from "react-intl";

class AboutUs extends Component {
  render() {
    return (
      <>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
