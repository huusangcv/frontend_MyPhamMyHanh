import ReactPaginate from 'react-paginate';
import './Pagination.scss';
const Pagination = ({
  handlePageClick,
  totalPages,
  page,
}: {
  handlePageClick: any;
  totalPages: number;
  page: number;
}) => {
  return (
    <div className="paginate">
      <ReactPaginate
        nextLabel="Trang kế"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="Trang trước"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page - 1}
      />
    </div>
  );
};

export default Pagination;
