// import { getFeaturedEvents } from "../dummy-data";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
// import { useEffect } from "react";
// import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function HomePage(props) {
  /*
  Was previously fectched from dummy-data file
  const featuredEvents = getFeaturedEvents();
  */

  /* 
  Client-side fetching of data with useEffect
  useEffect(() => {
    console.log('running')
  }, [])
  */

  /* 
  Client-side fetching of data with SWR
  */

  return (
    <>
      <h1 className="center">Featured Events!</h1>
      <EventList events={props.events} />
    </>
  );
}

/*
Static server-side rendering of the page.
*/
export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
  };
}
