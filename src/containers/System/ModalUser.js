import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "true",
      roleId: "R1",
      isValid: false,
    };

    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      // reset state
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: "true",
        roleId: "R1",
        isValid: false,
      });
    });
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnchange = (e, id) => {
    // bad code
    // this.state[id] = e.target.value;
    // this.setState({
    //     ...this.state,
    // })

    // good code
    let copyState = { ...this.state };
    copyState[id] = e.target.value;

    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log(copyState);
      }
    );
  };

  checkValidInput = () => {
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
    ];
    let length = arrInput.length;
    let isValid = true;
    for (let i = 0; i < length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Please enter a valid " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidInput();
    if (isValid) {
      // call api create new user
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => {
            this.toggle();
          }}
          className={this.props.className}
          size="lg"
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            CREATE A NEW USER
          </ModalHeader>
          <ModalBody className="px-4 pt-4 pb-5">
            <Container>
              <Form id="form-1">
                <Row className="my-3">
                  <Col xs="6">
                    <FormGroup className="form-group">
                      <Label for="email" className="my-1">
                        Email
                      </Label>
                      {this.state.isValid ? (
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="something@idk.cool"
                          onChange={(e) => this.handleOnchange(e, "email")}
                          value={this.state.email}
                          valid
                        />
                      ) : (
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="something@idk.cool"
                          onChange={(e) => this.handleOnchange(e, "email")}
                          value={this.state.email}
                          invalid
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label for="password" className="my-1">
                        Password
                      </Label>
                      <Input
                        type="password"
                        autoComplete="on"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => this.handleOnchange(e, "password")}
                        value={this.state.password}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs="6">
                    <FormGroup>
                      <Label for="firstName" className="my-1">
                        First Name
                      </Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                        onChange={(e) => this.handleOnchange(e, "firstName")}
                        value={this.state.firstName}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label for="examplePassword" className="my-1">
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                        onChange={(e) => this.handleOnchange(e, "lastName")}
                        value={this.state.lastName}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>
                    <FormGroup>
                      <Label for="examplePassword" className="my-1">
                        Address
                      </Label>
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Address"
                        onChange={(e) => this.handleOnchange(e, "address")}
                        value={this.state.address}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col xs="6" sm="4">
                    <FormGroup>
                      <Label for="examplePassword" className="my-1">
                        Phone Number
                      </Label>
                      <Input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        onChange={(e) => this.handleOnchange(e, "phoneNumber")}
                        value={this.state.phoneNumber}
                      />
                    </FormGroup>
                  </Col>

                  <Col xs="6" sm="4">
                    <FormGroup>
                      <Label for="sex" className="my-1">
                        Sex
                      </Label>
                      <Input
                        type="select"
                        name="select"
                        id="sex"
                        onChange={(e) => {
                          this.handleOnchange(e, "gender");
                        }}
                        value={this.state.gender}
                      >
                        <option value="true">Male</option>
                        <option value="false">Female</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col sm="4">
                    <FormGroup>
                      <Label for="sex" className="my-1">
                        Role
                      </Label>
                      <Input
                        type="select"
                        name="select"
                        id="role"
                        onChange={(e) => {
                          this.handleOnchange(e, "roleId");
                        }}
                        value={this.state.roleId}
                      >
                        <option value="R1">Admin</option>
                        <option value="R2">Doctor</option>
                        <option value="R3">Patient</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3 mx-2"
              onClick={() => {
                this.handleAddNewUser();
              }}
            >
              Add new user
            </Button>{" "}
            <Button
              color="secondary"
              className="px-3"
              onClick={() => {
                this.toggle();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
