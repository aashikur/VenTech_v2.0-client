import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import Swal from 'sweetalert2';

/**
 * GuestLogin Component
 * Provides quick access login buttons for demo purposes with different user roles
 */
const GuestLogin = () => {
    // Get authentication method from context
    const { signIn } = useContext(AuthContext);

    // Demo user credentials for different roles
    const guestUser = {
        user: {
            email: 'guest.customer@ventech.com',
            displayName: 'Guest User'
        },
        merchant: {
            email: 'guest.merchent@ventech.com',
            displayName: 'Guest Merchent'
        },
        admin: {
            email: 'guest.admin@ventech.com',
            displayName: 'Guest Admin'
        }
    };

    /**
     * Handles guest login for different roles
     * @param {string} GuestRole - Role of the guest user (user/merchant/admin)
     */
    const handleGuestLogin = (GuestRole) => {
        // Common password for all guest accounts
        const guestPassword = 'Guest1234.';

        signIn(guestUser[GuestRole].email, guestPassword)
            .then((result) => {
                const user = result.user;
                
                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: `Welcome, ${user.displayName}!`,
                    text: 'You have successfully logged in as Guest.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            })
            .catch((err) => {
                console.error('Guest login error:', err);
                
                // Show error message
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: err.message,
                });
            });
    };

    // Button styles for different roles
    const buttonStyles = {
        user: 'text-sky-900 bg-sky-50 border-sky-800 dark:bg-sky-900 dark:text-sky-200',
        merchant: 'text-green-900 bg-green-50 border-green-800 dark:bg-green-900 dark:text-green-200',
        admin: 'text-orange-900 bg-orange-50 border-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };

    // Common button classes
    const baseButtonClass = 'cursor-pointer  text-sm px-2 py-1 rounded-full border transition-colors hover:opacity-90';

    return (
        <div className='my-10'>
            {/* Section Title */}
            <p className='text-sm mb-2 md:mb-3'>
                Demo Login as Guest:
            </p>

            {/* Guest Login Buttons */}
            <div className='flex gap-2'>
                {/* User Guest Login */}
                <button 
                    onClick={() => handleGuestLogin('user')} 
                    className={`${baseButtonClass} ${buttonStyles.user}`}
                >
                    Guest User
                </button>

                {/* Merchant Guest Login */}
                <button
                    onClick={() => handleGuestLogin('merchant')}
                    className={`${baseButtonClass} ${buttonStyles.merchant}`}
                >
                    Guest Merchant
                </button>

                {/* Admin Guest Login */}
                <button 
                    onClick={() => handleGuestLogin('admin')}
                    className={`${baseButtonClass} ${buttonStyles.admin}`}
                >
                    Guest Admin
                </button>
            </div>
        </div>
    );
};

export default GuestLogin;


