import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showTast } = useAppContext();  
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    register,
    formState: { errors },
    handleSubmit,
} = useForm<SignInFormData>();
  
  const mutation = useMutation(apiClient.SignIn, {
    onSuccess: async () => {
        showTast({ message: "Sign in Successful!", type: "SUCCESS" });
        await queryClient.invalidateQueries('validateToken');
        navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
        showTast({ message: error.message, type: "ERROR"})
    }
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  })

  return (
    <form className="flex flex-col gap-5 max-w-3xl mx-auto" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Sign In</h2>
        <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    type="email" 
                    className="border rounded w-full py-1 px-2 font-bold"
                    {...register("email", {required: "This fiels is required!", })}
                />
                {errors.email && (
                    <span className="text-rose-600">{errors.email.message}</span>
                )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    type="password" 
                    className="border rounded w-full py-1 px-2 font-bold"
                    {...register("password", {required: "This fiels is required!", minLength: {
                        message: "Password must be least 6 character!",
                        value: 6,
                    }})}
                />
                {errors.password && (
                    <span className="text-rose-600">{errors.password.message}</span>
                )}
        </label>
        <span className="flex items-center justify-between">
            <span className="text-sm">
                No Registered? <Link to='/register'>Create an account here</Link>
            </span>
            <button
                type="submit"
                className="bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-500">
                Login
            </button>
        </span>
    </form>
  )
}

export default SignIn