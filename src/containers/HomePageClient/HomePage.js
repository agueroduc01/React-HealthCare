import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./Partials/HomeHeader";
import OurDoctors from "./Section/OurDoctors";
import BackgroundMainOverlay from "./Section/BackgroundMainOverlay";
import AboutUs from "./Section/AboutUs";
import LatestNews from "./Section/LatestNews";
import MakeAnAppointment from "./Section/MakeAnAppointment";
import BannerPattern from "./Section/BannerPattern";
import HomeFooter from "./Partials/HomeFooter";
class HomePage extends Component {
  render() {
    return (
      <>
        <div>
          <HomeHeader />
          <BackgroundMainOverlay />
          <AboutUs />
          <OurDoctors />
          <LatestNews />
          <MakeAnAppointment />
          <BannerPattern />
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
