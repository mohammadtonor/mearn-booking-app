import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>()

    return (
        <div className="w-full">   
            <h2 className="text-2xl font-bold mb-3 mx-auto max-w-3xl">Facilities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-3xl">
                {hotelFacilities.map((facility) => (
                    <label className="text-sm flex gap-1 text-gray-500">
                        <input 
                            type="checkbox" 
                            value={facility} 
                            {...register("facilities", {
                                validate: (facilities) => {
                                    if (facilities && facilities.length > 0) {
                                        return true;
                                    } else {
                                        return "At least one facility is required";
                                    }
                                } 
                            })}
                        />
                        {facility}
                    </label>
                ))}
            </div>
            {errors.facilities && (
                <span className="text-red-500 font-bold text-sm">{errors.facilities.message}</span>
            )}
        </div>
    )
}

export default FacilitiesSection;