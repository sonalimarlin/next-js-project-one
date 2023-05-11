import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function filteredEventsPage() {
  const [events, setEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;
  const { data, error } = useSWR(
    "https://nextjs-course-project-1bcf2-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setEvents(events);
    }
  }, [data]);

  if (!events) {
    return (
      <div className="center">
        <p>Loading...</p>
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
    monthNum > 12 ||
    error
  ) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>Invalid Filters!</p>
        </ErrorAlert>
        <Button link="/events">Back to All Events</Button>
      </div>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === yearNum &&
      eventDate.getMonth() === monthNum - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>No Events Found for this date!!</p>
        </ErrorAlert>
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
