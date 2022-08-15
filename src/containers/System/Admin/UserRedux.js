import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
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
  }

  render() {
    let genders = this.state.genderArr;
    let language = this.props.language;
    console.log("gender redux: ", this.props.genderRedux);
    return (
      <div className="user-redux-container">
        <div className="title">User Redux</div>
        <div className="user-redux-body">
          <div className="text-center">
            <FormattedMessage id="manage-user.add" />
          </div>
          <div className="container mt-4">
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
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
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
                    <option defaultValue="selected">Choose...</option>
                    <option>Doctor</option>
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="roleId">
                    <FormattedMessage id="manage-user.roleId" />
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="roleId"
                  />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="image">
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <input type="file" className="form-control mt-2" id="image" />
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
