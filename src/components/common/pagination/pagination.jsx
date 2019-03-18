import React, { Component } from 'react';

class Pagination extends Component {
  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={this.getPreviousClass()}>
            <button
              className="page-link m-1"
              aria-label="Previous"
              onClick={() =>
                this.props.onClickPrevious(this.handlePaginationPrevious())
              }
            >
              <span aria-hidden="true">Previous</span>
            </button>
          </li>
          <li className={this.getNextClass()}>
            <button
              className="page-link m-1"
              aria-label="Next"
              onClick={() =>
                this.props.onClickNext(this.handlePaginationNext())
              }
            >
              <span aria-hidden="true">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  }

  handlePaginationNext = () => {
    const { next_start: start } = this.props.paginationInfo;

    return start;
  };

  handlePaginationPrevious = () => {
    let { start, limit } = this.props.paginationInfo;

    return (start -= limit);
  };

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
