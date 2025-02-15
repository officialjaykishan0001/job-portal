import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Popover, Avatar, Strong } from '@radix-ui/themes';
import { LogOut, User2, } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant';
import toast from 'react-hot-toast';
import { setUser } from '../../redux/authSlice';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message);
        }
    }
    return (
        <div className='bg-white '>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5 '>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to='/admin/companies'>Companies</Link> </li>
                                    <li><Link to='/admin/jobs'>Jobs</Link> </li>
                                </>
                            ) : (
                                <>
                                    <li><Link to='/'>Home</Link> </li>
                                    <li><Link to='/jobs'>Jobs</Link> </li>
                                    <li><Link to='/browse'>Browse</Link> </li>
                                </>
                            )
                        }

                    </ul>
                    {
                        !user ? (
                            <div className='flex gap-2  items-center'>
                                <Link to='/login'><Button color="gray" variant="outline" highContrast>Login</Button></Link>
                                <Link to='/signup'><Button style={{ backgroundColor: "#7209b7", color: "white" }} className='bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer'>Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover.Root>
                                <Popover.Trigger>
                                    <Avatar
                                        className='cursor-pointer'
                                        src={user?.profile?.profilePhoto}
                                        fallback="A"
                                        radius='full'
                                    />
                                </Popover.Trigger>
                                <Popover.Content className='w-80'>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar
                                            className='cursor-pointer'
                                            src={user?.profile?.profilePhoto}
                                            fallback="A"
                                            radius='full'
                                        />
                                        <div>
                                            <h4 className='font-medium '>{user?.fullname}</h4>
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="my-2 ">
                                        {
                                            user && user.role === 'student' && (
                                                <>
                                                    <div className="text-sm flex w-fit items-center gap-2 cursor-pointer mb-2">
                                                        <User2 />
                                                        <a href="#"><Strong><Link to='/profile'>View Profile</Link></Strong> </a>
                                                    </div>
                                                </>
                                            ) 
                                        }
                                        <div className="text-sm flex w-fit items-center gap-2 cursor-pointer ">
                                            <LogOut />
                                            <a href="#" onClick={logoutHandler}><Strong>Logout</Strong> </a>
                                        </div>
                                    </div>
                                </Popover.Content>
                            </Popover.Root>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar
