// import { getEventById } from "../../dummy-data";
// import { useRouter } from "next/router";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

function EventDetail(props) {
  // const router = useRouter();
  // const eventid = (router.query.eventid);
  // const eventToDisplay = getEventById(eventid);
  const { eventToDisplay } = props;

  if (!eventToDisplay) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
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

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((event) => ({ params: { eventid: event.id } }));
  return {
    paths: paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps(context) {
  const eventid = context.params.eventid;
  const eventToDisplay = await getEventById(eventid);

  return {
    props: {
      eventToDisplay: eventToDisplay,
    },
    revalidate: 600
  };
}

export default EventDetail;
