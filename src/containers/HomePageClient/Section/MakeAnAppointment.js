import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./MakeAnAppointment.scss";

class MakeAnAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    return (
      <>
        <div className="page-section">
          <div className="container">
            <h1 className="text-center wow fadeInUp">
              <FormattedMessage id="make-appointment.title" />
            </h1>

            <form className="main-form">
              <div className="row mt-5 ">
                <div className="col-12 col-sm-6 py-2 wow fadeInLeft">
                  <FormattedMessage id="make-appointment.full-name">
                    {(placeholder) => (
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placeholder}
                      />
                    )}
                  </FormattedMessage>
                </div>
                <div className="col-12 col-sm-6 py-2 wow fadeInRight">
                  <FormattedMessage id="make-appointment.email">
                    {(placeholder) => (
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placeholder}
                      />
                    )}
                  </FormattedMessage>
                </div>
                <div
                  className="col-12 col-sm-6 py-2 wow fadeInLeft"
                  data-wow-delay="300ms"
                >
                  <input type="date" className="form-control" />
                </div>
                <div
                  className="col-12 col-sm-6 py-2 wow fadeInRight"
                  data-wow-delay="300ms"
                >
                  <select
                    name="departement"
                    id="departement"
                    className="custom-select"
                  >
                    <FormattedMessage
                      id="specialty.general-health"
                      key={"op-general"}
                    >
                      {(message) => <option value="general">{message}</option>}
                    </FormattedMessage>
                    <FormattedMessage
                      id="specialty.cardiology"
                      key={"op-cardiology"}
                    >
                      {(message) => (
                        <option value="cardiology">{message}</option>
                      )}
                    </FormattedMessage>
                    <FormattedMessage id="specialty.dental" key={"op-dental"}>
                      {(message) => <option value="dental">{message}</option>}
                    </FormattedMessage>
                    <FormattedMessage
                      id="specialty.neurology"
                      key={"op-neurology"}
                    >
                      {(message) => (
                        <option value="neurology">{message}</option>
                      )}
                    </FormattedMessage>
                    <FormattedMessage
                      id="specialty.orthopaedics"
                      key={"op-orthopaedics"}
                    >
                      {(message) => (
                        <option value="orthopaedics">{message}</option>
                      )}
                    </FormattedMessage>
                  </select>
                </div>
                <div
                  className="col-12 py-2 wow fadeInUp"
                  data-wow-delay="300ms"
                >
                  <FormattedMessage id="make-appointment.phone">
                    {(placeholder) => (
                      <input
                        type="text"
                        className="form-control"
                        placeholder={placeholder}
                      />
                    )}
                  </FormattedMessage>
                </div>
                <div
                  className="col-12 py-2 wow fadeInUp"
                  data-wow-delay="300ms"
                >
                  <FormattedMessage id="make-appointment.message">
                    {(placeholder) => (
                      <textarea
                        name="message"
                        id="message"
                        className="form-control"
                        rows="6"
                        placeholder={placeholder}
                      />
                    )}
                  </FormattedMessage>
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-3 wow zoomIn">
                <FormattedMessage id="make-appointment.submit" />
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MakeAnAppointment);
