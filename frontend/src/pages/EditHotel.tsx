import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from "./../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { showTast } = useAppContext();
  const { hotelId } = useParams();
  
  const { data: hotel } = useQuery(
    "fetchMyHotelById", 
    () => apiClient.fetchMyHotelById(hotelId || ''),
    {
      enabled: !!hotelId
    }
  );
  
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById , {
    onSuccess: () => {
      showTast({message: "Hotel Updated!", type: "SUCCESS"});
    },
    onError: () => {
      showTast({message: "Error Saving Hotel", type: "ERROR"});
    },
  })

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  }
  console.log(hotel);
  
  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
  )
}

export default EditHotel