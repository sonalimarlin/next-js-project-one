import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function filteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return (
      <div className="center">
        <p>Still loading events!</p>
        <Button link="/events">Back to All Events</Button>
      </div>
    );
  }

  const filterYear = filterData[0];
  const filterMonth = filterData[1];
  const yearNum = +filterYear;
  const monthNum = +filterMonth;

  if (
    isNaN(yearNum) ||
    isNaN(monthNum) ||
    yearNum > 2030 ||
    monthNum < 1 ||
    monthNum > 12
  ) {
    return (
      <div className="center">
        <ErrorAlert><p>Invalid Filters!</p></ErrorAlert>
        <Button link="/events">Back to All Events</Button>
      </div>
    );
  }

  const filteredEvents = getFilteredEvents({ year: yearNum, month: monthNum });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="center">
        <ErrorAlert><p>No Events Found for this date!!</p></ErrorAlert>
        <Button link="/events">Back to All Events</Button>
      </div>
    );
  }

  const date = new Date(yearNum, monthNum - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
}

export default filteredEventsPage;
