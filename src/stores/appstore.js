import Reflux from "reflux-core";
import AppActions from "../actions/appactions.js";
import Immutable from "immutable";
import axios from "axios";

const AppStore = Reflux.createStore({
  listenables: [AppActions],
  _users: Immutable.Map(),
  _limit: 5,
  init() {
    this.state = Immutable.Map({
      users: Immutable.Map(),
      userDetails: Immutable.Map(),
      currentPage: 0,
      totalPage: 0
    });
  },
  updateState(newState, suppress) {
    this.state = newState;
    if (!suppress) {
      this.trigger(this.state);
    }
  },
  getUsersByName(name) {
    if (!name) {
      return;
    }
    if (this._key == name) {
      return;
    }
    this._key = name;
    return axios({
      method: "get",
      url: "https://api.github.com/search/users",
      params: { q: name }
    })
      .then(response => {
        let { data } = response;
        data.items.forEach(item => {
          this._users = this._users.set(item.id, Immutable.Map(item));
        });
        this.updateState(
          this.state
            .set("currentPage", 1)
            .set("totalPage", Math.floor(this._users.size / this._limit))
        );
        this.updateUsers();
      })
      .catch(err => {
        console.error(err);
      });
  },
  next() {
    let currentPage = this.state.get("currentPage"),
      totalPage = this.state.get("totalPage");
    this.updateState(
      this.state.set("currentPage", Math.min(currentPage + 1, totalPage)),
      true
    );
    this.updateUsers();
  },
  prev() {
    let currentPage = this.state.get("currentPage");
    this.updateState(
      this.state.set("currentPage", Math.max(currentPage - 1, 0)),
      true
    );
    this.updateUsers();
  },
  jumpTo(pageNo) {
    if (!pageNo) {
      return;
    }
    this.updateState(this.state.set("currentPage", pageNo), true);
    this.updateUsers();
  },
  updateUsers() {
    let currentPage = this.state.get("currentPage");
    let users = this._users
      .skip(Math.floor((currentPage - 1) * this._limit))
      .take(this._limit);
    this.updateState(this.state.set("users", users));
  },

  getUserDetails(id) {
    if (!id) {
      return;
    }
    if (this.state.hasIn([["userDetails", id]])) {
      return;
    }
    return axios({
      method: "get",
      url: `https://api.github.com/users/${id}/repos`
    })
      .then(response => {
        let { data } = response;
        this.updateState(this.state.setIn(["userDetails", id], data));
      })
      .catch(err => {
        console.error(err);
      });
  }
});

export default AppStore;
