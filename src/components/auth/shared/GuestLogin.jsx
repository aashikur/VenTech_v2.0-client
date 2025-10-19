import React from 'react';

const GuestLogin = () => {
    return (
        <div className='my-10'>
            <p className='text-sm mb-2 md:mb-3'>Demo Login as Guest: </p>
            <div className='flex gap-2'>
                <button className='text-sm px-2 py-1 rounded-full text-sky-900 bg-sky-50 border border-sky-800 dark:bg-sky-900 dark:text-sky-200'>Guest User</button>
                <button className='text-sm px-2 py-1 rounded-full text-green-900 bg-green-50 border border-green-800 dark:bg-green-900 dark:text-green-200'>Guest Merchant</button>
                <button className='text-sm px-2 py-1 rounded-full text-orange-900 bg-orange-50 border border-orange-800 dark:bg-orange-900 dark:text-orange-200'>Guest Admin</button>
            </div>
        </div>
    );
};

export default GuestLogin;