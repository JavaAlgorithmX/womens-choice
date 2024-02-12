import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFirebase } from "../../context/FirebaseContext";
import { collection, addDoc } from "firebase/firestore";
import { FaCamera } from "react-icons/fa";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  boxSize: Yup.number().required("Box size is required"),
  boxDiscount: Yup.number().required("Box discount is required"),
  mrp: Yup.number().required("MRP is required"),
  discount: Yup.number().required("Discount is required"),
  image: Yup.string().required("Image URL is required"),
});

const initialValues = {
  name: "",
  boxSize: "",
  boxDiscount: "",
  mrp: "",
  discount: "",
  image: "",
};

const AddProductForm = () => {
  const { db } = useFirebase();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Add the product to Firestore
      const product =await addDoc(collection(db, "products"), {
        name: values.name,
        boxSize: values.boxSize,
        boxDiscount: values.boxDiscount,
        mrp: values.mrp,
        discount: values.discount,
        image: values.image,
      });
      console.log("Product added successfully!",product);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-2 px-2 py-2">
            <div className="w-full aspect-square bg-slate-100 rounded-md relative">
                <div className="px-4 py-4 top-2 right-2 drop-shadow-lg text-3xl bg-slate-300 absolute rounded-full"><FaCamera/></div>
            </div>
            <div >
              <Field className="w-full px-2 py-2 rounded-md bg-slate-100" type="text" name="name" placeholder="Name" />
              <ErrorMessage name="name" />
            </div>
            <div>
              <Field className="w-full px-2 py-2 rounded-md bg-slate-100" type="number" name="boxSize" placeholder="Box Size" />
              <ErrorMessage name="boxSize" />
            </div>
            <div >
              <Field
              className="w-full px-2 py-2 rounded-md bg-slate-100"
                type="number"
                name="boxDiscount"
                placeholder="Box Discount"
              />
              <ErrorMessage name="boxDiscount" />
            </div >
            <div >
              <Field className="w-full px-2 py-2 rounded-md bg-slate-100" type="number" name="mrp" placeholder="MRP" />
              <ErrorMessage name="mrp" />
            </div>
            <div >
              <Field className="w-full px-2 py-2 rounded-md bg-slate-100" type="number" name="discount" placeholder="Discount" />
              <ErrorMessage name="discount" />
            </div>
            <div>
              <Field className="w-full px-2 py-2 rounded-md bg-slate-100" type="text" name="image" placeholder="Image URL" />
              <ErrorMessage name="image" />
            </div>
            <button className="w-full rounded-full bg-blue-700 text-white py-2" type="submit" disabled={isSubmitting}>
              Add Product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
