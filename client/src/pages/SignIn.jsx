import { Button, Label, Modal, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice.js';

export default function SignIn({ openModal, setOpenModal, handleSignUpClick }) {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  function onCloseModal() {
    setFormData({});
    setError(null);
    setOpenModal(false);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if(!res.ok) {
        dispatch(signInFailure(data.message));
        setError(data.message);
        return;
      } 
      if (res.ok) {
        dispatch(signInSuccess(data));
        onCloseModal();
        console.log('Sign in successful!');
      }

    } catch (error) {
      dispatch(signInFailure(error.message))
      setError(error.message);
    }
  }

  return (
    <>
      <Button gradientMonochrome='pink' size='xs' onClick={() => setOpenModal(true)}>Login</Button>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Login to our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                required
                autoComplete='off'
                type='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" placeholder='*********' required onChange={handleChange}/>
              {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
              </div>
            
            <div className="w-full">
              <Button gradientMonochrome='pink' type='submit' onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </> 
                  ) : 'Log in to your account'
                }
              </Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 ">
              Not registered?&nbsp;
              <button className="text-[#ff008a] hover:underline" onClick={handleSignUpClick}>Create account</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
