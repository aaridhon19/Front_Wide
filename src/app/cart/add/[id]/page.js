
import AddCartComp from "@/components/addCart";
import Navbar from "@/components/navbar";

export default function AddProductPage({params}) {
    const { id } = params;
    return (
        <>
            <Navbar />
            <div className="w-full h-screen bg-base-200">
                <div className="p-4">
                    <h1 className="pl-3">
                        <span className="text-3xl font-bold">Form Add Product to Cart</span>
                        <hr className="my-2 border-blueGray-300 mx-auto" style={{ opacity: 0.6 }} />
                    </h1>
                    <AddCartComp id={id}/>
                </div>
            </div >
        </>
    )
}