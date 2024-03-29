import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgUrl: '',
      isOpen: false,

      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      gender: '',
      positionId: '',
      roleId: '',
      avatar: '',

      action: CRUD_ACTIONS.CREATE,
      userEditId: '',
    };
  }

  async componentDidMount() {
    // Dùng redux call api và lưu lại
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  // mỗi khi đc render thì sẽ gọi đến hàm didUpdate
  componentDidUpdate(prevProps, prevState) {
    // kiểm tra hiện tại (this) và quá khứ (previous)
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
      });
    }

    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        positionId:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
      });
    }

    let imgBlock = document.querySelector('.img-upload');
    if (CRUD_ACTIONS.CREATE === this.state.action) {
      if (prevState.previewImgUrl !== this.state.previewImgUrl) {
        imgBlock.style.display = 'block';
        imgBlock.style.cursor = 'pointer';
      } else {
        imgBlock.style.display = 'none';
        imgBlock.style.cursor = 'default';
      }
    }
    if (CRUD_ACTIONS.EDIT === this.state.action) {
      imgBlock.style.display = 'block';
      imgBlock.style.cursor = 'pointer';
    }
  }
  handleOnchangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImg = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };

  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };

  checkValidInput = () => {
    let arrInput = [
      'email',
      'password',
      'firstName',
      'lastName',
      'address',
      'phoneNumber',
    ];
    let length = arrInput.length;
    let isValid = true;
    for (let i = 0; i < length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert('Please enter a valid ' + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValidInput();
    if (!isValid) {
      return;
    }
    let {
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber,
      gender,
      roleId,
      positionId,
      avatar,
      action,
    } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      //fire create new user redux
      this.props.createNewUser(
        {
          firstName,
          lastName,
          email,
          password,
          address,
          phoneNumber,
          gender,
          roleId,
          positionId,
          image: avatar,
        },
        // token của user đang đăng nhập để tạo 1 user khác
        this.props.userInfo.accessToken
      );
    }

    if (action === CRUD_ACTIONS.EDIT) {
      //fire edit user redux
      this.props.editAUserRedux(
        {
          id: this.state.userEditId,
          firstName,
          lastName,
          address,
          phoneNumber,
          gender,
          roleId,
          positionId,
          image: avatar ? avatar : this.state.previewImgUrl,
        },
        // token của user đang đăng nhập để tạo 1 user khác
        this.props.userInfo.accessToken
      );
    }

    let arrRoles = this.props.roleRedux;
    let arrGenders = this.props.genderRedux;
    let arrPositions = this.props.positionRedux;
    this.setState({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
      positionId:
        arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
      roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
      avatar: '',
      action: CRUD_ACTIONS.CREATE,
    });
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = '';
    if (user.image) {
      imageBase64 = new Buffer(user.image, 'base64').toString('binary');
    }

    let {
      firstName,
      lastName,
      email,
      address,
      phoneNumber,
      gender,
      roleId,
      positionId,
      id,
    } = user;
    this.setState({
      email,
      password: 'HARDCODE',
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      positionId,
      roleId,
      avatar: '',
      previewImgUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: id,
    });
  };

  render() {
    let { genderArr, roleArr, positionArr } = this.state;
    let language = this.props.language;
    let isLoadingGenders = this.props.isLoadingGenders;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      positionId,
      roleId,
      // avatar,
    } = this.state;

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
                {isLoadingGenders === true ? 'Loading genders' : ''}
              </div>
            </div>
            <form className="mx-5">
              <div className="row mt-4">
                <div className="form-group col-md-6">
                  <label htmlFor="email">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control mt-2"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      this.handleOnchangeInput(e, 'email');
                    }}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="password">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control mt-2"
                    id="password"
                    placeholder="Password"
                    autoComplete="on"
                    value={password}
                    onChange={(e) => {
                      this.handleOnchangeInput(e, 'password');
                    }}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="form-group col-md-6">
                  <label htmlFor="firstName">
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      this.handleOnchangeInput(e, 'firstName');
                    }}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lastName">
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      this.handleOnchangeInput(e, 'lastName');
                    }}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="form-group col-sm-4">
                  <label htmlFor="phoneNumber">
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => {
                      this.handleOnchangeInput(e, 'phoneNumber');
                    }}
                  />
                </div>
                <div className="form-group col-sm-8">
                  <label htmlFor="address">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    id="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => {
                      this.handleOnchangeInput(e, 'address');
                    }}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="form-group col-md-3">
                  <label htmlFor="gender">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    id="gender"
                    className="form-control mt-2"
                    onChange={(e) => {
                      this.handleOnchangeInput(e, 'gender');
                    }}
                    value={gender}
                  >
                    {genderArr &&
                      genderArr.length > 0 &&
                      genderArr.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="positionId">
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    id="positionId"
                    className="form-control mt-2"
                    onChange={(e) => {
                      this.handleOnchangeInput(e, 'positionId');
                    }}
                    value={positionId}
                  >
                    {positionArr &&
                      positionArr.length > 0 &&
                      positionArr.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
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
                  <select
                    id="roleId"
                    className="form-control mt-2"
                    onChange={(e) => {
                      this.handleOnchangeInput(e, 'roleId');
                    }}
                    value={roleId}
                  >
                    {roleArr &&
                      roleArr.length > 0 &&
                      roleArr.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
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
              <button
                type="button"
                className={
                  this.state.action === CRUD_ACTIONS.EDIT
                    ? 'btn btn-warning mt-4'
                    : 'btn btn-primary mt-4'
                }
                onClick={() => {
                  this.handleSaveUser();
                }}
              >
                {this.state.action === CRUD_ACTIONS.EDIT ? (
                  <FormattedMessage id="manage-user.edit" />
                ) : (
                  <FormattedMessage id="manage-user.save" />
                )}
              </button>
            </form>
          </div>
        </div>

        <TableManageUser handleEditUser={this.handleEditUserFromParent} />

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
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data, accessToken) =>
      dispatch(actions.createNewUser(data, accessToken)),
    editAUserRedux: (user, accessToken) =>
      dispatch(actions.editAUser(user, accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
