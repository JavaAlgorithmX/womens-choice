import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function AdminProductCard({productData}){
    const navigate = useNavigate();

    function handleEditProduct(){
        navigate(`/admin/edit-product/${productData.id}`)

    }

    return( 
        <div className="bg-slate-300 px-2 py-2 rounded-md ">
           
            <div onClick={handleEditProduct} className="grid grid-cols-3 gap-2 relative">
                <div className=" bg-slate-200 aspect-square">
                    <img src={productData.image} alt=""></img>
                </div>
                <div className="col-span-2 bg-red-200">
                    <div>Product Name : <span>{productData.name}</span></div>
                    <div>Discount: <span>{productData.discount} %</span></div>
                    <div>Mrp : &#8377; <span>{productData.mrp}</span></div>

                    <div className="flex space-x-2">
                        <div>Box-Size : <span>{productData.boxSize}</span></div>
                        <div>Box-Discount: <span>{productData.boxDiscount} %</span></div>
                    </div>
                </div>
                <div className="absolute top-2 right-2 text-slate-600 bg-slate-200 rounded-full px-2 py-2"><MdEdit/></div>
            </div>

        </div>
    );
}