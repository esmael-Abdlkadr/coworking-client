import { useState } from "react";
import EventCard from "../components/EventCard";
import PageDisplayer from "../components/PageDisplayer";
import { useGetAllEvents } from "../hooks/services";
import { capitalizeTitle } from "../utils/capitalize";
import React from "react";

function Events() {
  const { data } = useGetAllEvents() as {
    data: {
      events: Array<{
        id: string;
        images: string[];
        category: string;
        title: string;
        description: string;
        date: string;
        time: string;
        location: string;
      }>;
    };
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const eventsToShow = data?.events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(data?.events?.length / itemsPerPage);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <PageDisplayer />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {/* Header */}
        <div className="flex flex-col items-center gap-8 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-center">
            {capitalizeTitle("Discover")}{" "}
            <span className="text-primary-100">
              {capitalizeTitle("amazing events")}
            </span>
          </h1>
          <p className="text-gray-400 text-lg text-center max-w-3xl">
            Explore a curated list of upcoming events tailored to help you
            connect, learn, and grow.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1  gap-10">
          {eventsToShow?.map((event) => (
            <EventCard
              eventId={event.id}
              key={event.id}
              img={event.images[0]}
              eventCategory={event.category}
              eventName={event.title}
              eventDescription={event.description}
              eventDate={new Date(event.date).toLocaleDateString()}
              eventTime={event.time}
              eventLocation={event.location}
              isOnPage={true}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <ul className="flex items-center gap-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`cursor-pointer px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-primary-100 text-black font-bold"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Events;
