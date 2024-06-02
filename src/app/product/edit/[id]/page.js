"use client"
import Navbar from "@/components/Navbar";
import EditProduct from "@/components/editProduct";

export default function EditPage({params}) {
    const {id} = params;
    
    return (
        <>
            <Navbar />
            <div className="w-full h-screen bg-base-200">
                <div className="p-4">
                    <h1 className="pl-3">
                        <span className="text-3xl font-bold">Form Edit Product</span>
                        <hr className="my-2 border-blueGray-300 mx-auto" style={{ opacity: 0.6 }} />
                    </h1>
                    <EditProduct id={id}/>
                </div>
            </div >
        </>
    )
}