import { useState, useEffect } from "react";
import { useGetAllBookings } from "../../hooks/services";
import useAuth from "../../store/useAuth";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

function BookingTable() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [limit, setLimit] = useState(10); // Initialize limit with a default value
  const [sortField, setSortField] = useState("bookingDate");
  const [sortDirection, setSortDirection] = useState("asc");
  const userId = user?.id;
  const navigate = useNavigate();

  interface BookingData {
    bookings: Array<{
      id: number;
      service: { title: string };
      price: number;
      bookingDate: string;
      duration: string;
      status: string;
    }>;
    totalCount: number;
    pages: number;
  }

  const {
    data = { bookings: [], totalCount: 0, pages: 0 },
    isLoading,
    error,
  } = useGetAllBookings({
    page,
    limit,
    status,
    sortField,
    sortDirection,
    userId,
  });

  const bookingData = (data as BookingData).bookings;
  const totalPages = (data as BookingData).pages;
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Handle status filter change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  // Handle sort field change
  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
  };

  // Handle sort direction change
  const handleSortDirectionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortDirection(e.target.value);
  };
  const handleViewDetail = (id: number) => {
    navigate(`/dashboard/booking/${id}`);
  };

  useEffect(() => {
    setPage(1);
  }, [status, sortField, sortDirection]);

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="text-center text-red-500">Error loading bookings</div>
    );

  return (
    <div className="overflow-x-auto w-full">
      <div className="flex items-center gap-6 mb-4">
        {/* Filter by status */}
        <div className="mb-4">
          <label htmlFor="status" className="mr-2">
            Filter by status:
          </label>
          <select
            id="status"
            value={status}
            onChange={handleStatusChange}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Sort by field */}
        <div className="mb-4">
          <label htmlFor="sortField" className="mr-2">
            Sort by:
          </label>
          <select
            id="sortField"
            value={sortField}
            onChange={handleSortFieldChange}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="bookingDate">Booking Date</option>
            <option value="price">Price</option>
          </select>
        </div>

        {/* Sort direction */}
        <div className="mb-4">
          <label htmlFor="sortDirection" className="mr-2">
            Sort direction:
          </label>
          <select
            id="sortDirection"
            value={sortDirection}
            onChange={handleSortDirectionChange}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Table of bookings */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Service Name",
                "Total Price",
                "Booking Date",
                // "Start Time",
                // "End Time",
                "Duration",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-y-200">
            {bookingData?.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking?.service?.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                  {booking.startTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.endTime}
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewDetail(booking.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex  items-center justify-end  gap-8">
        {/* Limit selector */}
        <div className="mt-4">
          <label htmlFor="limit" className="mr-2">
            Show per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => {
              setPage(1);
              setLimit(Number(e.target.value));
            }}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="50">All</option>
          </select>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-200 text-gray-500 rounded"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-500 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingTable;
