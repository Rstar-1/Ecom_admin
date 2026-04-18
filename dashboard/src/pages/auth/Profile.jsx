import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error, success } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    mobileno: "",
    password: "",
    role: "user",
    status: true,
    address: [{ street: "", city: "", state: "", country: "", pincode: "" }],
    image: null,
  });

  // Load user data into form
  useEffect(() => {
    if (user) {
      setForm({
        fullname: user.fullname || "",
        email: user.email || "",
        mobileno: user.mobileno || "",
        password: "",
        role: user.role || "user",
        status: user.status ?? true,
        address: [
          {
            street: user?.address?.[0]?.street || "",
            city: user?.address?.[0]?.city || "",
            state: user?.address?.[0]?.state || "",
            country: user?.address?.[0]?.country || "",
            pincode: user?.address?.[0]?.pincode || "",
          },
        ],
        image: null,
      });
    }
  }, [user]);

  if (!user) return <p>Loading user...</p>;

  // Generic form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Address change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      address: [{ ...prev.address[0], [name]: value }],
    }));
  };

  // Image change
  const handleImage = (e) =>
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));

  // Submit updated fields only
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === "address") {
        value.forEach((addr, i) =>
          Object.entries(addr).forEach(([fKey, fValue]) => {
            if (fValue) formData.append(`address[${i}][${fKey}]`, fValue);
          }),
        );
      } else if (key === "image") {
        // ✅ Only append image if a new file is selected
        if (value instanceof File) {
          formData.append("image", value);
        }
      } else if (key === "password") {
        if (value) formData.append("password", value); // only append if non-empty
      } else {
        formData.append(key, value);
      }
    });

    dispatch(updateUser({ id: user._id, data: formData }));
  };

  return (
    <div className="profile-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid-cols-1 gap-5">
          {user?.image && !form.image && (
            <img
              src={user.image}
              alt="profile"
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
          )}
          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              alt="preview"
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
          )}
          <input type="file" accept="image/*" onChange={handleImage} />
        </div>
        <div className="grid-cols-4 gap-12 mt-12">
          <input
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            className="h-input w-full border-ec rounded-5"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="h-input w-full border-ec rounded-5"
          />
          <input
            name="mobileno"
            value={form.mobileno}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="h-input w-full border-ec rounded-5"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="New Password"
            className="h-input w-full border-ec rounded-5"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="h-input w-full border-ec rounded-5"
          >
            <option value="user">User</option>
            <option value="marketing">Marketing</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mt-12">
          <p className="para-text text-dark">Address</p>
          <div className="grid-cols-4 gap-12 mt-8">
            {["street", "city", "state", "country", "pincode"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form.address[0][field]}
                onChange={handleAddressChange}
                className="h-input w-full border-ec rounded-5"
              />
            ))}
          </div>
        </div>
        <div className="mt-12">
          <label>
          Active:
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
          />
        </label>
        </div>

        <button type="submit" className="py-6 px-10 cursor-pointer small-text border-0 mt-7 bg-primary text-white rounded-5" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
};

export default Profile;
