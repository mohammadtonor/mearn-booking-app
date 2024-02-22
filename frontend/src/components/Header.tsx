import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
        <div className="container mx-auto flex justify-between">
            <span className="text-3xl text-white font-bold tracking-tighter">
                <Link to='/'>Mernholydays.com</Link>
            </span>
            <span className="flex space-x-2">
                {isLoggedIn 
                  ? <>
                        <Link className="flex items-center text-blue-600 rounded-md bg-white px-3 font-bold text-sm md:text-md hover:bg-gray-200" to='/my-booking'>
                          My Bookings
                          </Link>
                        <Link className="flex items-center text-blue-600 rounded-md bg-white px-3 font-bold text-sm md:text-md hover:bg-gray-200" to='/my-hotels'>
                          My Hotels
                          </Link>
                        <SignOutButton />
                        
                        
                    </>
                  :  (
                    <Link to="/sign-in" className="flex items-center bg-white rounded-sm text-blue-600 px-3 font-bold hover:bg-gray-100">
                        Sign In
                    </Link>
                )}
            </span>
        </div>
    </div>
  )
}

export default Header