  import React, { useEffect, useState } from 'react';
  import { Alert, Button, Modal, TextInput } from 'flowbite-react';
  import { useSelector, useDispatch } from 'react-redux';
  import { useRef } from 'react';
  import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
  import { app } from '../firebase';
  import { CircularProgressbar } from 'react-circular-progressbar';
  import 'react-circular-progressbar/dist/styles.css';
  import {
    updateStart,
    updateSuccess,
    updateFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signoutSuccess,
  } from '../redux/user/userSlice';
  import { HiOutlineExclamationCircle } from 'react-icons/hi';
  import { Link } from 'react-router-dom';
  const PayPalSubscription = ({ plan, onSuccess, onError }) => {
    const buttonRef = useRef(null);
    const [isPayPalReady, setIsPayPalReady] = useState(false);
  
    useEffect(() => {
      if (!window.paypal) {
        const script = document.createElement('script');
        // Add environment parameter - use 'sandbox' for testing, 'production' for live
        script.src = `https://www.paypal.com/sdk/js?client-id=AbWdnjJi7mfwYoGEr-C12rmq0msURtvtdvM3NK37CqPCGmHLXe42w0C2STrlESQk9xQlB-zXjuSeQSVZ&currency=USD&intent=capture`;
        script.async = true;
        
        script.onload = () => {
          setIsPayPalReady(true);
        };
        
        script.onerror = (error) => {
          console.error('PayPal SDK loading failed:', error);
          onError('Failed to load PayPal. Please try again later.');
        };
        
        document.body.appendChild(script);
        
        return () => {
          document.body.removeChild(script);
        };
      } else {
        setIsPayPalReady(true);
      }
    }, []);
  
    useEffect(() => {
      if (isPayPalReady && buttonRef.current && window.paypal) {
        buttonRef.current.innerHTML = '';
        
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [{
                description: `${plan.name} Subscription`,
                amount: {
                  currency_code: 'USD',
                  value: plan.price
                }
              }]
            });
          },
          onApprove: async (data, actions) => {
            try {
              const order = await actions.order.capture();
              onSuccess(order, plan);
            } catch (error) {
              console.error('Payment capture failed:', error);
              onError('Payment processing failed. Please try again.');
            }
          },
          onError: (err) => {
            console.error('PayPal error:', err);
            
            // Handle specific error cases
            if (err.toString().includes('PAYEE_ACCOUNT_RESTRICTED')) {
              onError('Payment system is currently unavailable. Please try again later.');
            } else {
              onError('Payment failed. Please try again or contact support.');
            }
          },
          onCancel: () => {
            console.log('Payment cancelled');
            onError('Payment was cancelled.');
          }
        }).render(buttonRef.current)
        .catch(err => {
          console.error('PayPal button render error:', err);
          onError('Failed to initialize payment. Please try again later.');
        });
      }
    }, [isPayPalReady, plan, onSuccess, onError]);
  
    return (
      <div>
        <div ref={buttonRef} className="mt-4" />
        {!isPayPalReady && <p className="text-sm text-gray-500">Loading payment options...</p>}
      </div>
    );
  };

  export default function DashProfile() {
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState('');
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const filePickerRef = useRef();
    const dispatch = useDispatch();



    // New state variables for credits and plan
    const [credits, setCredits] = useState(currentUser?.credits || 0);
    const [currentPlan, setCurrentPlan] = useState(currentUser?.plan || 'Free');
   
    const SUBSCRIPTION_PLANS = {
      BASIC: {
        price: '9.99',
        credits: 100,
        name: 'Basic Plan'
      },
      PRO: {
        price: '19.99',
        credits: 250,
        name: 'Pro Plan'
      },
      PREMIUM: {
        price: '49.99',
        credits: 1000,
        name: 'Premium Plan'
      }
    };
  
    const handlePaymentSuccess = async (order, plan) => {
      try {
        const response = await fetch(`/api/user/update-subscription/${currentUser._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: order.id,
            planName: plan.name,
            credits: plan.credits,
          }),
        });
  
        const result = await response.json();
        if (response.ok) {
          setCredits(result.credits);
          setCurrentPlan(result.plan);
          setUpdateUserSuccess('Subscription updated successfully!');
        } else {
          setUpdateUserError('Failed to update subscription');
        }
      } catch (error) {
        setUpdateUserError('Error updating subscription');
        console.error('Subscription update error:', error);
      }
    };
  
    const handlePaymentError = (errorMessage) => {
      setUpdateUserError(errorMessage);
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    };

    useEffect(() => {
      if (imageFile) {
        uploadImage();
      }
    }, [imageFile]);

    const uploadImage = async () => {
      setImageFileUploading(true);
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError('Could not upload image (File must be less than 2MB)');
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
          setImageFileUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setFormData({ ...formData, profilePicture: downloadURL });
            setImageFileUploading(false);
          });
        }
      );
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      if (Object.keys(formData).length === 0) {
        setUpdateUserError('No changes made');
        return;
      }
      if (imageFileUploading) {
        setUpdateUserError('Please wait for image to upload');
        return;
      }
      try {
        dispatch(updateStart());
        const res = await fetch(`api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
        } else {
          dispatch(updateSuccess(data));
          setUpdateUserSuccess("User's Profile Updated Successfully");
        }
      } catch (error) {
        dispatch(updateFailure(error.message));
        setUpdateUserError(error.message);
      }
    };

    const handleDeleteUser = async () => {
      setShowModal(false);
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(deleteUserFailure(data.message));
        } else {
          dispatch(deleteUserSuccess(data));
        }
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    };

    const handleSignout = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    return (
      <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt="user"
              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'
              }`}
            />
          </div>
          {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}

          <TextInput
            type="text"
            id="username"
            placeholder="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <TextInput
            type="email"
            id="email"
            placeholder="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />

          <TextInput
            type="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
          />
          <TextInput
          type="text"
          id="youtube"
          placeholder="YouTube Channel URL"
          defaultValue={currentUser.youtube}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="instagram"
          placeholder="Instagram Profile URL"
          defaultValue={currentUser.instagram}
          onChange={handleChange}
        />

          {/* Credits and Plan Display */}
          <div className="bg-indigo-600 p-4 rounded shadow-md mt-4">
            <h3 className="font-medium text-lg">Your Details</h3>
            <p>
              <strong>Credits:</strong> {credits}
            </p>
            <p>
              <strong>Current Plan:</strong> {currentPlan}
            </p>
          </div>
          <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading || imageFileUploading}>
            {loading ? 'Loading...' : 'Update'}
          </Button>

          
        </form>
        <div className="text-red-500 flex justify-between mt-5">
          <span onClick={() => setShowModal(true)} className="cursor-pointer">
            Delete Account
          </span>
          <span onClick={handleSignout} className="cursor-pointer">
            Sign Out
          </span>
        </div>
        {updateUserSuccess && (
          <Alert color="success" className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert color="failure" className="mt-5">
            {updateUserError}
          </Alert>
        )}
        {error && (
          <Alert color="failure" className="mt-5">
            {error}
          </Alert>
        )}
        <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete your account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteUser}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
