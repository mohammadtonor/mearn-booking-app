import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();

    return (
        <div className="mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold ">Add Hotel</h1>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Name
                <input
                    type="text" 
                    className="border rounded w-full py-1 px-2 font-bold"
                    {...register("name", {required: "This fiels is required!", })}
                />
                {errors.name && (
                    <span className="text-rose-600">{errors.name.message}</span>
                )}
            </label>
            <div className="flex gap-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input
                        type="text" 
                        className="border rounded w-full py-1 px-2 font-bold"
                        {...register("city", {required: "This fiels is required!", })}
                    />
                    {errors.city && (
                        <span className="text-rose-600">{errors.city.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input
                        type="text" 
                        className="border rounded w-full py-1 px-2 font-bold"
                        {...register("country", {required: "This fiels is required!", })}
                    />
                    {errors.country && (
                        <span className="text-rose-600">{errors.country.message}</span>
                    )}
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea 
                rows={10}
                    className="border rounded w-full py-1 px-2 font-bold"
                    {...register("description", {required: "This fiels is required!", })}
                />
                {errors.description && (
                    <span className="text-rose-600">{errors.description.message}</span>
                )} 
            </label>
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Price Per Night
                <input
                    type="number" 
                    min={1}
                    className="border rounded w-full py-1 px-2 font-bold"
                    {...register("pricePerNight", {required: "This fiels is required!", })}
                />
                {errors.pricePerNight && (
                    <span className="text-rose-600">{errors.pricePerNight.message}</span>
                )}
            </label>
            
            <label className="text-gray-700 text-sm font-bold flex-1">
                star Rating
                <select 
                    {...register("starRating", { required: "This field is required" })}
                    className="border rounded w-full p-2 text-gray-700 font-normal"
                >
                    <option value="" className="text-sm font-bold">
                        Select as Rating
                    </option>
                    {[1, 2, 3, 4].map((num) => (
                        <option value={num}>{num}</option>
                    ))}
                </select>
                {errors.starRating && (
                    <span className="text-rose-600">{errors.starRating.message}</span>
                )}
            </label>
        </div>
    )
}

export default DetailsSection;