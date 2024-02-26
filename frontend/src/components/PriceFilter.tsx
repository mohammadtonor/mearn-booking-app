type Props = {
    selectedPrice?: number;
    onChange: (value?: number) => void
}

const PriceFilter = ({ selectedPrice, onChange}: Props) => {
    return (
        <div  className="">
            <h4 className="text-md font-semibold mb-2">Max Price</h4>
            <select
                className="p-2 border rounded-md w-full"
                value={selectedPrice} 
                onChange={(event) => onChange(event.target.value ? parseInt(event.target.value): undefined)}
            >
                <option value="">Select Max Price</option>
                {[50, 100, 200, 300, 500].map((value) => (
                    <option value={value}>{value}</option>
                ))}
            </select>
        </div>
    )
}

export default PriceFilter;