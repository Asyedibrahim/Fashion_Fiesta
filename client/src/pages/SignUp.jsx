import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import Oauth from "../components/Oauth";

export default function SignUp({ openModal, setOpenModal, handleSignInClick }) {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  function onCloseModal() {
    setFormData({});
    setOpenModal(false);
  }

  const handleLoginClick = () => {
    onCloseModal();
    handleSignInClick();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message)
        setLoading(false);
        return;
      }
      
      if (res.ok) {
        onCloseModal();
        handleSignInClick();
        setError(null);
        setLoading(false);
        console.log('User created!');
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" autoComplete='off'>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Register to our platform</h3>
            
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput type="email"
                id="email"
                placeholder="name@company.com"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" placeholder='*********' onChange={handleChange}/>
              {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
            </div>
            
              <Button className="w-full" type="submit" gradientMonochrome='pink' onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Creating account...</span>
                  </> 
                  ) : 'Register to your account'
                }
              </Button>
              <div className="grid grid-cols-3 items-center text-gray-500">
                <hr className='border-gray-500'/>
                <p className='text-center'>OR</p>
                <hr className='border-gray-500'/>
              </div>
              <Oauth />
              
              <div className="flex justify-between text-sm font-medium text-gray-500 ">
              Already registered?&nbsp;
              <button className="text-[#ff008a] hover:underline" onClick={handleLoginClick}>Login</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
