import React, { useContext, useState } from "react";
import APIs from "../APIs";
import Context from "../context";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";

const MyAddress = () => {
  const user = useSelector((action) => action?.user?.user);
  const { fetchUserDetails } = useContext(Context);
  const [isNameError, setIsNameError] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const handleAddAddressClick = () => {
    setIsFormVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteAddress = async (name) => {
    try {
      const response = await fetch(APIs.removeAddress.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user._id, addressName: name }), // Send the necessary data to delete the address
      });
  
      const data = await response.json();
      await fetchUserDetails();

      console.log(data); // Handle the response as needed
      await fetchUserDetails(); // Fetch updated user details after deletion
    } catch (error) {
      console.error("Error deleting address:", error);
    }
    
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.address.some((address) => address.name === newAddress.name)) {
      setIsNameError(true);
      return;
    } else {
      setIsNameError(false);
    }

    const address = { id: user._id, address: newAddress };

    try {
      const response = await fetch(APIs.addAddress.url, {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(address),
      });

      const data = await response.json();
      await fetchUserDetails();
      setNewAddress({
        name: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
      });
      setIsFormVisible(false);
    } catch (error) {}
  };

  return (
    <div className=" bg-white w-[80%] rounded-r py-2 px-4">
      <h1 className="text-4xl font-semibold">My Address</h1>

      {user && user.address.length > 0 ? (
        <div>
          {user.address.map((address) => {
            return (
              <div
                key={address.name}
                className="bg-white my-2 p-2 w-1/2 relative rounded border"
              >
                <label className="flex items-center gap-2">
                  <input
                    className=" top-[40%] size-4 accent-red-500"
                    type="radio"
                    value={address.name}
                    checked={selectedAddress === address.name}
                    onChange={handleAddressChange}
                  />
                  <div className="flex-grow">
                    <p className="text-xl">{address.name}</p>
                    <p className="text-sm">
                      {address.street}, {address.city}{" "}
                    </p>
                    <p className="text-sm">
                      {address.state}, {address.zipcode}, {address.country}
                    </p>
                  </div>
                  <MdDeleteOutline className="text-red-500" size={24} onClick={()=>{handleDeleteAddress(address.name)}}/>
                </label>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="font-semibold">No address found.</p>
      )}
      {!isFormVisible && (
        <button className="py-2 px-4 rounded" onClick={handleAddAddressClick}>
          Add address
        </button>
      )}

      {isFormVisible && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 w-1/3 flex flex-col gap-2"
        >
          <div>
            <div className="relative flex items-center justify-between rounded-lg">
              <input
                placeholder="Name"
                type="text"
                name="name"
                value={newAddress.name}
                onChange={handleInputChange}
                className="font-semibold w-full bg-transparent rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="h-[0.05rem] mt-2 bg-black"></div>
            {isNameError && (
              <p className="text-red-600 text-sm">Use another Name</p>
            )}
          </div>
          <div>
            <div className="relative flex items-center justify-between rounded-lg">
              <input
                placeholder="Street Address"
                type="text"
                name="street"
                value={newAddress.street}
                onChange={handleInputChange}
                className="font-semibold w-full bg-transparent rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="h-[0.05rem] mt-2 bg-black"></div>
          </div>
          <div>
            <div className="relative flex items-center justify-between rounded-lg">
              <input
                placeholder="City"
                type="text"
                name="city"
                value={newAddress.city}
                onChange={handleInputChange}
                className="font-semibold w-full bg-transparent rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="h-[0.05rem] mt-2 bg-black"></div>
          </div>
          <div>
            <div className="relative flex items-center justify-between rounded-lg">
              <input
                placeholder="State"
                type="text"
                name="state"
                value={newAddress.state}
                onChange={handleInputChange}
                className="font-semibold w-full bg-transparent rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="h-[0.05rem] mt-2 bg-black"></div>
          </div>
          <div>
            <div className="relative flex items-center justify-between rounded-lg">
              <input
                placeholder="Zip Code"
                type="text"
                name="zipcode"
                value={newAddress.zipcode}
                onChange={handleInputChange}
                className="font-semibold w-full bg-transparent rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="h-[0.05rem] mt-2 bg-black"></div>
          </div>
          <div>
            <div className="relative flex items-center justify-between rounded-lg">
              <input
                placeholder="Country"
                type="text"
                name="country"
                value={newAddress.country}
                onChange={handleInputChange}
                className="font-semibold w-full bg-transparent rounded-lg focus:outline-none"
                required
              />
            </div>
            <div className="h-[0.05rem] mt-2 bg-black"></div>
          </div>

          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
          >
            Save Address
          </button>
        </form>
      )}
    </div>
  );
};

export default MyAddress;
