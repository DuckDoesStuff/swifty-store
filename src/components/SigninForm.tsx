'use client'
import React, { useState } from "react";
import Link from "next/link";
import { Alert } from 'antd';

const SigninForm: React.FC = () => {
 // Sử dụng hook useClient ở mức cao nhất để đánh dấu toàn bộ trang là Client Component

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false); // Để kiểm soát hiển thị của Alert
  const [alertMessage, setAlertMessage] = useState<string>(''); // Nội dung của Alert

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlertMessage('Email và password không được để trống.');
      setShowAlert(true);
    } else {
      setShowAlert(false);
      console.log('Email:', email, 'Password:', password);
    }
  };

    return (
            <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div className="w-full">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
                    <p className="mt-2 text-gray-500">Sign in below to access your account</p>
                </div>
                <div className="mt-5">
                {showAlert && (
                        <Alert
                        
                        description={alertMessage}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setShowAlert(false)}
                        />
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="relative mt-6">
                            <input type="email" name="email" id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Email Address" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autoComplete="NA" />
                            <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                        </div>
                        <div className="relative mt-6">
                            <input type="password" name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password" placeholder="Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                            <label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                        </div>
                        <div className="my-6">
                            <button type="submit" className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Sign in</button>
                        </div>
                        <p className="text-center text-sm text-gray-500">Don't have an account yet?
                            <Link href="/auth/register"
                                className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign
                                up
                            </Link>.
                        </p>
                    </form>
                </div>
            </div>
        </div>
        )
}
export default SigninForm