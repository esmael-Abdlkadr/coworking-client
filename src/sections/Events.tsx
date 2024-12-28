import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import Button from "../components/ui/Button";
import { useGetAllEvents } from "../hooks/services";
import { capitalizeTitle } from "../utils/capitalize";

function Events() {
  const { data, isLoading, isError } = useGetAllEvents();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading events</div>;

  interface Event {
    id: string;
    images: string[];
    category: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
  }

  const eventsToShow = (data as { events: Event[] }).events.slice(0, 3);

  return (
    <section className="w-full bg-black/90 py-16">
      <div className="px-6 md:px-12 lg:px-20 flex flex-col gap-12">
        {/* Section Header */}
        <h2 className="uppercase text-3xl text-white/80 tracking-[5px] text-center lg:text-left">
          Upcoming Events
        </h2>

        {/* Section Title and Button */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <h2 className="text-4xl lg:text-5xl font-semibold text-white/90 text-center lg:text-left leading-snug">
            {capitalizeTitle("upcoming events to")}{" "}
            <span className="text-primary-100">
              {capitalizeTitle("connect, learn, and grow")}
            </span>
          </h2>
          <Button title="View All Events" onClick={() => navigate("/events")} />
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 gap-10">
          {eventsToShow.map((event) => (
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;
