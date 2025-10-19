import GoogleButton from '@/components/auth/shared/GoogleButton';
import LoginForm from '@/components/auth/shared/LoginForm';
import LoginForm2 from '@/components/auth/shared/LoginForm2';
import Login from '@/pages/auth/Login';
import React from 'react';
import { BiCloset } from 'react-icons/bi';

const QuickLoginModal = ({setQuickLoginModalOpen}) => {
    return (
        <div className='absolute inset-0 z-10 bg-white/30 backdrop-blur-sm '>

            <div className=' max-w-[500px] w-11/12 absolute top-10 left-1/2 transform -translate-x-1/2 -'>
            <button>
                <BiCloset className='text-2xl absolute top-2 right-2' onClick={() => setQuickLoginModalOpen(false)}/>
            </button>

                <LoginForm2 />
            </div>
        </div>
    );
};

export default QuickLoginModal;