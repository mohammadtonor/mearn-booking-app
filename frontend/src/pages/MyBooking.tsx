import { useQuery } from 'react-query';
import * as apiClient from '../api-client';

const MyBooking = () => {
    const {data: hotels} = useQuery(
        "fetchMyBookings",
        apiClient.fetchMyBookings
    )    
    
    if(!hotels || hotels.length === 0) {
        return <span>No Booking found</span>
    }

    return (
        <div className='space-y-5'>
            <h1 className='text-3xl font-bold'>My Booking</h1>
            {hotels.map((hotel) => (
                <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] border rounded-lg p-8 gap-5 border-r-slate-300'>
                    <div className='lg:w-full lg:h-[25-px]'>
                        <img src={hotel.imageUrls[0]} className='h-full w-full object-contain object-center'/>
                    </div>
                    <div className='flex flex-col gap-4 overflow-y-auto max-h-[300px] '>
                        <div className='text-xl font-bold'>
                            {hotel.name}
                            <div className='text-xs font-normal'>
                                {hotel.city}. {hotel.country}
                            </div>
                        </div>
                    {hotel.bookings.map(booking => (
                        <div>
                            <div>
                                <span className='font-bold mr-2'>Dates: </span>
                                <span className=' gap-2'>
                                    {new Date(booking.checkIn).toDateString()}  {" to  "}
                                    {new Date(booking.checkOut).toDateString()}
                                </span>
                            </div>
                            <div>
                                <span className='font-bold mr-2'>Guests:</span>
                                <span >
                                    {booking.adultCount} adults, {booking.childCount} children
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            ))}
        </div>
    )
}

export default MyBooking;