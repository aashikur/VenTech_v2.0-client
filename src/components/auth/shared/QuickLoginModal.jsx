import LoginForm2 from '@/components/auth/shared/LoginForm2';
import { IoCloseOutline } from "react-icons/io5";

import React from 'react';

const QuickLoginModal = ({setQuickLoginModalOpen}) => {
    return (
        <div className='absolute inset-0 z-10 bg-white/30 backdrop-blur-sm '>

            <div className=' max-w-[500px] w-11/12 absolute top-10 left-1/2 transform -translate-x-1/2 -'>
            <button>
                <IoCloseOutline className='text-2xl absolute top-2 -right-5 cursor-pointer hover:opacity-75' onClick={() => setQuickLoginModalOpen(false)}/>
            </button>

                <LoginForm2 />
            </div>
        </div>
    );
};

export default QuickLoginModal;