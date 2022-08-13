import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  // regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

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
            <h1 className="text-center mb-5">Our Doctors</h1>

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
                          <span className="text-sm text-grey">Cardiology</span>
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
                          <span className="text-sm text-grey">Dental</span>
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
                            General Health
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
                            General Health
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
                          <span className="text-sm text-grey">Dental</span>
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

        <div className="page-section bg-light">
          <div className="container">
            <h1 className="text-center wow fadeInUp">Latest News</h1>
            <div className="row mt-5">
              <div className="col-lg-4 py-2 wow zoomIn">
                <div className="card-blog">
                  <div className="header">
                    <div className="post-category">
                      <a href="/">Covid19</a>
                    </div>
                    <a href="blog-details.html" className="post-thumb">
                      <img className="blog-1" alt="" />
                    </a>
                  </div>
                  <div className="body">
                    <h5 className="post-title">
                      <a href="blog-details.html">
                        List of Countries without Coronavirus case
                      </a>
                    </h5>
                    <div className="site-info">
                      <div className="avatar mr-2">
                        <div className="avatar-img1"></div>
                        <span>Roger Adams</span>
                      </div>
                      <span>logoTime</span> 1 week ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 py-2 wow zoomIn">
                <div className="card-blog">
                  <div className="header">
                    <div className="post-category">
                      <a href="/">Covid19</a>
                    </div>
                    <a href="blog-details.html" className="post-thumb">
                      <img className="blog-2" alt="" />
                    </a>
                  </div>
                  <div className="body">
                    <h5 className="post-title">
                      <a href="blog-details.html">
                        Recovery Room: News beyond the pandemic
                      </a>
                    </h5>
                    <div className="site-info">
                      <div className="avatar mr-2">
                        <div className="avatar-img2"></div>
                        <span>Roger Adams</span>
                      </div>
                      <span className="mai-time"></span> 4 weeks ago
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 py-2 wow zoomIn">
                <div className="card-blog">
                  <div className="header">
                    <div className="post-category">
                      <a href="/">Covid19</a>
                    </div>
                    <a href="blog-details.html" className="post-thumb">
                      <img className="blog-3" alt="" />
                    </a>
                  </div>
                  <div className="body">
                    <h5 className="post-title">
                      <a href="blog-details.html">
                        What is the impact of eating too much sugar?
                      </a>
                    </h5>
                    <div className="site-info">
                      <div className="avatar mr-2">
                        <div className="avatar-img3"></div>
                        <span>Diego Simmons</span>
                      </div>
                      <span className="mai-time"></span> 2 months ago
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 text-center mt-4 wow zoomIn">
                <a href="blog.html" className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="page-section">
          <div className="container">
            <h1 className="text-center wow fadeInUp">Make an Appointment</h1>

            <form className="main-form">
              <div className="row mt-5 ">
                <div className="col-12 col-sm-6 py-2 wow fadeInLeft">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                  />
                </div>
                <div className="col-12 col-sm-6 py-2 wow fadeInRight">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email address.."
                  />
                </div>
                <div
                  className="col-12 col-sm-6 py-2 wow fadeInLeft"
                  data-wow-delay="300ms"
                >
                  <input type="date" className="form-control" />
                </div>
                <div
                  className="col-12 col-sm-6 py-2 wow fadeInRight"
                  data-wow-delay="300ms"
                >
                  <select
                    name="departement"
                    id="departement"
                    className="custom-select"
                  >
                    <option value="general">General Health</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="dental">Dental</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopaedics">Orthopaedics</option>
                  </select>
                </div>
                <div
                  className="col-12 py-2 wow fadeInUp"
                  data-wow-delay="300ms"
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Number.."
                  />
                </div>
                <div
                  className="col-12 py-2 wow fadeInUp"
                  data-wow-delay="300ms"
                >
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="6"
                    placeholder="Enter message.."
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-3 wow zoomIn">
                Submit Request
              </button>
            </form>
          </div>
        </div>

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
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OurDoctors);
