import express, { Request, Response } from "express";
import router from "./users";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/type";

const rputer = express.Router();

router.get("/",verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({
            bookings: { $elemMatch: { userId: req.userId}}
        });

        const result = hotels.map((hotel) => {
            const userBooking = hotel.bookings.filter(
                (booking) => booking.userId === req.userId
            )
            
            const hotelWithUserBookings: HotelType = {
                ...hotel.toObject(),
                bookings: userBooking
            } 

            return hotelWithUserBookings;
        });
        
        res.status(200).send(result);
    } catch (error) { 
        console.log(error);
        res.status(500).json({ message: "Unable to fetch booking"})
    }
})

export default router;