


const CheckoutPage = ()=>{
    return (
        <div className="bg-gray-100 h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left font-semibold">Product</th>
                                        <th className="text-left font-semibold">Price</th>
                                        <th className="text-left font-semibold">Quantity</th>
                                        <th className="text-left font-semibold">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-4">
                                            <div className="flex items-center">
                                                <img className="h-16 w-16 mr-4" src="https://via.placeholder.com/150" alt="Product image"/>
                                                <span className="font-semibold">Product name</span>
                                            </div>
                                        </td>
                                        <td className="py-4">$19.99</td>
                                        <td className="py-4">
                                            <div className="flex items-center">
                                                <button className="border rounded-md py-2 px-4 mr-2">-</button>
                                                <span className="text-center w-8">1</span>
                                                <button className="border rounded-md py-2 px-4 ml-2">+</button>
                                            </div>
                                        </td>
                                        <td className="py-4">$19.99</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>$19.99</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Taxes</span>
                                <span>$1.99</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <fieldset className="space-y-4">
  <legend className="sr-only">Delivery</legend>

  <div>
    <label
      htmlFor="DeliveryStandard"
      className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
    >
      <div>
        <p className="text-gray-700">Standard</p>

        <p className="mt-1 text-gray-900">Free</p>
      </div>

      <input
        type="radio"
        name="DeliveryOption"
        value="DeliveryStandard"
        id="DeliveryStandard"
        className="size-5 border-gray-300 text-blue-500"
        checked
      />
    </label>
  </div>

  <div>
    <label
      htmlFor="DeliveryPriority"
      className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
    >
      <div>
        <p className="text-gray-700">Next Day</p>

        <p className="mt-1 text-gray-900">£9.99</p>
      </div>

      <input
        type="radio"
        name="DeliveryOption"
        value="DeliveryPriority"
        id="DeliveryPriority"
        className="size-5 border-gray-300 text-blue-500"
      />
    </label>
  </div>
</fieldset>
                            </div>
                            <hr className="my-2"/>
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">$21.98</span>
                            </div>
                            <button className="bg-black text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CheckoutPage;

