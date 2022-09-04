import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  getAUser,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact(this.props.userInfo.accessToken);
  }

  getAllUsersFromReact = async (accessToken) => {
    let response = await getAllUsers(accessToken);
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.data,
      });
    }
  };

  handleGetAUser = async (user) => {
    try {
      let response = await getAUser(user.id);
      if (response && response.errCode === 0) {
        console.log("Success: ", response.errMessage);
        console.log("handleGetAUser", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  createNewUser = async (data) => {
    try {
      console.log(">>check data", data);
      let response = await createNewUserService(data);
      if (response && response.message.errCode !== 0) {
        alert(response.message.errMessage);
      } else {
        await this.getAllUsersFromReact(this.props.userInfo.accessToken);
        this.setState({
          isOpenModalUser: false,
        });
        // emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "1" });
        toast.success("Create a new user successfully!");
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
      console.log(">>> createNewUser ", response);
    } catch (error) {
      console.log(error);
      toast.error("Error from create a new user");
    }
  };

  handleOnclickAddUser = () => {
    this.toggleAddUserModal();
  };

  toggleAddUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  handleDeleteUser = async (user) => {
    console.log(">>> deleteUser ", user);
    try {
      let response = await deleteUserService(user.id);
      if (response && response.errCode === 0) {
        console.log(response, user.id);
        await this.getAllUsersFromReact(this.props.userInfo.accessToken);
        toast.success("Deleted a user successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error from delete a user");
    }
  };

  handleEditUser = async (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  handleSaveEditUser = async (user) => {
    let response = await editUserService(user);
    try {
      if (response && response.message.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUsersFromReact(this.props.userInfo.accessToken);
        toast.success("Edited a user successfully!");
      } else {
        toast.error(response.message.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  /** Life cycle
   * Run component:
   * 1. Run contructor -> init state
   * 2. Did Mount (lấy data từ api và setState): born state. Ngược lại: unmounted
   * 3. Render
   */

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="mt-4">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleAddUserModal}
          createNewUser={this.createNewUser}
        />
        {/* Dùng cách này cũng được nhưng bị mất hiệu ứng css khi tắt component
        modalEditUser => Nên dùng componentDidUpdate(), giữ được css khi tắt  */}
        {this.state.isOpenModalEditUser && ""}
        <ModalEditUser
          isOpen={this.state.isOpenModalEditUser}
          toggleFromParent={this.toggleEditUserModal}
          currentUser={this.state.userEdit}
          editUser={this.handleSaveEditUser}
        />
        <div className="title text-center">User Manager </div>
        <div className="mt-2 mx-4">
          <button
            className="btn btn-info px-2"
            onClick={() => {
              this.handleOnclickAddUser();
            }}
          >
            <i className="fas fa-plus px-1"></i>
            <FormattedMessage id="manage-user.add" />
          </button>
        </div>
        <div className="row mx-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>ID</th>
                <th>
                  <FormattedMessage id="manage-user.first-name" />
                </th>
                <th>
                  <FormattedMessage id="manage-user.last-name" />
                </th>
                <th>
                  <FormattedMessage id="manage-user.email" />
                </th>
                <th>
                  <FormattedMessage id="manage-user.address" />
                </th>
                <th>Action</th>
              </tr>

              {arrUsers &&
                arrUsers.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          type="button"
                          className="btn-detail"
                          onClick={() => {
                            this.handleGetAUser(item);
                          }}
                        >
                          <i className="fas fa-user"></i>
                        </button>
                        <button
                          type="button"
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          type="button"
                          className="btn-delete"
                          onClick={() => {
                            this.handleDeleteUser(item);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
