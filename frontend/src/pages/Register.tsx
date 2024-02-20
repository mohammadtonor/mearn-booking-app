import { useForm } from "react-hook-form";

export type RegisterForm = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const Register = () => {

    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
    

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    })
    return (
        <form className="flex flex-col gap-5 max-w-4xl mx-auto" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create new account</h2>
            <div className="flex flex-col md:flex-row gap-5 ">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input 
                        className="border rounded w-full py-1 px-2 font-bold"
                        {...register("firstName", {required: "This fiels is required!" })}    
                    ></input>
                    {errors.firstName && (
                        <span className="text-rose-600">{errors.firstName.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input 
                        className="border rounded w-full py-1 px-2 font-bold"
                        {...register("lastName", {required: "This fiels is required!" })}
                    ></input>
                    {errors.lastName && (
                        <span className="text-rose-600">{errors.lastName.message}</span>
                    )}
                </label>
            </div>
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
            <label className="text-gray-700 text-sm font-bold flex-1">
                    Confirm Password
                    <input
                        type="password" 
                        className="border rounded w-full py-1 px-2 font-bold"
                        {...register("confirmPassword", {
                            validate: (val) => {
                                if (!val) {
                                    return "This fiels is required"
                                } else if (watch("password") !== val) {
                                    return "Your passwords do not match"
                                }
                            }
                        })}
                    />
                    {errors.confirmPassword && (
                        <span className="text-rose-600">{errors.confirmPassword.message}</span>
                    )}
            </label>
            <span>
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-500">
                    Create Account
                </button>
            </span>
        </form>
    )
}

export default Register;