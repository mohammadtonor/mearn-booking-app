import { HotelType } from "../../../backend/src/shared/type";

type Props = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    numberOfNight: number;
    hotel: HotelType;
}

const BookingDetailSumary = ({
    checkIn,
    checkOut,
    adultCount,
    childCount,
    numberOfNight,
    hotel
}: Props) => {
    return (
        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
            <h2>Your Booking Details</h2>
            <div className="border-t border-b p-2">
                Location: 
                <div className="font-bold">{` ${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
            </div>

            <div className="flex justify-between items-center">
                <div>
                    Check-in
                    <div className="font-bold">{checkIn.toDateString()}</div>
                </div>
                <div>
                    Check-out
                    <div className="font-bold">{checkOut.toDateString()}</div>
                </div>
            </div>
            <div className="border-t border-b py-2">
                Total lenght of stay
                <div className="font-bold">
                    {numberOfNight}
                </div>
            </div>

            <div>
                Guest <div className="font-bold">{adultCount} Adults & {childCount} Child</div>
            </div>
        </div>
    )
}

export default BookingDetailSumary;