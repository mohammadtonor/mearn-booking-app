import { useMutation } from "react-query";
import * as apiClient from '../api-client';
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext";

const AddHotel = () => {
  const { showTast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showTast({message: "Hotel Saved!", type: "SUCCESS"});
    },
    onError: () => {
      showTast({message: "Error Saving Hotel", type: "ERROR"});
    }
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }
  return (
    <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
  )
}

export default AddHotel