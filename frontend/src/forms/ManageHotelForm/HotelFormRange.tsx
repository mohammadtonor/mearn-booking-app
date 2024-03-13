import { useForm } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import DatePicker from "react-datepicker"
import { Dispatch, SetStateAction, useEffect } from "react";
import { HotelPriceRange } from "../../../../backend/src/shared/type";
import { FaTrash } from "react-icons/fa";

type Props = {
    hotelPrices: HotelPriceRange[];
    setHotelPrices: Dispatch<SetStateAction<HotelPriceRange[]>>;
}

const HotelFormRange = ({hotelPrices, setHotelPrices}: Props) => {
  const { setValue } = useForm<HotelFormData>();

useEffect(() => {
  setValue('hotelPriceRange', hotelPrices)

  
}, [hotelPrices])


const addPrice = () => {
    setHotelPrices((prevState) => (
        [
            ...prevState,
            {checkIn: new Date() , checkOut: new Date(), price: 0}
        ]
        ))
}
    
const editPrice = (index: number, value: any, prop: string) => {
    setHotelPrices((prevState) => {
        return prevState.map((item, i) => {
            if (i === index) {
                return {...item, [prop]: value}
            }
            return item
        })
    });
    
    setValue('hotelPriceRange', hotelPrices);
}

const onRmovePrice = (index: number) => {
    // delete item from hotelPrices
    setHotelPrices((prevState) => {
        return prevState.filter((_, i) => i !== index)
    });
    
    setValue('hotelPriceRange', hotelPrices);
}


const minDate = new Date();
const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="flex flex-col gap-2 mx-auto max-w-6xl  border-2 p-3 rounded-lg ">
        <div className="flex items-center justify-between mb-2 flex-1 gap-4">
            <h2 className="font-semibold flex-1 text-xl ">Hote Range Price</h2>
            <button className="rounded-lg text-white text-md  bg-blue-700 p-3" type="button" onClick={addPrice}>
                Add rangePrice
            </button>
            
        </div>
        {hotelPrices.map((priceRange, index) => (
            <div key={`range-${index}`} className="flex items-center border p-2 gap-2">
                <div className="w-1/3">
                 <DatePicker
                    selected={priceRange.checkIn} 
                    onChange={(data) => editPrice(index, data , 'checkIn' )}
                    selectsStart
                    startDate={priceRange.checkIn}
                    endDate={priceRange.checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check in Date"
                    className=" bg-white p-2 w-full focus:outline-none border"
                    wrapperClassName=""
                />
                </div>
                <div className="w-1/3">
                    <DatePicker
                    selected={priceRange.checkOut} 
                    onChange={(data) => editPrice(index, data, 'checkOut' )}
                    selectsStart
                    startDate={priceRange.checkIn}
                    endDate={priceRange.checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check in Date"
                    className=" bg-white p-2 w-full focus:outline-none"
                    wrapperClassName=""
                    />
                </div>
                <label className="text-gray-700 w-1/3 text-sm font-bold max-w-[50%]">  
                    <input
                        type="number" 
                        min={1}
                        value={priceRange.price}
                        className="border rounded w-full py-2 px-2 font-bold"
                        onChange={(e) => editPrice(index, e.target.value , 'price' )}
                    />
              </label>
              <button type="button" onClick={() => onRmovePrice(index)}>
                <FaTrash className="text-red-600 ml-1"/>
              </button>
            </div>
        ))}
        
    </div>
        
  )
}

export default HotelFormRange