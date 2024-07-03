import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice.js';
import { app } from '../firebase.js';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { Button } from 'flowbite-react';

export default function Oauth() {

    const dispatch = useDispatch();

    const handleGoogleClick = async () => {
        try {
            dispatch(signInStart());
            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            const result = await signInWithPopup(auth, provider);
        
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // username: result.user.displayName,
                    email: result.user.email
                })
            });

            const data = await res.json();
            
            if (res.ok) {
                dispatch(signInSuccess(data));
                console.log('Sign in successful!')
            }
            
        } catch (error) {
            dispatch(signInFailure(error.message));
            console.log(error.message);
        }
    }

  return (
    <Button type='button' color='light' onClick={handleGoogleClick} className="border w-full rounded-xl mt-8">
        <FcGoogle className="mr-1 h-5 w-4" />Continue with Google
    </Button>
  )
}
