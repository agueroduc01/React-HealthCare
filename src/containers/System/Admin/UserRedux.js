import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgUrl: "",
      isOpen: false,
    };
  }

  async componentDidMount() {
    // Dùng redux call api và lưu lại
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();

    // call api trực tiếp
    // try {
    //   let res = await getAllCodeService("gender");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  }

  // mỗi khi đc render thì sẽ gọi đến hàm didUpdate
  componentDidUpdate(prevProps, prevState) {
    // kiểm tra hiện tại (this) và quá khứ (previous)
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: this.props.roleRedux,
      });
    }

    let imgBlock = document.querySelector(".img-upload");
    if (!this.state.previewImgUrl) {
      imgBlock.style.display = "none";
      imgBlock.style.cursor = "default";
    } else {
      imgBlock.style.display = "block";
      imgBlock.style.cursor = "pointer";
    }
  }
  handleOnchangeImage = (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
      });
    }
  };

  openPreviewImg = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };
  render() {
    let { genderArr, roleArr, positionArr } = this.state;
    let language = this.props.language;
    let isLoadingGenders = this.props.isLoadingGenders;
    console.log("check state: ", this.state);
    return (
      <div className="user-redux-container">
        <div className="title">User Redux</div>
        <div className="user-redux-body">
          <div className="text-center">
            <FormattedMessage id="manage-user.add" />
          </div>
          <div className="container mt-4">
            <div className="row">
              <div className="col-12 text-center">
                {isLoadingGenders === true ? "Loading genders" : ""}
              </div>
            </div>
            <form className="mx-5">
              <div className="row mt-4">
                <div className="form-group col-md-6">
                  <label htmlFor="email">
                    {" "}
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control mt-2"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="password">
                    {" "}
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control mt-2"
                    id="password"
                    placeholder="Password"
                    autoComplete="on"
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="form-group col-md-6">
                  <label htmlFor="firstName">
                    {" "}
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="firstName"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lastName">
                    {" "}
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="lastName"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="form-group col-sm-4">
                  <label htmlFor="phoneNumber">
                    {" "}
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="phoneNumber"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="form-group col-sm-8">
                  <label htmlFor="address">
                    {" "}
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="address"
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="form-group col-md-3">
                  <label htmlFor="gender">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select id="gender" className="form-control mt-2">
                    {genderArr &&
                      genderArr.length > 0 &&
                      genderArr.map((item, index) => {
                        return (
                          <option key={index}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="position">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select id="position" className="form-control mt-2">
                    {positionArr &&
                      positionArr.length > 0 &&
                      positionArr.map((item, index) => {
                        return (
                          <option key={index}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="roleId">
                    <FormattedMessage id="manage-user.roleId" />
                  </label>
                  <select id="roleId" className="form-control mt-2">
                    {roleArr &&
                      roleArr.length > 0 &&
                      roleArr.map((item, index) => {
                        return (
                          <option key={index}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="image">
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div>
                    <input
                      type="file"
                      className="form-control mt-2"
                      id="image"
                      onChange={(e) => this.handleOnchangeImage(e)}
                    />
                  </div>
                  <div
                    className="img-upload"
                    style={{
                      backgroundImage: `url(${this.state.previewImgUrl})`,
                    }}
                    onClick={() => this.openPreviewImg()}
                  ></div>
                </div>
              </div>
              <div className="form-group mt-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                <FormattedMessage id="manage-user.save" />
              </button>
            </form>
          </div>
        </div>

        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGenders: state.admin.isLoadingGenders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
