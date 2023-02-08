import React from "react";
import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
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
import "./BookingModal.scss";

class BookingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <>
        {/* toggle={} */}
        <Modal
          isOpen={true}
          className={"booking-modal-container"}
          centered
          size="lg"
        >
          Modal
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language,
});

export default connect(mapStateToProps)(BookingModal);
