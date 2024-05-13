"use client"
import {notFound} from 'next/navigation';
import {DatePicker, message} from 'antd';
import React, {useEffect, useState} from "react";
import UserInfo from "@/types/UserInfo";
import Loader from "@/components/Loader";
import {getDownloadURL, getStorage, ref, uploadBytes} from "@firebase/storage";
import {auth} from "@/js/firebase.config";
import dayjs from "dayjs";


const UserProfilePage = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + "/session/customer", {
      method: "GET",
      headers: {"Content-Type": "application/json",},
      credentials: "include",
    })
      .then(async (response) => {
        const result = await response.json();
        if (result.statusCode === 200) {
          setUser(result.data);
        } else {
          console.log("Not user");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return notFound();
  }
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    message.open({
      content: "Saving changes...",
      type: "loading",
      duration: 0,
      key: "saving",
    })
    const photoFile = e.currentTarget.photo.files[0];
    let photoUrl = null;
    if(photoFile) {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        setEdit(false);
        return;
      }

      const storageRef = getStorage();
      const photoRef = ref(storageRef, `public/${uid}/photo.jpg`)

      // Upload photo to storage
      photoUrl = await uploadBytes(photoRef, photoFile)
        .then(async (snapshot) => {
          return await getDownloadURL(snapshot.ref)
        })
        .catch((error) => {
          console.error("Error uploading photo", error);
        });
    }

    fetch(process.env.NEXT_PUBLIC_BACKEND_HOST + "/customer", {
      method: "PATCH",
      headers: {"Content-Type": "application/json",},
      credentials: "include",
      body: JSON.stringify({
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        photo: photoUrl ? photoUrl : user.photo ? user.photo : "",
      }),
    })
      .then(async (response) => {
        const result = await response.json();
        if (result.statusCode === 200) {
          message.open({
            content: "Changes saved",
            type: "success",
            key: "saving",
            duration: 2,
          });
          setUser(result.data);
          setEdit(false);
        } else if (result.statusCode === 401) {
          console.log("Not user");
        }
      })
      .catch((error) => {
        message.open({
          content: "Error saving changes",
          type: "error",
          key: "saving",
          duration: 2,
        });
        console.log(error);
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <form onSubmit={onFormSubmit}
        className="relative mt-10 mb-10 mx-auto w-full max-w-3xl bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">

            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1 text-sm text-gray-400">
                <li>
                  <a href="/" className="block transition hover:text-gray-700">
                    <span className="sr-only"> Home </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </a>
                </li>

                <li className="rtl:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </li>

                <li>
                  <a className="block transition hover:text-gray-700 text-xs"> Profile </a>
                </li>


              </ol>
            </nav>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">

              <div className="col-span-full flex flex-col items-center justify-center ">
                <div className="mt-2 mb-3 ">
                  <img alt={"User avatar"} className="h-40 w-40 text-gray-300 rounded-full " src={user.photo} aria-hidden="true"/>
                </div>
                {edit ?
                  <>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="file:border-collapse file:border-0 file:border-r file:border-solid file:bg-white file:hover:bg-opacity-80 file:hover:bg-white rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"/>
                  </>

                  :null}
              </div>


            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    disabled={!edit}
                    name="firstName"
                    id="first-name"
                    onChange={(e) => setUser({...user, firstName: e.target.value})}
                    value={user.firstName}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    disabled={!edit}
                    type="text"
                    name="lastName"
                    id="last-name"
                    onChange={(e) => setUser({...user, lastName: e.target.value})}
                    value={user.lastName}

                    autoComplete="family-name"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address {edit && <p className={"text-red-500"}> doesn't support changing email yet</p>}
                </label>
                <div className="mt-2">
                  <input
                    disabled={true}
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    disabled={!edit}
                    id="phone"
                    maxLength={10}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                    placeholder={"Your phone number"}
                    value={user.phone}
                    type="tel"
                    name="phone"
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"/>

                </div>
              </div>
              <div className="col-span-2">
                <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-gray-900">
                  Date of Birth
                </label>
                <div className="mt-2">
                  <DatePicker
                    disabled={!edit}
                    name="birthday"
                    id="birthday"
                    onChange={(date) => setUser({...user, dateOfBirth: dayjs(date).toString() || ""})}
                    value={dayjs(user.dateOfBirth).isValid() ? dayjs(user.dateOfBirth) : undefined}
                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />

                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                  Address
                </label>
                <div className="mt-2">
                  <input
                    disabled={!edit}
                    type="text"
                    name="address"
                    id="address"
                    onChange={(e) => setUser({...user, address: e.target.value})}
                    placeholder="1234 Example st"
                    value={user.address}
                    className="block px-2 w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>


            </div>
          </div>


        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {!edit ?
            <button
              type="button"
              onClick={() => setEdit(true)}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
              Edit
            </button>
            :
            <>
              <button onClick={() => setEdit(false)} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </>
          }
        </div>
      </form>
    </div>
  );
};

export default UserProfilePage;
