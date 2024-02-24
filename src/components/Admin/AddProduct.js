import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFirebase } from "../../context/FirebaseContext";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { FaCamera } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Compressor from "compressorjs";
import { ImageCompressor } from "image-compressor";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  boxSize: Yup.number().required("Box size is required"),
  boxDiscount: Yup.number().required("Box discount is required"),
  mrp: Yup.number().required("MRP is required"),
  discount: Yup.number().required("Discount is required"),
});

const AddProductForm = ({ isEdit }) => {
  const { db, storage } = useFirebase();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      // console.log("Loading -1 ",loading)
      setLoading(true);
      try {
        const docRef = doc(db, "products", productId);
        const productDoc = await getDoc(docRef);
        if (productDoc.exists()) {
          setProduct(productDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        // console.log("Loading status ",loading);
        // console.log("Product from use Effect 1 ->",product);
        setLoading(false);
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [db, productId]);

  const handleDeleteProduct = async () => {
    // setLoading(true);
    try {
      const docRef = doc(db, "products", productId);
      await deleteDoc(docRef);
      console.log("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    } finally {
      // setLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Add the product to Firestore
      if (isEdit) {
        // Update the existing product in Firestore
        await updateDoc(doc(db, "products", productId), {
          name: values.name,
          boxSize: values.boxSize,
          boxDiscount: values.boxDiscount,
          mrp: values.mrp,
          discount: values.discount,
          image: values.image,
        });
        console.log("Product updated successfully!");
      } else {
        // Upload image to Firebase Storage
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(storageRef);

        // Add the new product to Firestore
        await addDoc(collection(db, "products"), {
          name: values.name,
          boxSize: values.boxSize,
          boxDiscount: values.boxDiscount,
          mrp: values.mrp,
          discount: values.discount,
          // image: values.image,
          image: imageUrl,
        });
        console.log("Product added successfully!");
      }
      // console.log("Product added successfully!",product);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  } else {
    return (
      <div className=" relative">
        {isEdit && (
          <button
            onClick={handleDeleteProduct}
            className="text-4xl bg-red-400 absolute top-4 left-4 z-10 text-black px-4 py-4 rounded-full drop-shadow-xl"
          >
            <MdDeleteForever />
          </button>
        )}
        <Formik
          initialValues={product}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-2 px-2 py-2">
              <input
                id="imageUpload"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden w-full aspect-square bg-slate-100 rounded-md relative"
              ></input>
              <label
                htmlFor="imageUpload"
                className="w-full aspect-square bg-slate-100 rounded-md relative"
              >
                  <div className=" relative">
                  <img
                    src={image ? 
                    
                      URL.createObjectURL(image)
                      :'.././placeholder.jpg'}
                    alt=""
                  />
                  {isEdit && (
                    <img
                    src={product.image}
                    alt=""
                  />
                  )}
                  <div className="px-4 py-4 top-2 right-2 drop-shadow-lg text-3xl bg-slate-300 absolute rounded-full">
                    <FaCamera />
                  </div>
                  </div>
              </label>
              {isEdit && <div>Product ID: {productId}</div>}

              <div>
                <Field
                  className="w-full px-2 py-2 rounded-md bg-slate-100"
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage name="name" />
              </div>
              <div>
                <Field
                  className="w-full px-2 py-2 rounded-md bg-slate-100"
                  type="number"
                  name="boxSize"
                  placeholder="Box Size"
                />
                <ErrorMessage name="boxSize" />
              </div>
              <div>
                <Field
                  className="w-full px-2 py-2 rounded-md bg-slate-100"
                  type="number"
                  name="boxDiscount"
                  placeholder="Box Discount"
                />
                <ErrorMessage name="boxDiscount" />
              </div>
              <div>
                <Field
                  className="w-full px-2 py-2 rounded-md bg-slate-100"
                  type="number"
                  name="mrp"
                  placeholder="MRP"
                />
                <ErrorMessage name="mrp" />
              </div>
              <div>
                <Field
                  className="w-full px-2 py-2 rounded-md bg-slate-100"
                  type="number"
                  name="discount"
                  placeholder="Discount"
                />
                <ErrorMessage name="discount" />
              </div>
              <div>
                <Field
                  className="w-full px-2 py-2 rounded-md bg-slate-100"
                  type="text"
                  name="image"
                  placeholder="Image URL"
                />
                <ErrorMessage name="image" />
              </div>

              <button
                className="w-full rounded-full bg-blue-700 text-white py-2 px-4"
                type="submit"
                disabled={isSubmitting}
              >
                {`${isEdit ? "Update Product" : "Add Product"}`}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
};

export default AddProductForm;
