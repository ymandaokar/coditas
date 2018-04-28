import React, { Component } from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

class Paginator extends Component {
  constructor() {
    super();
  }
  getDropdown(totalPage, currentPage) {
    let options = [];
    for (let i = 1; i <= totalPage; i++) {
      options.push({ value: i, label: `${i}` });
    }
    return (
      <Select
        name="form-field-name"
        value={currentPage}
        onChange={this.props.jumpTo}
        options={options}
        clearable={false}
        searchable={false}
      />
    );
  }
  render() {
    let { currentPage, totalPage } = this.props;
    return (
      <div className="row center-xs" style={{ marginBottom: 20 }}>
        <div className="col-xs-12 start-xs">
          <div className="row">
            <div className="col-xs start-xs">
              <div className="box">
                {totalPage &&
                  currentPage != 1 && (
                    <button
                      className="btn btn-success"
                      onClick={this.props.onPrev}
                    >
                      Previous
                    </button>
                  )}
              </div>
            </div>
            <div className="col-xs center-xs">
              <div className="box">
                {totalPage && this.getDropdown(totalPage, currentPage)}
              </div>
            </div>
            <div className="col-xs end-xs">
              <div className="box">
                {totalPage &&
                  currentPage != totalPage && (
                    <button
                      className="btn btn-success"
                      onClick={this.props.onNext}
                    >
                      Next
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Paginator;
