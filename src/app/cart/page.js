
import ListCart from "@/components/listCart";
import Navbar from "@/components/navbar";

export default function CartPage() {
    return (
        <>
            <Navbar />
            <div className="w-full h-screen bg-base-200">
                <div className="p-4">
                    <h1 className="pl-3">
                        <span className="text-3xl font-bold">List Cart</span>
                        <hr className="my-2 border-blueGray-300 mx-auto" style={{ opacity: 0.6 }} />
                    </h1>
                    <ListCart />
                </div>
            </div >
        </>
    );
}
