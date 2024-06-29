import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"

interface Form {
    email: string,
    password: string,
    confirmPass: string
}

function Register(){
    const navigate = useNavigate();
    const{
        register,
        handleSubmit,
        formState: { errors},
        watch
    } = useForm<Form>();

    const submit = (data: Form) =>{
        fetch('http://localhost:3000/register',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                confirmPass: data.confirmPass
            })
        }).then(async(res)=>{
            if(res.ok){
                alert('Đăng kí thành công')
                navigate('/login')
            }else{
                const message = await res.json();
                return new Promise((resolve, reject)=>{
                    reject(message)
                })
            }
        }).catch(err=>{
            return alert("Lỗi: "+err)
        })
    }
    return(
        <>
        

<form className=" max-w-sm mx-auto border px-6 py-3 shadow-md " onSubmit={handleSubmit(submit)}>
    <div className="flex justify-center">
        <h3 className="px-3 py-2 bg-blue-500 text-gray-50 border border-spacing-2 w-32 rounded-lg">Register</h3>
    </div> 
  <div className="mb-5">
    <label htmlFor="email" className="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" {...register("email",{
        required: "Email k được để trống",
        pattern:{
            value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            message: "Email k đúng định dạng"
        }
    })} />
    <div className="text-red-500">{errors.email?.message}</div>
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("password",{
        required: "Vui lòng nhập password",
        minLength:{
            value: 6,
            message: "Pass lớn hơn 6"
        }
    })} />
    <div className="text-red-500">{errors.password?.message}</div>
  </div>
  <div className="mb-5">
    <label htmlFor="confirmPass" className="form-label block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
    <input type="confirmPass" id="confirmPass" className="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("confirmPass",{
        required:"Vui lòng nhập Confirm",
        maxLength: {
            value:6,
            message: "Confirm lớn hơn 6"
        },
        validate: (value) =>{
            if(value !== watch('password')){
                return "Không khớp mật khẩu"
            }
        }
    })} />
    <div className="text-red-500">{errors.confirmPass?.message}</div>
  </div>
  <div className="flex items-start mb-5">
    <div className="flex items-center h-5">
      <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

        </>
    )
}
export default Register