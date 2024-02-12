import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFirebase } from '../../context/FirebaseContext';
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";
import Loader from "../Loader";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobileNo: Yup.string().required("Mobile no is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  dob: Yup.date().nullable().required("Date of Birth is required"),
  shopName: Yup.string().required("Shop name is required"),
  shopAddressLine1: Yup.string().required("Address line 1 is required"),
  shopAddressLine2: Yup.string(),
  landmark: Yup.string(),
  shopMobileNo: Yup.string().required("Shop mobile no is required"),
  pin: Yup.string().required("Pin is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const initialValues = {
  name: "",
  mobileNo: "",
  email: "",
  dob: null,
  shopName: "",
  shopAddressLine1: "",
  shopAddressLine2: "",
  landmark: "",
  shopMobileNo: "",
  pin: "",
  state: "Bihar",
  country: "India",
  password: "",
  confirmPassword: "",
};

const CreateCustomerForm = () => {
  const { db, auth } = useFirebase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  function navigateToHome(){
    navigate("/");
  }

  const handleSubmit = (values) => {
    setLoading(true);
    console.log(values); // Handle form submission logic here
    console.log(values.password);
    createUserWithEmailAndPassword(auth, values.email, values.password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      try {
        await updateProfile(user, {
          displayName: values.name,
        });
        try {
          await setDoc(doc(db, "users", user.uid), {
            role: "customer",
            mobile: values.mobileNo,
            shopName: values.shopName,
            shopAddressLine1: values.shopAddressLine1,
            shopAddressLine2: values.shopAddressLine2,
            landmark: values.landmark,
            shopMobileNo: values.shopMobileNo,
            pin: values.pin,
            state: "Bihar",
            country: "India",
          });
          console.log(
            "User profile and role created successfully.",
            user
          );
          setLoading(false);
          navigateToHome();
        } catch (error) {
          console.error("Error storing user role:", error);
        }
      } catch (error_1) {
        console.error("Error updating user profile:", error_1);
      }
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
  };

  return (
    <div className="w-full px-4 py-4 bg-slate-300 space-y-2 pt-20">
      {loading &&
      <diV className="absolute h-full w-full top-0 left-0">
        <Loader/>
      </diV>
}
      <h1 className="text-2xl font-serif text-blue-500 pb-5">
        Create Free Account
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-3 ">
            <div className="border border-slate-800 px-3 py-3 space-y-3 rounded-md">
              {/* <p className="-mt-6 bg-slate-300 px-2 absolute">
                Personal Details
              </p> */}
              <div className="text-blue-700">
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="px-4 w-full h-12 rounded-lg text-xl"
                />
                <ErrorMessage name="name" />
              </div>
              <div>
                <Field
                  type="text"
                  name="mobileNo"
                  placeholder="Mobile No"
                  className="px-4 w-full h-12 rounded-lg text-xl"
                />
                <ErrorMessage name="mobileNo" />
              </div>
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="px-4 w-full h-12 rounded-lg text-xl"
                />
                <ErrorMessage name="email" />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="px-4 w-full h-12 rounded-lg text-xl"
                />
                <ErrorMessage name="password" />
              </div>
              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="px-4 w-full h-12 rounded-lg text-xl"
                />
                <ErrorMessage name="confirmPassword" />
              </div>
              <div>
                <Field
                  type="date"
                  name="dob"
                  placeholder="Date Of Birth"
                  className="px-4 w-full h-12 rounded-lg text-xl"
                />
                <ErrorMessage name="dob" />
              </div>
            </div>

            <div className="border border-slate-800 px-3 py-3 space-y-3 rounded-md">
              {/* <p className="-mt-6 bg-slate-300 px-2 absolute">Shop Details</p> */}
              <div>
                <Field
                  type="text"
                  name="shopName"
                  placeholder="Shop Name"
                  className="px-4 w-full h-12 rounded-lg text-xl"
                />
                <ErrorMessage name="shopName" />
              </div>
              <div>
                <Field
                  type="text"
                  name="shopAddressLine1"
                  placeholder="Address Line 1"
                  className="px-4 w-full h-12 rounded-lg text-xl"
                />
                <ErrorMessage name="shopAddressLine1" />
              </div>
              <div>
                <Field
                  type="text"
                  name="shopAddressLine2"
                  placeholder="Address Line 2"
                  className="px-4 w-full h-12 rounded-lg text-xl"
                />
                <ErrorMessage name="shopAddressLine2" />
              </div>
              <div>
                <Field
                  type="text"
                  name="landmark"
                  placeholder="Landmark"
                  className="px-4 w-full h-12 rounded-lg text-xl"
                />
                <ErrorMessage name="landmark" />
              </div>
              <div>
                <Field
                  type="text"
                  name="shopMobileNo"
                  placeholder="Shop Mobile No"
                  className="px-4 w-full h-12 rounded-lg text-xl"
                />
                <ErrorMessage name="shopMobileNo" />
              </div>
              <div>
                <Field
                  type="text"
                  name="pin"
                  placeholder="PIN"
                  className="px-4 w-full h-12 rounded-lg text-xl"
                />
                <ErrorMessage name="pin" />
              </div>
              <div className="flex space-x-3">
                <div>
                  <Field
                    type="text"
                    name="state"
                    placeholder="State"
                    className="px-4 w-full h-12 rounded-lg text-xl"
                  />
                  <ErrorMessage name="state" />
                </div>
                <div>
                  <Field
                    type="text"
                    name="country"
                    placeholder="Country"
                    className="px-4 w-full h-12 rounded-lg text-xl"
                  />
                  <ErrorMessage name="country" />
                </div>
              </div>
            </div>

            <button
              className="text-2xl text-white w-full h-12 rounded-full bg-gradient-to-r from-red-500 to-orange-500 "
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCustomerForm;
