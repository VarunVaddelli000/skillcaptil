"use client";
import * as React from 'react';
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const blue = {
        100: '#DAECFF',
        200: '#B6DAFF',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };
    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const TextareaAutosize = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        box-sizing: border-box;
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
        resize: none;
        &:hover {
            border-color: ${blue[400]};
        }
        &:focus {
            border-color: ${blue[400]};
            box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
        // firefox
        &:focus-visible {
            outline: 0;
        }
        `,
    );

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();
            const user = users.find(user => user.username === username && user.address.zipcode === password);
            if (user) {
                if (rememberMe) {
                    localStorage.setItem('user', JSON.stringify(user));
                } else {
                    sessionStorage.setItem('user', JSON.stringify(user));
                }
                router.push('/dashbord');
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('An error occurred while trying to log in.');
        }
    };

    return (
        <div className='mobiles:px-6 min-h-screen align-baseline flex sm:flex-row'>
            <div className='flex flex-col justify-center w-full sm:w-2/4 items-center'>
                <div className='flex justify-center'>
                    <img src="https://crm.skill-capital.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskillcapital.41121682.png&w=640&q=75" width={400} className='text-center'></img>
                </div>
                <div className='mobiles:mt-8 mt-10 xl:mt-8 bg-white border border-grey-300 p-6 rounded-lg shadow-lg w-full xl:w-[32rem] md:w-full'>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-normal leading-6 text-gray-900 border-gray-300">User Name</label>
                            <input
                                type="text"
                                className='w-full p-3 border border-blue-300 rounded-md'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='mt-5'>
                            <label className="block text-sm font-normal leading-6 text-gray-900 ">Password</label>
                            <input
                                type="password"
                                className='w-full p-3 border border-blue-300  rounded-md'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='mt-9'>
                            <button type="submit" className="flex w-full justify-center rounded-lg bg-gradient-to-r from-orange-300 to-pink-500 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                        </div>
                        <div className='flex gap-2 mt-8'>
                            <Checkbox
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className='h-5 w-5'
                            />
                            <span className='font-normal text-sm'>Remember me</span>
                        </div>
                    </form>
                    <div className='text-center mt-24 text-gray-500 text-sm font-medium block'>
                        <h1>©2024, All rights reserved</h1>
                    </div>
                </div>
            </div>
            <div className='hidden sm:flex w-2/4 flex-col justify-between'>
                <div className='text-center px-14 2xl:px-24 mt-10'>
                    <h1 className='text-[#042D60] font-bold leading-[normal] text-3xl xl:text-[2rem] lg:text-[2rem]'>Seamlessly manage all learner data in a unified platform.</h1>
                    <p className='text-[#042D60] font-normal text-lg'>Centralize customer data effortlessly. Streamline communication, sales, and support for seamless growth.</p>
                </div>
                <div>
                    <img src='https://crm.skill-capital.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpinkcrm.d54abf0d.png&w=1920&q=75' className='h-full w-full'></img>
                </div>
            </div>
        </div>
    );
}
