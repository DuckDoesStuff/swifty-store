'use client'
import React, {useState} from "react";
import Link from "next/link";
import * as Yup from 'yup';
import {Alert, message} from 'antd';
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {auth} from "@/js/firebase.config";
import {useRouter} from "next/navigation";
import {useAuthContext} from "@/contexts/AuthContext";

const formSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
});

interface SignInForm {
  email:string;
  password:string;
}

const SigninForm: React.FC = () => {
  const router = useRouter();
  const [credential, setCredential] = useState<SignInForm>({
    email: '',
    password: ''
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const authContext = useAuthContext();
  const setLoading = authContext?.setLoading;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    message.loading({content: 'Signing in', key: 'loading', duration: 0});

    formSchema.validate(credential)
      .then(async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + '/customer/signin', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email: credential.email})
        });

        if (!response.ok) {
          message.error({content: 'Invalid email or password', key: 'loading', duration: 2});
          throw new Error('Invalid email or password');
        }

        const user = await signInWithEmailAndPassword(auth, credential.email, credential.password);
        const idToken = await user.user.getIdToken();

        // Tạo cookie session
        const responseCookie = await fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + `/session/customer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credential.email,
            idToken
          }),
        });

        if (!responseCookie.ok) {
          throw new Error('Failed to create session');
        }

        // Set cookie from the response
        const sessionData = await responseCookie.json();
        document.cookie = `swifty_customer_session=${sessionData.sessionId}; path=/; Secure; SameSite=Strict`;

        // Redirect to home page
        if(!setLoading) console.log("Set loading is null");
        setLoading && setLoading(true);
        message.success({content: "Successfully signed in", key: "loading", duration: 2});
        router.push("/");
      })
      .catch((err) => {
        console.log(err)
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
    <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
          <p className="mt-2 text-gray-500">Sign in below to access your account</p>
        </div>

        <div className="mt-5 flex flex-col items-stretch">
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
                     onChange={(e) => setCredential({...credential, email: e.target.value})}
                     placeholder="Email Address"
                     className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                     autoComplete="NA"/>
              <label htmlFor="email"
                     className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email
                Address</label>
            </div>
            <div className="relative mt-6">
              <input type="password" name="password"
                     onChange={(e) => setCredential({...credential, password: e.target.value})}
                     id="password" placeholder="Password"
                     className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"/>
              <label htmlFor="password"
                     className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
            </div>
            <div className="my-6">
              <button type="submit"
                      className="w-full hover:bg-opacity-80 rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Sign
                in
              </button>
            </div>
          </form>

          <button
            onClick={handleSignUpWithGoogle}
            className="w-full rounded-md outline bg-white px-3 py-4 text-black">
            Sign in with google
          </button>

          <p className="text-center text-sm text-gray-500 mt-5">Don't have an account yet?
            <Link href="/auth/register"
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign
              up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )

}
export default SigninForm