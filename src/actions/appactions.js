import Reflux from "reflux-core";

const AppActions = Reflux.createActions([
  "getUsersByName",
  "getUserDetails",
  "next",
  "prev",
  "jumpTo"
]);

export default AppActions;
