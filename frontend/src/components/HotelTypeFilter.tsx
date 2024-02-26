import { hotelType } from "../config/hotel-options-config";

type Props = {
    selectedHotelType: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HotelTypeFilter = ({selectedHotelType , onChange}: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5">
             <h3 className="text-md font-semibold mb-2">Hotel Type</h3>
             {hotelType.map((type) => (
                <label className="flex items-center space-x-2">
                    <input 
                        type="checkbox"
                        className="rounded"
                        value={type}
                        onChange={onChange}
                        checked={selectedHotelType.includes(type)}
                    />
                    <span>{type}</span>
                </label>
             ))}
        </div>
    )
}

export default HotelTypeFilter;