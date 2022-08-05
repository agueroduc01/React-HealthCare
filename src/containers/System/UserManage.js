import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  getAUser,
  createNewUserService,
  deleteUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers();
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
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
      }
      console.log(">>> createNewUser ", response);
    } catch (error) {
      console.log(error);
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

  handleDeleteUser = async (user) => {
    console.log(">>> deleteUser ", user);
    try {
      let response = await deleteUserService(user.id);
      if (response) {
        console.log(response, user.id);
        await this.getAllUsersFromReact();
      }
    } catch (error) {
      console.log(error);
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
        <div className="title text-center">User Manager </div>
        <div className="mt-2 mx-4">
          <button
            className="btn btn-info px-2"
            onClick={() => {
              this.handleOnclickAddUser();
            }}
          >
            <i className="fas fa-plus px-1"></i>
            Add a new user
          </button>
        </div>
        <div className="row mx-3">
          <table id="customers">
            <tbody>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
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
                        <a href="/edit-user/{{id}}">
                          <button type="button" className="btn-edit">
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                        </a>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
