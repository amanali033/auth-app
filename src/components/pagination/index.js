import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Box } from '@chakra-ui/react';

const Pagination = ({ totalPages = 15, initialPage = 1, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(initialPage - 1);

  const handlePageClick = (event) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
    onPageChange?.(newPage + 1);
  };

  const arrowLeft = (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      aria-hidden="true"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );

  const arrowRight = (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      aria-hidden="true"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <ReactPaginate
        previousLabel={arrowLeft}
        nextLabel={arrowRight}
        breakLabel="..."
        pageCount={totalPages}
        forcePage={currentPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        disabledClassName="disabled"
      />
    </Box>
  );
};

export default Pagination;
