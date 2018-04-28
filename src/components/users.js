import React, { Component } from "react";
import AppStore from "../stores/appstore.js";
import AppActions from "../actions/appactions.js";
import User from "./user.js";
import Paginator from "./paginator.js";

class Users extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    //console.log(AppStore);
    this.unsubscribe = AppStore.listen(state =>
      this.setState({ AppState: state })
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  handleSearch() {
    let value = this.refs.searchText.value;
    //console.log(value);
    //console.log(AppActions);
    AppActions.getUsersByName(value);
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  getHeader() {
    return (
      <div className="row" style={{ backgroundColor: "blue", padding: 15 }}>
        <div className="col-xs">
          <div className="box">
            <input
              className="form-control"
              placeholder="Search by name..."
              type="text"
              ref="searchText"
            />
          </div>
        </div>
        <div className="col-xs start-xs">
          <div className="box">
            <button className="btn btn-secondary" onClick={this.handleSearch}>
              search
            </button>
          </div>
        </div>
      </div>
    );
  }
  handleJumpTo(obj) {
    AppActions.jumpTo(obj.value);
  }
  render() {
    let users = this.state.AppState && this.state.AppState.get("users"),
      currentPage =
        this.state.AppState && this.state.AppState.get("currentPage"),
      totalPage = this.state.AppState && this.state.AppState.get("totalPage"),
      userDetails =
        this.state.AppState && this.state.AppState.get("userDetails"),
      totalUsers = users && users.size;
    return (
      <div>
        {this.getHeader()}
        <div className="row center-xs">
          <div className="col-xs-8">
            <div
              className="start-xs"
              style={{ marginTop: 10, fontSize: "90%" }}
            >
              {users
                ? (!totalUsers && "No result found!") ||
                  `${totalUsers} ${
                    totalUsers == 1 ? "result" : "results"
                  } found`
                : ""}
            </div>
            {users &&
              users
                .map((user, id) => {
                  return (
                    <div key={id} style={{ textAlign: "center" }}>
                      <User
                        user={user}
                        details={userDetails.get(user.get("login"))}
                      />
                    </div>
                  );
                })
                .toArray()}
            <Paginator
              currentPage={currentPage}
              totalPage={totalPage}
              jumpTo={this.handleJumpTo}
              onNext={AppActions.next}
              onPrev={AppActions.prev}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
