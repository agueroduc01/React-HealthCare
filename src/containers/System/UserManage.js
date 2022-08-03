import React, { Component } from "react";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
    let response = await getAllUsers();
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.data,
      });
    }
  }

  /** Life cycle
   * Run component:
   * 1. Run contructor -> init state
   * 2. Did Mount (lấy data từ api và setState)
   * 3. Render
   */

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="mt-4">
        <div className="title text-center">User Manager </div>
        <div className="row mx-3">
          <table id="customers">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>
                        <a href="/detail-user/{{id}}">
                          <button type="button" className="btn-detail">
                            <i class="fas fa-user"></i>
                          </button>
                        </a>
                        <a href="/edit-user/{{id}}">
                          <button type="button" className="btn-edit">
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                        </a>
                        <form action="/delete-user" method="POST">
                          <input type="text" hidden value="{{id}}" name="id" />
                          <button type="submit" className="btn-delete">
                            <i className="fas fa-trash"></i>
                          </button>
                        </form>
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
