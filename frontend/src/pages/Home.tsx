import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import LatestDestinationCard from '../components/LatestDestinationCard';

const Home = () => {
    const {data: hotels} = useQuery("fetchHotels", apiClient.fetchHotels)
    
    const topRowHotels = hotels?.slice(0,2) || [];
    const bottomnHotels = hotels?.slice(2) || [];

    console.log(topRowHotels);
    
    return (
        <div className='space-y-3'>
            <h2 className='text-3xl font-bold'>Latest Destination</h2>
            <p>Most recent destination added by our hosts</p>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-4 '>
                {topRowHotels.map((hotel) => (
                    <LatestDestinationCard hotel={hotel} />
                ))}
            </div>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-4 '>
                {bottomnHotels.map((hotel) => (
                    <LatestDestinationCard hotel={hotel} />
                ))}
            </div>
        </div>
    )
}

export default Home;