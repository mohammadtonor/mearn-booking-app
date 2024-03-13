import { useQuery } from 'react-query';
import *  as apiClient from '../api-client';
import BookingForm from '../forms/BookingForm/BookingForm';
import { useSearchContext } from '../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookingDetailSumary from '../components/BookingDetailSummary';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext';

const Booking  = () => {
    const { stripePromise } = useAppContext();
    const search = useSearchContext();
    const { hotelId } = useParams();
    const [numberOfNight , setNumberOfNight] = useState<number>(0) 
    const [totlaPrice, setTotlaPrice] = useState<number>(0)
    
    const { data: hotel } = useQuery(
        "fetchHotelById",
        () => apiClient.fetchHotelById(hotelId as string),
        {
            enabled: !!hotelId    
        }
    );

    const calculatePrice = () => {
        const end = new Date(search.checkOut.getTime());
        const start = new Date(search.checkIn.getTime());
        const date = new Date(start.getTime());
        
        let prices = [];
        while(date < end) {
             prices.push((hotel?.hotelPriceRange
                .find(price => 
                    (
                        new Date(price.checkIn) < date && date < new Date(price.checkOut) 
                        || date.getDate() === new Date(price.checkOut).getDate() 
                    )
                )
                ?.price)
            );
                date.setDate(date.getDate() + 1);                
        }
        return prices;
    }

    useEffect(() => {
        const total =  calculatePrice().reduce((price: number, acc: any) => {
            return price + acc;
        }, 0)
        setTotlaPrice(total);
    }, [])

    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights = Math.abs((search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24)
            );
            
             setNumberOfNight(Math.ceil(nights));
        }
    }, [search.checkIn, search.checkOut ]);
        

    const { data: paymentIntentData } = useQuery("createPaymentIntent", () => 
        apiClient.createPaymentIntent(hotelId as string, totlaPrice.toString()),
        {
            enabled: !!hotelId && numberOfNight > 0
        }
    )    
    


    const { data: currentUser } = useQuery(
        "fetchCurrentUser", apiClient.fetchCurrentUser
    );    

    if(!hotel) {
        return <></>
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2'>
            <BookingDetailSumary 
                checkIn={search.checkIn}
                checkOut={search.checkOut}
                adultCount={search.adultCount}
                childCount={search.childCount}
                numberOfNight={numberOfNight}
                hotel={hotel}
            />
            {currentUser && paymentIntentData && ( 
                <Elements stripe={stripePromise} options={{
                    clientSecret: paymentIntentData.clientSecret
                }}>
                    <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/>
                </Elements>
            )}
        </div>
    )
}

export default Booking;