import { useForm } from "react-hook-form";
import { PaynentIntentResponse, UserType } from "../../../../backend/src/shared/type"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "./../../api-client";
import { useAppContext } from "../../contexts/AppContext";

type Props = {
    currentUser: UserType;
    paymentIntent: PaynentIntentResponse;
};

export type BookingFormData = {
    firstName: string;
    lastName: string;
    email: string;
    hotelId: string;
    adultCount: number;
    childCount: number;
    checkIn: string;
    checkOut: string; 
    paymentIntentId: string;
    totalCost: number;
}

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
    const stripe = useStripe();
    const elements = useElements();

    const { hotelId } = useParams()

    const { showTast } = useAppContext();
    const { mutate: bookRoom, isLoading } = useMutation(
        apiClient.createRoomBooking,
        {
          onSuccess: () => {
            showTast({ message: "Booking Saved!", type: "SUCCESS" });
          },
          onError: () => {
            showTast({ message: "Error saving booking", type: "ERROR" });
          },
        }
      );

    const search = useSearchContext();

    const {
        handleSubmit,
        register
    } = useForm<BookingFormData>({
        defaultValues: { 
            email: currentUser.email,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            adultCount: search.adultCount,
            childCount: search.childCount,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            hotelId: hotelId,
            paymentIntentId: paymentIntent.paymentIntentId,
            totalCost: paymentIntent.totalCost
        }
    });

    const onSubmit = async (formData: BookingFormData) => {
        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement) as StripeCardElement
            }
        });

        if(result.paymentIntent?.status === "succeeded") {
            bookRoom({...formData, paymentIntentId: result.paymentIntent.id});
        }
    }
    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-2">
            <span className="text-2xl md:text-3xl font-bold">Confirm Your Detail</span>
            <div className="grid grid-cols-2 gap-6">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input 
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 font-normal bg-gray-200"
                        readOnly
                        disabled
                        type="text"
                        {...register("firstName")}  
                    />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input 
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 font-normal bg-gray-200"
                        readOnly
                        disabled
                        type="text"
                        {...register("lastName")}  
                    />
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input 
                        className="mt-1 border rounded w-full py-2 px-3 text-gray-700 font-normal bg-gray-200"
                        readOnly
                        disabled
                        type="text"
                        {...register("email")}  
                    />
                </label>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Your Price Summary</h2>

                <div className="bg-blue-200 p-4 rounded-md">
                    <div className="font-semibold text-lg">
                        Total Cost: ${paymentIntent.totalCost.toFixed(2)}
                    </div>
                    <div className="text-xs">Incluse taxes and charges</div>
                </div> 
            </div>
            
            <div className="space-y-2">
                <h3 className="text-xl font-semibold">Payment Details</h3>
                <CardElement 
                    id="payment-element"
                    className="border rounded-md p-2 textsm"
                />
            </div>

            <div className="flex justify-end">
                <button
                    disabled={isLoading} 
                    type="submit" 
                    className="bg-blue-600 text-white p-2 font-bold disabled:bg-gray-500 hover:bg-blue-500 text-md">
                    {isLoading ? "Saving..." : "Confirm Booking"}
                </button>
            </div>
        </form>
    )
}

export default BookingForm;