import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../store/actions";
import * as actions from "../../store/actions";
import "./Login.scss";
// import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  refresh = () => {
    this.setState({
      ...this.state,
    });
  };

  handleOnchangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnchangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = async () => {
    // const { adminLoginSuccess } = this.props;
    // //sucess
    // let adminInfo = {
    //     "tlid": "0",
    //     "tlfullname": "Administrator",
    //     "custype": "A",
    //     "accessToken": "eyJhbGciOiJIU"
    // }
    // adminLoginSuccess(adminInfo);
    this.setState({
      errMessage: "",
    });

    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        // working at here
        this.props.adminLoginSuccess(data.user);
        console.log("login success", data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          console.log(error);
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
    // this.refresh();
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    return (
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black px-5">
              <div className="px-5 ms-xl-4">
                <i
                  className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"
                  style={{ color: "#709085" }}
                ></i>
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form style={{ width: "23rem" }}>
                  <h3
                    className="fw-normal mb-3 pb-5"
                    style={{ letterSpacing: 1 }}
                  >
                    Log in
                  </h3>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example18">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="form2Example18"
                      className="form-control form-control-lg"
                      value={this.state.username}
                      onChange={(e) => this.handleOnchangeUsername(e)}
                    />
                  </div>

                  <div className="form-outline mb-2 custom-input-password">
                    <label className="form-label" htmlFor="form2Example28">
                      Password
                    </label>
                    <input
                      type={this.state.isShowPassword ? "text" : "password"}
                      id="form2Example28"
                      className="form-control form-control-lg"
                      value={this.state.password}
                      onChange={(e) => this.handleOnchangePassword(e)}
                    />
                    <span onClick={() => this.handleShowHidePassword()}>
                      <i
                        className={
                          this.state.isShowPassword
                            ? "far fa-eye"
                            : "far fa-eye-slash"
                        }
                      ></i>
                    </span>
                  </div>

                  <div className="form-check mb-4">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" />
                      <small>Remember Me</small>
                    </label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button
                      type="button"
                      className="btn-login float-right"
                      onClick={() => this.handleLogin()}
                    >
                      Login
                    </button>
                  </div>

                  <div className="col-12" style={{ color: "red" }}>
                    {this.state.errMessage}
                  </div>

                  <p className="small mb-5 pb-lg-2">
                    <a className="text-muted" href="#!">
                      Forgot password?
                    </a>
                  </p>
                  <p>
                    Don't have an account?{" "}
                    <a href="#!" className="link-info">
                      Register here
                    </a>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                alt="{Login image}"
                className="w-100 vh-100"
                style={{ objectFit: "cover", objectPosition: "left" }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
