import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';

// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser

// Finish!

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }
  componentDidMount() {
    let user = this.props.userInfo || '';
    this.props.fetchUsersRedux(user.accessToken);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }
  handleDeleteUser = (user) => {
    this.props.deleteAUserRedux(user.id, this.props.userInfo.accessToken);
  };
  render() {
    let arrUsers = this.state.usersRedux;
    return (
      <>
        <div className="row mx-5 my-5">
          <table id="TableManageUser">
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
                arrUsers.length > 0 &&
                arrUsers.map((item, index) => {
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
                            // this.handleGetAUser(item);
                          }}
                        >
                          <i className="fas fa-user"></i>
                        </button>
                        <button
                          type="button"
                          className="btn-edit"
                          onClick={() => this.props.handleEditUser(item)}
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersRedux: (accessToken) =>
      dispatch(actions.fetchAllUsersStart(accessToken)),
    deleteAUserRedux: (id, accessToken) =>
      dispatch(actions.deleteAUser(id, accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
