import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

export default function SignUp({ openModal, setOpenModal, handleSignInClick }) {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

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
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message)
        // setLoading(false);
        return;
      }
      // setLoading(false);
      if (res.ok) {
        onCloseModal();
        handleSignInClick();
        console.log('User created!');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Register to our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                required
                autoComplete='off'
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" placeholder='*********' required onChange={handleChange}/>
            </div>
            
            <div className="w-full">
              <Button type="submit" gradientMonochrome='pink' onClick={handleSubmit}>Register to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 ">
              Already registered?&nbsp;
              <button className="text-[#ff008a] hover:underline" onClick={handleLoginClick}>Login</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
