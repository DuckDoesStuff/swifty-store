'use client'
import React, {useState} from "react";
import {Alert, message} from 'antd';
import {auth} from "@/js/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import {useRouter} from "next/navigation";
import Link from "next/link";
import * as Yup from 'yup';
import {useAuthContext} from "@/contexts/AuthContext";

interface RegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  cfpassword: string;
}


const registerFormSchema = Yup.object().shape({
  cfpassword: Yup.string().oneOf([Yup.ref('password'), ""], 'Passwords must match').required('Confirm password is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  username: Yup.string().required('Username is required').min(4, 'Username must be at least 4 characters'),
  lastName: Yup.string().required('Full name is required'),
  firstName: Yup.string().required('Full name is required'),
});

const RegisterForm:React.FC = ()=>{
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    cfpassword: ''
  });

  const [showAlert, setShowAlert] = useState<boolean>(false); // Để kiểm soát hiển thị của Alert
  const [alertMessage, setAlertMessage] = useState<string>(''); // Nội dung của Alert
  const authContext = useAuthContext();
  const setLoading = authContext?.setLoading;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    message.loading({content: 'Signing up', key: 'loading', duration: 0});
    // Validate form
    registerFormSchema.validate(registerForm)
      .then(async () => {
        // Kiểm tra email đã tồn tại chưa và tạo tài khoản mới
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + `/customer/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: registerForm.email,
            firstName: registerForm.firstName,
            lastName: registerForm.lastName,
            username: registerForm.username,
          }),
        });


        if (!response.ok) {
          message.error({content: 'Customer with this email already exist', key: 'loading', duration: 2});
          throw new Error(`Error creating new customer! status: ${response.status}`);
        }

        // Tạo account firebase
        await createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password);

        // Login account firebase
        const user = await signInWithEmailAndPassword(auth, registerForm.email, registerForm.password)
        // Lấy id token firebase
        const idToken = await user.user?.getIdToken();

        // Tạo cookie session
        const responseCookie = await fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + `/session/customer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: registerForm.email,
            idToken
          }),
        });

        if (!responseCookie.ok) {
          throw new Error(`Error creating cookie session! status: ${responseCookie.status}`);
        }

        // Set cookie from the response
        const sessionData = await responseCookie.json();
        document.cookie = `swifty_customer_session=${sessionData.sessionId}; path=/; Secure; SameSite=Strict`;

        // Redirect to home page
        if (setLoading) {
          setLoading(true);
        }

        message.success({content: "Successfully signed up", key: "loading", duration: 2});
        router.push("/");
      })
      .catch((error) => {
        setAlertMessage(error.message);
        setShowAlert(true);
        return;
      });
  };

  const handleSignUpWithGoogle = async () => {
    // Sign in with Google
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        return result.user;
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error, credential);
      });

    if (!user) {
      console.log("Failed to sign in with Google");
      return;
    }

    // Call to check if a user exists in the database
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_HOST + "/customer/" + user.email,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    const email = user.email;
    const firstName = user.displayName?.split(" ")[0] || "";
    const lastName = user.displayName?.split(" ")[1] || "";
    if (data.statusCode === 404) {
      // Call API create customer in the database
      const responseCreate = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_HOST + "/customer/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            username: email,
            firstName,
            lastName,
          }),
        },
      );
      if (!responseCreate.ok) {
        console.log("Failed to create customer");
        return;
      }
    }

    // Send request to create a session
    const idToken = await user.getIdToken();
    const sessionResponse = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_HOST + "/session/customer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: idToken,
          email,
          nameId: email,
        }),
      },
    );

    if (!sessionResponse.ok) {
      console.log("Could not create session");
      return;
    }

    // Set cookie from the response
    const sessionData = await sessionResponse.json();
    document.cookie = `swifty_customer_session=${sessionData.sessionId}; path=/; Secure; SameSite=Strict`;

    // Redirect back to home page
    router.push("/");
  }

  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
      <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />

        <div className="hidden lg:relative lg:block lg:p-12">
          <Link className="block text-white" href="/">
            <span className="sr-only">Home</span>
            <svg
              className="h-8 sm:h-10"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                fill="currentColor"
              />
            </svg>
          </Link>

          <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Welcome to Swifty Store 🦑
          </h2>

        </div>
      </section>

      <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
        <div className="flex flex-col items-center max-w-xl lg:max-w-3xl">
          <div className="relative-mt-16 block lg:hidden">
            <Link href="/"
                  className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
            >
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </Link>

            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Swifty Store
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
              quibusdam aperiam voluptatum.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
            {/*First name input*/}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text--100">First
                name</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  value={registerForm.firstName}
                  onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                  id="firstName"
                  name="firstName"
                  className="block w-full h-10 pl-3 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"/>
              </div>
            </div>

            {/*Last name input*/}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text--100">Last
                name</label>
              <div className="relative mt-1">
                <input
                  value={registerForm.lastName}
                  onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="block w-full h-10 pl-3 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"/>
              </div>
            </div>

            {/*Username input*/}
            <div className="col-span-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text--100">Username</label>
              <div className="relative mt-1">
                <input
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Unique username"
                  className="block w-full h-10 pl-8 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"/>
                <span className="absolute inset-y-0 left-0 flex items-center justify-center ml-2"><svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  className="w-4 h-4 text-blue-400 pointer-events-none">
                <circle cx="12" cy="6" r="4" stroke="#1C274C" strokeWidth="1.5"/>
                <path
                  d="M19.9975 18C20 17.8358 20 17.669 20 17.5C20 15.0147 16.4183 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C14.231 22 15.8398 21.8433 17 21.5634"
                  stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </span>
              </div>
            </div>

            {/*Email input*/}
            <div className="col-span-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text--100">E-mail</label>
              <div className="relative mt-1">
                <input
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="xyz@gmail.com"
                  className="block w-full h-10 pl-8 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"/>
                <span className="absolute inset-y-0 left-0 flex items-center justify-center ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" className="w-4 h-4 text-black-400 pointer-events-none"><path
                                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </span>
              </div>
            </div>

            {/*Password input*/}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="password"
                     className="block text-sm font-medium text-gray-700 dark:text--100">Password</label>
              <div className="relative mt-1">

                <input
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full h-10 pl-8 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"/>
                <span className="absolute inset-y-0 left-0 flex items-center justify-center ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" className="w-4 h-4 text-blue-400 pointer-events-none">
                                    <path
                                      d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"
                                      fill="#1C274C"/>
                                    <path
                                      d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
                                      fill="#1C274C"/>
                                    <path d="M15 2V22" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path
                                      d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.7653 19.8915 18.1143 19.99 15 19.9991M12 4H10C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H12M15 4.00093C18.1143 4.01004 19.7653 4.10848 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8"
                                      stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/></svg>
                            </span>
              </div>
            </div>

            {/*Confirm password input*/}
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="cfpassword"
                     className="block text-sm font-medium text-gray-700 dark:text--100">ConfirmPassword</label>
              <div className="relative mt-1">
                <input
                  value={registerForm.cfpassword}
                  onChange={(e) => setRegisterForm({...registerForm, cfpassword: e.target.value})}
                  type="cfpassword"
                  id="cfpassword"
                  name="cfpassword"
                  className="block w-full h-10 pl-8 pr-3 mt-1 text-sm text-gray-700 border focus:outline-none rounded shadow-sm focus:border-blue-500"/>
                <span className="absolute inset-y-0 left-0 flex items-center justify-center ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" className="w-4 h-4 text-blue-400 pointer-events-none">
                                    <path
                                      d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"
                                      fill="#1C274C"/>
                                    <path
                                      d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
                                      fill="#1C274C"/>
                                    <path d="M15 2V22" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                                    <path
                                      d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.7653 19.8915 18.1143 19.99 15 19.9991M12 4H10C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H12M15 4.00093C18.1143 4.01004 19.7653 4.10848 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8"
                                      stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/></svg>
                            </span>
              </div>
            </div>

            {/*Alert box*/}
            <div className="col-span-6">
              {showAlert && (
                <Alert

                  message={alertMessage}
                  type="error"
                  showIcon
                  closable
                  onClose={() => setShowAlert(false)}
                />
              )}
            </div>

            {/*Terms and service*/}
            <div className="col-span-6">
              <p className="text-sm text-gray-500">
                By creating an account, you agree to our
                <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                and
                <a href="#" className="text-gray-700 underline"> privacy policy</a>.
              </p>
            </div>

            {/*Submit button*/}
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                className="inline-block shrink-0 rounded-md border border-black-600 bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-opacity-80 focus:outline-none focus:ring active:text-blue-500">
                Create an account
              </button>

              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Already have an account?
                <a href="/auth/signin" className="text-gray-700 underline"> Log in</a>.
              </p>
            </div>
          </form>

          <button
            onClick={handleSignUpWithGoogle}
            className="w-fit rounded-md px-3 py-2 outline bg-white text-black mt-5">
            Sign in with google
          </button>
        </div>
      </main>
    </div>
  )
}
export default RegisterForm;