import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Text, Popover, Avatar, Strong } from '@radix-ui/themes';
import { LogOut, User2, } from 'lucide-react'

const Navbar = () => {
    const user = false;

    return (
        <div className='bg-white '>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5 '>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex gap-2  items-center'>
                                <Link to='/login'><Button variant="outline" >Login</Button></Link>
                                <Link to='/signup'><Button className='bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer'>Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover.Root>
                                <Popover.Trigger>
                                    <Avatar
                                        className='cursor-pointer'
                                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                                        fallback="A"
                                    />
                                </Popover.Trigger>
                                <Popover.Content className='w-80'>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar
                                            className='cursor-pointer'
                                            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                                            fallback="A"
                                        />
                                        <div>
                                            <h4 className='font-medium '>Patel Mernstack</h4>
                                            <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p>
                                        </div>
                                    </div>
                                    <div className="my-2 ">
                                        <div className="text-sm flex w-fit items-center gap-2 cursor-pointer mb-2">
                                            <User2 />
                                            <a href="#"><Strong>View Profile</Strong> </a>
                                        </div>
                                        <div className="text-sm flex w-fit items-center gap-2 cursor-pointer ">
                                            <LogOut />
                                            <a href="#"><Strong>Logout</Strong> </a>
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
