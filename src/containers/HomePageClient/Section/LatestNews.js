import React, { Component } from "react";
import { connect } from "react-redux";
import "./LatestNews.scss";

class LatestNews extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <>
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
                      <span className="mx-1">
                        <i class="fas fa-clock"></i> 1 week ago
                      </span>
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
                      <span className="mx-1">
                        <i class="fas fa-clock"></i> 4 weeks ago
                      </span>
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
                      <span className="mx-1">
                        <i class="fas fa-clock"></i> 2 months ago
                      </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(LatestNews);
