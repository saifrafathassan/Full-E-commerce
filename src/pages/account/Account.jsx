import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'
import { Tab } from '@headlessui/react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import { deleteUser } from "firebase/auth";
import { auth } from '../../firebase/FirebaseConfig'
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import Modal from 'react-modal';
import { withTranslation  } from 'react-i18next';

Modal.setAppElement('#root'); // Set the root element for accessibility

function ChangePasswordForm({ handleChangePassword, t }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangePassword(currentPassword, newPassword, confirmNewPassword);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 50 }} 
      transition={{ duration: 0.5 }}
      className="bg-white p-5 pl-0 my-20 rounded-lg shadow-lg max-w-md "
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">{t('Current Password')}</label>
          <input 
            type={showPassword ? "text" : "password"}
            id="currentPassword" 
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
            required
          />
          <span
            className="eye-icon absolute right-3 top-9 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="mb-4 relative">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">{t('New Password')}</label>
          <input 
            type="password" 
            id="newPassword" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">{t('Confirm New Password')}</label>
          <input 
            type="password" 
            id="confirmNewPassword" 
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {t('Update Password')}
        </button>
      </form>
    </motion.div>
  );
}

function Account({t}) {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid;
  const context = useContext(myContext);
  const { mode, loading, setLoading, order } = context;
  const navigate = useNavigate()
  const [selectedTab, setSelectedTab] = useState('Orders');
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No user is signed in.");
        toast.error("No user is signed in. Please log in and try again.");
        closeModal(); 
        return;
      }
      await deleteUser(user);
      toast.success("Account deleted successfully");
      navigate('/login');
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete account. Please try again.");
    } finally {
      closeModal(); 
    }
  };

  const handleChangePassword = async (currentPassword, newPassword, confirmNewPassword) => {
    if (newPassword !== confirmNewPassword) {
      return toast.error("Passwords do not match");
    }
  
    try {
      setLoading(true);
      const user = auth.currentUser;
  
      if (user) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
  
        await updatePassword(user, newPassword);
        toast.success("Password Changed");
        setShowChangePasswordForm(false); 
      } else {
        toast.error("No user is signed in.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.code === 'auth/network-request-failed') {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error("Failed to change password. Please check your current password and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading && <Loader />}
      <div className="flex">
        {/* Sidebar for tabs */}
        <div className="md:w-1/4 p-5 bg-gray-200" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '' }}>
          <Tab.Group>
            <Tab.List className="flex flex-col space-y-4">
              <Tab className={`py-3 px-4 text-left rounded-xl shadow-xl ${selectedTab === 'Orders' ? 'bg-main text-white' : 'bg-white text-black'}`} onClick={() => setSelectedTab('Orders')}>
                {t('Orders')}
              </Tab>
              <Tab className={`py-3 px-4 text-left rounded-xl shadow-xl ${selectedTab === 'Account Settings' ? 'bg-main text-white' : 'bg-white text-black'}`} onClick={() => setSelectedTab('Account Settings')}>
                {t('Account Settings')}
              </Tab>
            </Tab.List>
          </Tab.Group>
        </div>

        {/* Content for selected tab */}
        <div className="w-3/4 p-5">
          {selectedTab === 'Orders' && (
            order.length > 0 ? (
              <div className="h-full min-h-[650px] pt-10">
                {
                  order.filter(obj => obj.userid === userid).map((order, index) => (
                    <div key={index} className="mx-auto max-w-5xl justify-start px-6 md:flex-row ">
                      {
                        order.cartItems.map((item, index) => (
                          <div key={index} className="rounded-lg md:w-2/3">
                            <div className="mb-6 rounded-lg bg-[#ddd] p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
                              <img src={item.imageUrl} alt="product-image" className="sm:w-[200px] sm:h-[200px] object-cover rounded-lg" />
                              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                  <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.price}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className='w-full h-[205px]'>
                <h2 className='text-center text-2xl text-black mt-56 mb-32'>{t('No Order Found')}</h2>
              </div>
            )
          )}

          {selectedTab === 'Account Settings' && (
            <div className='min-h-[500px] sm:pl-10'>
              <h2 style={{color: mode === 'dark' ? 'white' : 'black' }} className="text-2xl font-bold mb-4">{t('Account Settings')}</h2>
              <div>
              <button onClick={openModal} className="px-6 py-2 bg-red-500 text-white rounded">
                {t('Delete Account')}
              </button>
              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm Deletion"
                className="modal"
                overlayClassName="modal-overlay"
              >
                <h2 className='text-center pb-5 text-xl'>Are you sure you want to delete your account?</h2>
                <div className="flex justify-center space-x-4">
                  <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-500 text-white rounded">
                    {t('OK')}
                  </button>
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">
                    {t('Cancel')}
                  </button>
                </div>
              </Modal>
            </div>
              <br />
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setShowChangePasswordForm(true)}>
                {t('Change Password')}
              </button>
              {showChangePasswordForm && (
                <ChangePasswordForm handleChangePassword={handleChangePassword} />
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default withTranslation()(Account);