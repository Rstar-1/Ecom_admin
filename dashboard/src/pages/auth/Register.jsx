import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearMessages } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import GenericContainer from "../utility/GenericContainer";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.auth);

  const [step, setStep] = useState(1); // ✅ step control

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    mobileno: "",
    password: "",
    confirmPassword: "",
    image: null,
    role: "user",
    status: true,
    address: [
      {
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      },
    ],
  });

  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (success) navigate("/login");
  }, [success, navigate]);

  // 🧠 handle simple fields
  const handleChange = ({ target: { name, value, type, checked } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) dispatch(clearMessages());
  };

  // 🧠 handle address change
  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...form.address];
    updated[index][name] = value;

    setForm((prev) => ({ ...prev, address: updated }));
  };

  // ➕ Add address
  const addAddress = () => {
    setForm((prev) => ({
      ...prev,
      address: [
        ...prev.address,
        { street: "", city: "", state: "", country: "", pincode: "" },
      ],
    }));
  };

  // ❌ Remove address
  const removeAddress = (index) => {
    const updated = form.address.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, address: updated }));
  };

  // 🖼 image
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setForm((prev) => ({ ...prev, image: file }));
  };

  // 🚀 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "address") {
        formData.append("address", JSON.stringify(value)); // ✅ array
      } else if (key === "image" && value instanceof File) {
        formData.append("image", value);
      } else if (key !== "confirmPassword") {
        formData.append(key, value);
      }
    });

    dispatch(registerUser(formData));
  };

  return (
    <GenericContainer
      version="v0"
      className="bg-white h-100 flex items-center justify-center"
    >
      <div className="h-500 flex items-center w-60 mx-auto border-ec rounded-5">
        <div className="w-50 h-500 bg-forth"></div>

        <div className="w-50">
          <form className="px-30 h-500 overflow-auto" onSubmit={handleSubmit}>
            <h2 className="head-text font-600 text-primary pt-30">
              Create Account
            </h2>

            <div className="mt-20 grid-cols-1 gap-12">
              {/* ✅ STEP 1 */}
              {step === 1 && (
                <>
                  <input
                    name="fullname"
                    placeholder="Full Name"
                    value={form.fullname}
                    onChange={handleChange}
                    className="h-input w-full border-ec rounded-5"
                  />
                  <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="h-input w-full border-ec rounded-5"
                  />
                  <input
                    name="mobileno"
                    placeholder="Mobile No"
                    value={form.mobileno}
                    onChange={handleChange}
                    className="h-input w-full border-ec rounded-5"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="h-input w-full border-ec rounded-5"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="h-input w-full border-ec rounded-5"
                  />

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-10 mt-20 bg-primary text-white rounded-5"
                  >
                    Next
                  </button>
                </>
              )}

              {/* ✅ STEP 2 */}
              {step === 2 && (
                <>
                  {form.address.map((addr, index) => (
                    <div key={index}>
                      <div className="grid-cols-2 gap-8">
                        <input
                          name="street"
                          placeholder="Street"
                          value={addr.street}
                          onChange={(e) => handleAddressChange(index, e)}
                          className="h-input w-full border-ec rounded-5"
                        />
                        <input
                          name="city"
                          placeholder="City"
                          value={addr.city}
                          onChange={(e) => handleAddressChange(index, e)}
                          className="h-input w-full border-ec rounded-5"
                        />
                        <input
                          name="state"
                          placeholder="State"
                          value={addr.state}
                          onChange={(e) => handleAddressChange(index, e)}
                          className="h-input w-full border-ec rounded-5"
                        />
                        <input
                          name="country"
                          placeholder="Country"
                          value={addr.country}
                          onChange={(e) => handleAddressChange(index, e)}
                          className="h-input w-full border-ec rounded-5"
                        />
                        <input
                          name="pincode"
                          placeholder="Pincode"
                          value={addr.pincode}
                          onChange={(e) => handleAddressChange(index, e)}
                          className="h-input w-full border-ec rounded-5"
                        />
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          className="py-6 px-10 cursor-pointer small-text border-0 mt-7 bg-danger text-white rounded-5"
                          onClick={() => removeAddress(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className="py-10 border-0 bg-primary cursor-pointer small-text text-white rounded-5"
                    onClick={addAddress}
                  >
                    + Add Address
                  </button>

                  <div className="grid-cols-2 gap-12">
                    <button
                      type="button"
                      className="py-10 border-0 bg-primary cursor-pointer small-text text-white rounded-5"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="py-10 border-0 bg-primary cursor-pointer small-text text-white rounded-5"
                      onClick={() => setStep(3)}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {/* ✅ STEP 3 */}
              {step === 3 && (
                <>
                  <input type="file" onChange={handleImage} />

                  <select
                    name="role"
                    className="h-input border-ec rounded-5"
                    value={form.role}
                    onChange={handleChange}
                  >
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                    <option value="marketing">Marketing</option>
                    <option value="admin">Admin</option>
                  </select>

                  <label>
                    Active:
                    <input
                      type="checkbox"
                      name="status"
                      checked={form.status}
                      onChange={handleChange}
                    />
                  </label>

                  <div className="grid-cols-2 gap-12">
                    <button
                      type="button"
                      className="py-10 border-0 bg-primary cursor-pointer small-text text-white rounded-5"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="py-10 border-0 bg-primary cursor-pointer small-text text-white rounded-5"
                      disabled={loading}
                    >
                      {loading ? "Registering..." : "Register"}
                    </button>
                  </div>
                </>
              )}

              {(localError || error) && (
                <p className="text-danger">{localError || error}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </GenericContainer>
  );
};

export default Register;
