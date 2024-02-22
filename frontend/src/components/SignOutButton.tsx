import { useMutation, useQueryClient } from "react-query"
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showTast } = useAppContext();
    const navigate = useNavigate();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries('validateToken')
            showTast({ message: "Sign Out successful!", type: "SUCCESS" });
            navigate('/');
        },
        onError: (error: Error) => {
            showTast({ message: error.message, type: "ERROR" });
        }
   });

   const handleClick = () => {
    console.log("click");
    
     mutation.mutate();
   }
  return (
    <button onClick={handleClick} className="text-blue-600 px-3 bg-white font-bold hover:bg-gray-100 rounded-md">Sign Out</button>
  )
}

export default SignOutButton