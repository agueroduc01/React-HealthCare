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
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

class OurDoctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      arrDoctors: [],
    };
  }

  componentDidMount() {
    console.log("mounted", this.state);
    this.props.loadOutStandingDoctors();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.outstandingDoctorsRedux !== this.props.outstandingDoctorsRedux
    ) {
      this.setState({
        arrDoctors: this.props.outstandingDoctorsRedux,
      });
    }
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
        if (this.state.slideIndex === slides.length - 3) {
          this.setState({ slideIndex: slides.length - 4 });
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
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
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
                  {arrDoctors &&
                    arrDoctors.length > 0 &&
                    arrDoctors.map((item, index) => {
                      let imageBase64 = "";
                      if (item.image) {
                        imageBase64 = new Buffer(item.image, "base64").toString(
                          "binary"
                        );
                      }
                      let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                      let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                      return (
                        <div
                          className={index < 3 ? "owl-item active" : "owl-item"}
                          style={{ width: "370px" }}
                          key={item.id}
                        >
                          <div className="item">
                            <div className="card-doctor">
                              <div className="header">
                                <img
                                  className="img-doctor1"
                                  alt=""
                                  style={{
                                    backgroundImage: `url(${imageBase64})`,
                                  }}
                                />
                                <div className="meta">
                                  <a href="/">
                                    <span>
                                      <FontAwesomeIcon icon={solid("phone")} />
                                    </span>
                                  </a>
                                  <a href="/">
                                    <span>
                                      <FontAwesomeIcon
                                        icon={brands("whatsapp")}
                                      />
                                    </span>
                                  </a>
                                </div>
                              </div>
                              <div className="body">
                                <p className="text-xl mb-0">
                                  {language === LANGUAGES.VI ? nameVi : nameEn}
                                </p>
                                <span className="text-sm text-grey">
                                  <FormattedMessage id="specialty.cardiology" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
    outstandingDoctorsRedux: state.admin.outstandingDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOutStandingDoctors: () => dispatch(actions.fetchOutStandingDoctors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OurDoctors);
