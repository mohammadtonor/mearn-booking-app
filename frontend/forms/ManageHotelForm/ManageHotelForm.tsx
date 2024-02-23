import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./HotelDetailsSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  typr: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
}

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();

  return (
    <FormProvider {...formMethods}>
      <form>
        <Deta />
      </form>
    </FormProvider>
  )
}

export default ManageHotelForm