import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div>
        <form>
          <div className="form-group row">
            <div className="col-sm-5">
              <input
                onChange={this.props.onChange}
                className="form-control"
                placeholder="search user"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
