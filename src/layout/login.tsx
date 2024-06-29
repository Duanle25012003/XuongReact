import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginProvider";

interface Form {
    email: string;
    password: string;
}

function Login() {
    const { dispatchLogin } = useContext(LoginContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>();

    const submit = async (data: Form) => {
        try {
            const response = await fetch(`http://localhost:3000/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const message = await response.json();
                throw new Error(message);
            }

            const resData = await response.json();

            if (resData.accessToken) {
                localStorage.setItem("token", resData.accessToken);
                sessionStorage.setItem("user", resData.user.name);
                dispatchLogin({
                    type: "login",
                });
                alert("Đăng nhập thành công");
                navigate("/");
            }
        } catch (err) {
            alert("Lỗi: " + err);
        }
    };

    return (
        <>
            <form className="max-w-sm mx-auto border px-6 py-3 shadow-md" onSubmit={handleSubmit(submit)}>
                <div className="flex justify-center">
                    <h3 className="px-3 py-2 bg-blue-500 text-gray-50 border border-spacing-2 w-32 rounded-lg">Login</h3>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        {...register("email", {
                            required: "Email không được để trống",
                            pattern: {
                                value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                message: "Email không đúng định dạng",
                            },
                        })}
                    />
                    <div className="text-red-500">{errors.email?.message}</div>
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register("password", {
                            required: "Vui lòng nhập password",
                            minLength: {
                                value: 6,
                                message: "Password phải lớn hơn 6 ký tự",
                            },
                        })}
                    />
                    <div className="text-red-500">{errors.password?.message}</div>
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </>
    );
}

export default Login;
