import { sanityClient, urlFor } from "../../sanity"
import { isMultiple } from "../../utils"
import Image from "../../components/Image"
import Review from "../../components/Review"
import Map from "../../components/Map"
import Link from "next/link"

const Car = ({ 
    title,
    location,
    carType,
    mainImage,
    images,
    pricePerHour,
    description,
    make,
    model,
    year,
    color,
    fuelType,
    mileage,
    host,
    reviews,
 }) => {

    const reviewAmount = reviews.length

    return (
        <div className="container">
            <h1><b>{title}</b></h1>
            <p>{reviewAmount} review{isMultiple(reviewAmount)}</p>
            <div className="images-section">
                <Image identifier="main-image" image={mainImage}/>
                <div className="sub-images-section">
                    {images.map(({_key, asset}, image) => <Image identifier="image" image = {asset} />)}
                </div>
            </div>

            <div className="section">
                <div className="information">
                    <h2><b>{carType} hostd by {host?.name}</b></h2>
                    <h4>{year} {make} {model}</h4>
                    <hr />
                    <h4><b>Enhanced Clean</b></h4>
                    <p>This host is comitted to Carchangers' 5-step enahnced cleaning process</p>
                    <h4><b>description2</b></h4>
                    <p>description text2</p>
                    <h4><b>description3</b></h4>
                    <p>description text3</p>
                </div>
                <div className="price-box">
                    <h2>${pricePerHour}</h2>
                    <h4>{reviewAmount} review{isMultiple(reviewAmount)}</h4>
                    <Link href="/"><div className="button">Change Dates</div></Link>
                </div>
            </div>

            <hr />
        
            <h4>{description}</h4>

            <hr />

            <h2>{reviewAmount} review{isMultiple(reviewAmount)}</h2>
            {reviewAmount > 0 && reviews.map((review) => <Review key={review._key} review={review}/>)}

            <hr />

            <h2>Location</h2>
            <Map location={location}></Map>
        </div>
    )
}

export const getServerSideProps = async (pageContext) => {
    const pageSlug = pageContext.query.slug
    
    const query = `*[ _type == "car" && slug.current == $pageSlug][0]{
        title,
        location,
        carType,
        mainImage,
        images,
        pricePerHour,
        description,
        make,
        model,
        year,
        color,
        fuelType,
        mileage,
        host->{
            _id,
            name,
            slug,
            image
        },
        reviews[]{
            ...,
            renter->{
                _id,
                name,
                slug,
                image
            }
        }
    }`

    const car = await sanityClient.fetch(query, { pageSlug })

    if (!car) {
        return {
            props: null,
            notFound: true
        }
    } else {
        return {
            props: {        
                title: car.title,
                location: car.location,
                carType: car.carType,
                mainImage: car.mainImage,
                images: car.images,
                pricePerHour: car.pricePerHour,
                description: car.description,
                make: car.make,
                model: car.model,
                year: car.year,
                color: car.color,
                fuelType: car.fuelType,
                mileage: car.mileage,
                host: car.host,
                reviews: car.reviews
            }
        }
    }
}

export default Car