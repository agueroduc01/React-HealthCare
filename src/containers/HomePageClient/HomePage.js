import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import OurDoctors from "./Section/OurDoctors";
// import AboutUs from "./Section/AboutUs";
import HomeFooter from "./HomeFooter";
class HomePage extends Component {
  render() {
    return (
      <>
        <div>
          <HomeHeader />
          <OurDoctors />
          <HomeFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
