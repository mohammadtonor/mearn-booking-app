import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const { 
        register,
        formState: { errors },
        watch
    } = useFormContext<HotelFormData>();
    const existingImageUrls = watch("imageUrls");
    return (
        <div className="max-w-3xl mx-auto w-full">
            <div>
                <h2 className="text-2xl font-bold-3 ">Images</h2>
                <div className="border rounded flex flex-col ml-0 gap-2">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                        const totalLength =
                            imageFiles.length + (existingImageUrls?.length || 0);

                        if (totalLength === 0) {
                            return "At least one image should be added";
                        }

                        if (totalLength > 6) {
                            return "Total number of images cannot be more than 6";
                        }

                        return true;
                        },
                    })}
                    />
                </div>
                {errors.imageFiles && (
                    <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
                )}
             </div>
        </div>
    )
}

export default ImagesSection;