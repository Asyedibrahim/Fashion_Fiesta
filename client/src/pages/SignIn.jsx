import { Button, Dropdown, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';

export default function SignIn() {

  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Button gradientMonochrome='pink' size='xs' onClick={() => setOpenModal(true)}>Login</Button>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                required
                autoComplete='off'
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" placeholder='*********' required />
            </div>
            
            <div className="w-full">
              <Button gradientMonochrome='pink'>Log in to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 ">
              Not registered?&nbsp;
              <button className="text-[#ff008a] hover:underline">
                Create account
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
