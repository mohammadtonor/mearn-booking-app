import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/type";

type Props = {
    hotel: HotelType;
}

const LatestDestinationCard = ({hotel}: Props) => {
    return (
        <Link 
            to={`/detail/${hotel._id}`}
            className="relative cursor-pointer overflow-hidden rounded-md"    
        >
            <div className="h-[320px]">
                <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center"/>
            </div>

            <div className="absolute bottom-0 bg-black p-4 bg-opacity-50 w-full">
                <h2 className="text-2xl font-bold text-white">{hotel.name}</h2>
            </div>
       </Link>
    )
}

export default LatestDestinationCard;