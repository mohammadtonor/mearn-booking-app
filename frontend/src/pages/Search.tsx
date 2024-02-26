import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypeFilter from "../components/HotelTypeFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
 
 const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelType, setSelectedHotelType] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectesPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page:  page.toString(),
        stars: selectedStars,
        types: selectedHotelType,
        facilities: selectedFacilities,
        maxPrice: selectesPrice?.toString(),
        sortOptions: sortOption,
    }

    const { data: hotelData } = useQuery(["searchParams", searchParams], () =>  apiClient.searchHotels(searchParams))    

    const handleStarsChang = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;

        setSelectedStars((prevStars) => 
            event.target.checked 
              ? [...prevStars, starRating]
              : prevStars.filter((star) => star !== starRating)
        )
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const types = event.target.value;

        setSelectedHotelType((prevStars) => 
            event.target.checked 
              ? [...prevStars, types]
              : prevStars.filter((star) => star !== types)
        )
    }

    const handleFacilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const facility = event.target.value;

        setSelectedFacilities((prevStars) => 
            event.target.checked 
              ? [...prevStars, facility]
              : prevStars.filter((star) => star !== facility)
        )
    }

    return (
     <div className="grid min-w- grid-cols-1 w-full lg:grid-cols-[250px_1fr] gap-5">
        <div className="rounded-lg border border-slate-300 p-5 h-fit sticky">
            <div className="space-y-5">
                <h3 className="text-lg font-semibold bordr-b border-slate-300">
                    Filter By
                </h3>
                <StarRatingFilter
                    selectedStars={selectedStars} 
                    onChange={handleStarsChang}
                />
                <HotelTypeFilter selectedHotelType={selectedHotelType} onChange={handleTypeChange}/>
                <FacilitiesFilter SelectedFacilities={selectedFacilities} onChange={handleFacilitiesChange}/>
                <PriceFilter selectedPrice={selectesPrice} onChange={(value?: number) => setSelectedPrice(value)}/>
            </div>
        </div>
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <span className="text-xl font-bold">
                    {hotelData?.pagination.total} Hotels Found
                    {search.destination ? ` in ${search.destination}` : ""}
                </span>
                <select 
                    className="p-2 w-1/3"
                    value={sortOption} 
                    onChange={(event) => setSortOption(event.target.value)}>
                    <option value="starRating">Star Rating</option>
                    <option value="pricePerNightAsc">Price per Night(low)</option>
                    <option value="pricePerNightDesc">Price per Night(hight)</option>
                </select>
            </div>
            {hotelData?.data.map((hotel) => (
                <SearchResultCard key={hotel._id} hotel={hotel}/>
            ))}
            <div>
                <Pagination 
                    page={hotelData?.pagination.page || 1}
                    pages={hotelData?.pagination.pages || 1} 
                    onChangePage={(page) => setPage(page)}
                />
            </div>
        </div>
     </div>
   )
 }
 
 export default Search 