import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  // regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import "./OurDoctors.scss";
import { FormattedMessage } from "react-intl";

class OurDoctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 1,
    };
  }

  componentDidMount() {
    console.log("mounted", this.state);
  }

  handleSlideShow = async (n) => {
    let slides = document
      .querySelector(".owl-stage")
      .querySelectorAll(".owl-item");
    let i = 0;
    let y = 0;

    if (this.state.slideIndex === slides.length) {
      console.log(">>end of slide");
    }
    this.setState(
      {
        slideIndex: this.state.slideIndex + n,
      },
      () => {
        slides.forEach((slide) => {
          if (slide.classList.contains("active")) {
            slide.classList.remove("active");
          }
        });

        if (this.state.slideIndex < 0) {
          this.setState({ slideIndex: 0 });
        }
        if (this.state.slideIndex === slides.length - 2) {
          this.setState({ slideIndex: -1 });
        }
        i = this.state.slideIndex;
        if (i > 0) {
          for (; i < slides.length; i++) {
            if (y === 3) {
              y = 0;
              break;
            }
            slides[i].classList.add("active");
            y++;
          }
        } else {
          i = 0;
          for (; i < slides.length; i++) {
            if (y === 3) {
              y = 0;
              break;
            }
            slides[i].classList.add("active");
            y++;
          }
        }
        console.log("showSlides", this.state.slideIndex);
      }
    );
  };

  render() {
    return (
      <>
        <div className="page-section">
          <div className="container">
            <h1 className="text-center mb-5">
              <FormattedMessage id="our-doctors.title" />
            </h1>

            <div className="owl-carousel" id="doctorSlideshow">
              <div className="owl-stage-outer">
                <div
                  className="owl-stage"
                  style={{
                    transform: "translate3d(0px, 0px, 0px)",
                    transition: "all 0.25s ease 0s",
                    width: "1850px",
                  }}
                >
                  <div className="owl-item active" style={{ width: "370px" }}>
                    <div className="item">
                      <div className="card-doctor">
                        <div className="header">
                          <img className="img-doctor1" alt="" />
                          <div className="meta">
                            <a href="/">
                              <span>
                                <FontAwesomeIcon icon={solid("phone")} />
                              </span>
                            </a>
                            <a href="/">
                              <span>
                                <FontAwesomeIcon icon={brands("whatsapp")} />
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="body">
                          <p className="text-xl mb-0">Dr. Stein Albert</p>
                          <span className="text-sm text-grey">
                            <FormattedMessage id="specialty.cardiology" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="owl-item active" style={{ width: "370px" }}>
                    <div className="item">
                      <div className="card-doctor">
                        <div className="header">
                          <img className="img-doctor2" alt="" />
                          <div className="meta">
                            <a href="/">
                              <span>
                                <FontAwesomeIcon icon={solid("phone")} />
                              </span>
                            </a>
                            <a href="/">
                              <span>
                                <FontAwesomeIcon icon={brands("whatsapp")} />
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="body">
                          <p className="text-xl mb-0">Dr. Alexa Melvin</p>
                          <span className="text-sm text-grey">
                            <FormattedMessage id="specialty.dental" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="owl-item active" style={{ width: "370px" }}>
                    <div className="item">
                      <div className="card-doctor">
                        <div className="header">
                          <img className="img-doctor3" alt="" />
                          <div className="meta">
                            <a href="/">
                              <span>
                                <FontAwesomeIcon icon={solid("phone")} />
                              </span>
                            </a>
                            <a href="/">
                              <span>
                                <FontAwesomeIcon icon={brands("whatsapp")} />
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="body">
                          <p className="text-xl mb-0">Dr. Rebecca Steffany</p>
                          <span className="text-sm text-grey">
                            <FormattedMessage id="specialty.general-health" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: "370px" }}>
                    <div className="item">
                      <div className="card-doctor">
                        <div className="header">
                          <img className="img-doctor3" alt="" />
                          <div className="meta">
                            <a href="/">
                              <span>
                                <FontAwesomeIcon icon={solid("phone")} />
                              </span>
                            </a>
                            <a href="/">
                              <span>
                                <FontAwesomeIcon icon={brands("whatsapp")} />
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="body">
                          <p className="text-xl mb-0">Dr. Rebecca Steffany</p>
                          <span className="text-sm text-grey">
                            <FormattedMessage id="specialty.general-health" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="owl-item" style={{ width: "370px" }}>
                    <div className="item">
                      <div className="card-doctor">
                        <div className="header">
                          <img className="img-doctor3" alt="" />
                          <div className="meta">
                            <a href="/">
                              <span>
                                <FontAwesomeIcon icon={solid("phone")} />
                              </span>
                            </a>
                            <a href="/">
                              <span>
                                <FontAwesomeIcon icon={brands("whatsapp")} />
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="body">
                          <p className="text-xl mb-0">Dr. Alexa Melvin</p>
                          <span className="text-sm text-grey">
                            <FormattedMessage id="specialty.dental" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-nav">
                <button
                  type="button"
                  role="presentation"
                  className="owl-prev"
                  onClick={() => this.handleSlideShow(-1)}
                >
                  <span>
                    <FontAwesomeIcon icon={solid("arrow-left")} />
                  </span>
                </button>
                <button
                  type="button"
                  role="presentation"
                  className="owl-next"
                  onClick={() => this.handleSlideShow(1)}
                >
                  <span>
                    <FontAwesomeIcon icon={solid("arrow-right")} />
                  </span>
                </button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OurDoctors);
