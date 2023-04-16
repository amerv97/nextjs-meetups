import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/e/e3/Sarajevo_City_Panorama.JPG",
//     address: "Branilaca Sarajeva, Sarajevo, 71000",
//     description: "This is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://thumbs.dreamstime.com/z/tuzla-bosnia-herzegowina-aerial-view-downtown-sunset-city-photographed-drone-traffic-objects-landscape-old-balkan-184133576.jpg",
//     address: "Stupine bb, Tuzla, 75000",
//     description: "This is a second meetup",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://amer_varajic97:Hiperinflacija77@cluster0.dwx1mwn.mongodb.net/test"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        const { title, address, image } = meetup.data;
        return {
          title,
          address,
          image,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1,
  };
}

export default HomePage;
