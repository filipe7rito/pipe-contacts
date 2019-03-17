import React, { Component } from 'react';

class Pagination extends Component {
  state = {};
  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={this.getPreviousClass()}>
            <button
              className="page-link"
              aria-label="Previous"
              onClick={() => this.props.onClickPrevious()}
            >
              <span aria-hidden="true">Previous</span>
            </button>
          </li>
          <li className={this.getNextClass()}>
            <button
              className="page-link"
              aria-label="Next"
              onClick={() => this.props.onClickNext()}
            >
              <span aria-hidden="true">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  getNextClass = () => {
    let className = 'page-item';

    return this.props.paginationInfo.more_items_in_collection
      ? className
      : className + ' disabled';
  };

  getPreviousClass = () => {
    let className = 'page-item';

    return this.props.paginationInfo.start > 0
      ? className
      : className + ' disabled';
  };
}

export default Pagination;
