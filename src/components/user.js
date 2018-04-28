import React, { Component } from "react";
import AppActions from "../actions/appactions.js";
import { Collapse } from "react-collapse";

class Users extends Component {
  constructor() {
    super();
    this.state = { open: false };
    this.handleSearch = this.handleSearch.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
  }
  handleSearch() {
    let value = this.refs.searchText.value;
    //console.log(value);
    //console.log(AppActions);
    AppActions.getUsersByName(value);
  }
  toggleDetails() {
    let { open } = this.state;
    if (!open) {
      let { user } = this.props,
        name = user.get("login");
      AppActions.getUserDetails(name);
    }
    this.setState({ open: !open });
  }
  render() {
    let { user, details } = this.props,
      id = user.get("id"),
      name = user.get("login"),
      imageURL = user.get("avatar_url"),
      profileURL = user.get("html_url");
    return (
      <div className="row center-xs">
        <div
          className="col-xs-12 start-xs"
          style={{ backgroundColor: "white", margin: 10 }}
        >
          <div className="row">
            <div className="">
              <div className="box">
                <img
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    margin: 10
                  }}
                  src={imageURL}
                />
              </div>
            </div>
            <div className="col-xs">
              <div className="box">
                <div style={{ fontSize: "110%" }}>{name}</div>
                <div
                  style={{ fontSize: "90%" }}
                >{`Profile URL: ${profileURL}`}</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right", margin: 10 }}>
            <button className="btn btn-primary" onClick={this.toggleDetails}>
              {this.state.open && details ? "collapse" : "details"}
            </button>
          </div>
          <Collapse isOpened={this.state.open && !!details}>
            <div style={{ fontSize: "80%" }}>
              {details &&
                details.map(detail => {
                  return (
                    <div className="row">
                      <div className="col-xs">
                        <div className="box">Full name</div>
                      </div>
                      <div className="col-xs">
                        <div className="box">{detail.full_name}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default Users;
