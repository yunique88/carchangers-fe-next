import { sanityClient } from "../sanity"
import { urlFor } from "../sanity"
import Link from "next/link"
import { isMultiple } from "../utils"
import DashboardMap from "../components/DashboardMap"

const Home = ({ cars }) => {
  return (
    <>
      {cars && (
        <div className="main">
          <div className="feed-container">
            <h1>Cars near you</h1>
            <div className="feed">
              {cars.map((car) => (
                <Link href={`car/${car.slug.current}`}><div key={car._id} className="card">
                  <img src={urlFor(car.mainImage)}/>
                  <p>{car.reviews.length} review{isMultiple(car.reviews.length)}</p>
                  <h3>{car.title}</h3>
                  <h3>$ {car.pricePerHour}/per Hour</h3>
                </div></Link>
              ))}
            </div>
          </div>
          <div className="map">
                <DashboardMap cars={cars}></DashboardMap>
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "car"]'
  const cars = await sanityClient.fetch(query)
  if (!cars.length) {
    return {
      props: {
        cars: []
      }
    }
  } else {
    return {
      props: {
        cars
      }
    }
  }
}

export default Home
