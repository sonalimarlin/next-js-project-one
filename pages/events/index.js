import { useRouter } from "next/router";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage() {
  const router = useRouter();

  function onSearchHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  const allEvents = getAllEvents();

  return (
    <>
      <EventsSearch onSearch={onSearchHandler} />
      <EventList events={allEvents} />
    </>
  );
}

export default AllEventsPage;
