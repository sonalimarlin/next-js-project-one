import { getEventById } from "../../dummy-data";
import { useRouter } from "next/router";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetail(id) {
  const router = useRouter();
  const eventid = (router.query.eventid);

  const eventToDisplay = getEventById(eventid);
  if (!eventToDisplay) {
    return <ErrorAlert><p>No Event Found!</p></ErrorAlert>;
  }

  return (
    <>
      <EventSummary title={eventToDisplay.title} />
      <EventLogistics event={eventToDisplay} />
      <EventContent>
        <p>{eventToDisplay.description}</p>
      </EventContent>
    </>
  );
}

export default EventDetail;
