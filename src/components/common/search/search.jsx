import React from 'react';

const Search = props => {
  return (
    <div>
      <form>
        <div className="form-group row">
          <div className="col-sm-5">
            <input
              onChange={props.onChange}
              className="form-control"
              placeholder="search user"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
