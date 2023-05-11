import { useRouter } from "next/router";
// import { getAllEvents } from "../../dummy-data";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage(props) {
  const router = useRouter();

  function onSearchHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  // const allEvents = getAllEvents();
const { allEvents } = props;

  return (
    <>
      <EventsSearch onSearch={onSearchHandler} />
      <EventList events={allEvents} />
    </>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      allEvents: allEvents
    },
    revalidate: 600
  };
}

export default AllEventsPage;
