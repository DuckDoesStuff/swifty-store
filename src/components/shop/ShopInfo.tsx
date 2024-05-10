import { CiSquarePlus } from "react-icons/ci";
export default function ShopInfo() {
    return(
        <div className="flex items-center gap-20 justify-center">
            <div className="flex justify-left items-center gap-4" >
                <div className="h-20 w-20 overflow-hidden rounded-full">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex items-center">
                    <div className="flex flex-col gap-1">
                        <p className="text-lg font-semibold"> Tên shop </p>
                        <button className="flex items-center gap-1 rounded-md px-5 py-2.5 text-sm font-medium text-gray-500 border border-gray-300"> <CiSquarePlus /> Follow </button>
                    </div>
                </div>
            </div>
            <div className="flex gap-20">
                <div>
                    <div className="flex gap-2">
                        <p className="font-semibold text-gray-800"> Product:</p>
                        <p className="text-gray-500"> 300 </p>
                    </div>
                    <div className="flex gap-2">
                        <p className="font-semibold text-gray-800"> Follower:</p>
                        <p className="text-gray-500"> 300 </p>
                    </div>
                </div>
                <div>
                    <div className="flex gap-2">
                        <p className="font-semibold text-gray-800"> Rating:</p>
                        <p className="text-gray-500"> 300 </p>
                    </div>
                    <div className="flex gap-2">
                        <p className="font-semibold text-gray-800"> Following:</p>
                        <p className="text-gray-500"> 300 </p>
                    </div>
                </div>
            </div>
        </div>
    )
}