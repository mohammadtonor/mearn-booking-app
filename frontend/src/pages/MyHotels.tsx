import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from "./../api-client";
import {BsMap} from 'react-icons/bs' 
import { BiBuilding, BiHotel, BiMoney } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    "fetchMyHotels", 
    apiClient.fetchMyHotels,
    {
      onError: () => {}
    }
  );

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      <span className=" flex justify-between gap-2">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link to='/add-hotel' className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500">
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel) => (
          <div key={hotel._id} className="flex flex-col justify-between border p-8 gap-5 border-slate-300 rounded-lg">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="flex flex-wrap lg:justify-center gap-2">
              <div className=" flex border border-slate-300 text-md rounded-md justify-center p-3 md:w-auto gap-2 items-center">
                <BsMap />
                {hotel.city}, {hotel.country}
              </div>
              <div className=" flex border border-slate-300 text-md justify-center rounded-md p-3 md:w-auto gap-2 items-center">
                <BiBuilding />
                {hotel.type}
              </div>
              <div className=" flex border border-slate-300 text-md rounded-md p-3 w-auto gap-2 items-center">
                <BiMoney />
                £{hotel.pricePerNight} per night
              </div>
              <div className=" flex border border-slate-300 text-md rounded-md justify-center p-3  md:w-auto gap-2 items-center">
                <BiHotel />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className=" flex border border-slate-300 text-md rounded-md justify-center p-3  w-auto gap-2 items-center">
                <BsMap />
                {hotel.starRating} star rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link 
                to={`/edit-hotel/${hotel._id}`}
                className="text-white bg-blue-600 hover:bg-blue-500 px-3 py-2 font-bold rounded"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyHotels