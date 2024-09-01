import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { signInWithEmailAndPassword } from 'firebase/auth'

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate()

    const signup = async () => {
        setLoading(true);
        if (name === "" || email === "" || password === "") {
            setLoading(false);
            return toast("All fields are required");
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now(),
            };
            const userRef = collection(fireDB, "users");
            await addDoc(userRef, user);
            toast.success("Signup Succesfully");
            const result = await signInWithEmailAndPassword(auth, email, password)
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/')

            setName("");
            setEmail("");
            setPassword("");
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const googleSignup = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
    
            if (!result.user) {
                throw new Error("No user data from Google.");
            }
    
            const user = {
                name: result.user.displayName,
                uid: result.user.uid,
                email: result.user.email,
                time: Timestamp.now(),
            };
            const userRef = collection(fireDB, "users");
            await addDoc(userRef, user);
            toast.success("Signed up with Google successfully");
            setLoading(false);
    
        } catch (error) {
            console.error(error);
            toast.error("Failed to sign up with Google. Please try again.");
            setLoading(false);
        }
    };
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className="bg-[#fff] px-10 py-10 rounded-xl shadow-3xl">
                <div className="">
                    <h1 className='text-center text-black text-2xl mb-4 font-bold'>Sign up!</h1>
                </div>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        className='mb-7 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black border-b-2 border-black placeholder:text-black outline-none'
                        placeholder='Name'
                    />
                </div>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className='mb-7 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black border-b-2 border-black placeholder:text-black outline-none'
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
                <div className='flex justify-center my-7'>
                    <button
                        onClick={signup}
                        className='bg-blue-500 w-full text-lg text-white font-bold px-2 py-2 rounded-full'>
                        Create Account
                    </button>
                </div>
            <div className="flex items-center my-5">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
                <div className='flex justify-center my-7'>
                    <button
                        onClick={googleSignup}
                        className='border-[1px] border-gray-400 w-full text-md text-[#323130] px-2 py-2 rounded-full flex items-center justify-center'>
                        <FcGoogle className='mr-2' size={20} />
                        Sign up with Google
                    </button>
                </div>
                <div>
                    <h2 className='text-black font-bold text-lg ml-2'>Have an account? <Link className='text-blue-500' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    );
}

export default Signup;
