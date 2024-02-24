import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { TbTrash } from "react-icons/tb";

const ImagesSection = () => {
    const { 
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    const existingImageUrls = watch("imageUrls");

    const handleDelete = (
          event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
         imageUrl: string
    ) => {
        event.preventDefault();
        setValue("imageUrls", existingImageUrls.filter((url) => url 
        !== imageUrl))
    }

    return (
        <div className="max-w-3xl mx-auto w-full">
            <div>
                <h2 className="text-2xl font-bold-3 ">Images</h2>
                <div className="border rounded flex flex-col ml-0 gap-2">
                    {existingImageUrls && (
                        <div className="grid grid-cols-5 gap-6">
                            {existingImageUrls.map((url) => (
                                <div className="relative group">
                                    <img src={url} alt="image" className="min-h-full object-cover"/>
                                    <button
                                        onClick={(event) => handleDelete(event, url)} 
                                        className="absolute inset-0 flex items-center justify-center bg-black mx-auto  bg-opacity-50 opacity-0 group-hover:opacity-100">
                                        <TbTrash className="text-white/70 w-6 h-6 hover:text-white"/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
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