import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signInUser, addFavorites } from "../actions/index";
import PropTypes from "prop-types";
import "../styles/Header.scss";

export const Header = class extends Component {
  clearUserData = () => {
    this.props.signInUser(0, "")
    this.props.addFavorites([]);
  };

  render() {
    const { activeUser } = this.props
    const toggleBtn = activeUser.id ? true : false
    const userTitle = `Welcome Back ${activeUser.name}!`
    const noUserTitle = 'Movie Tracker'
    return (
      <div>
        <h2>{activeUser.id ? userTitle : noUserTitle}</h2>
        <Link to="/login"><button disabled={toggleBtn}>User Sign In</button></Link>
        <Link to="/login">
          <button disabled={!toggleBtn} onClick={this.clearUserData}>Sign Out?</button>
        </Link>
      </div>
    );
  }
};

Header.propTypes = {
  activeUser: PropTypes.object
};

export const mapStateToProps = state => ({
  activeUser: state.activeUser
});

export const mapDispatchtoProps = dispatch => ({
  signInUser: (id, name) => dispatch(signInUser(id, name)),
  addFavorites: movies => dispatch(addFavorites(movies))
});

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Header);