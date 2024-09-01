import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import { useContext, useState } from 'react'
import myContext from '../../context/data/myContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/FirebaseConfig'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const context = useContext(myContext)
    const {loading , setLoading} = context

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const login = async () => {
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/')
            setLoading(false)

        } catch (error) {
            console.log(error)
            toast.error('Sigin Failed', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false);
        }
    }

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };

    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className='bg-[#fff] px-10 py-10 rounded-xl shadow-3xl'>
                <div className="">
                    <h1 className='text-center text-black text-2xl mb-4 font-bold'>Login!</h1>
                </div>
                <div>
                    <input type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        name='email'
                        className='mb-7 px-2 py-2 w-full lg:w-[20em] rounded-lg border-b-2 border-black text-black placeholder:text-black outline-none'
                        placeholder='Email'
                    />
                </div>
                <div className='relative'>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg border-b-2 border-black text-black placeholder:text-black outline-none'
                        placeholder='Password'
                    />
                    <span
                    className="eye-icon absolute right-3 top-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                    >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className=' flex justify-center my-7'>
                    <button
                        onClick={login}
                        className=' bg-blue-500 w-full text-xl text-white font-bold  px-2 py-2 rounded-full'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-black font-bold text-lg ml-2'>Don't have an account <Link className='text-blue-500' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login