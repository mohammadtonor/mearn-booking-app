import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

const GuestSection = () => {
    const { register, formState: { errors }} = useFormContext<HotelFormData>();

    return (
        <div className=" p-2">
            <h2 className="text-2xl font-bold mb-3 mx-auto max-w-3xl">Guests</h2>
            <div className="flex items-center gap-2 mx-auto max-w-3xl p-2 bg-gray-300">        
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Adults
                    <input
                        {...register("adultCount", { required: "This fiels is required!" })}
                        type="number"
                        placeholder="Enter number of adults"
                        className="border rounded w-full py-2 px-3 "
                        />
                        {errors.adultCount && (
                            <span className="text-rose-600 font-bold text-sm">{errors.adultCount.message}</span>
                        )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Children
                    <input
                        {...register("childCount", { required: "This fiels is required!" })}
                        type="number"
                        placeholder="Enter number of children"
                        className="border rounded w-full py-2 px-3 "
                        />
                        {errors.childCount&& (
                            <span className="text-rose-600 font-bold text-sm">{errors.childCount.message}</span>
                         )}
                </label>
            </div>
        </div>
    )
}

export default GuestSection;