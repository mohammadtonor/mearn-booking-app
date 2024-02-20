
const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
        <div className="container mx-auto flex justify-between items-center">
            <span className="text-3xl text-white font-bold tracking-tighter">
                Mernhokydays.com
            </span>
            <span className="text-white items-center flex-col md:flex-row font-bold tracking-tighter flex gap-2">
            <p className="cursor-pointer text-sm md:text-md">Privacy Policy</p> 
            <p className="cursor-pointer">Term of use</p> 
            </span>
        </div>
    </div>
  )
}

export default Footer