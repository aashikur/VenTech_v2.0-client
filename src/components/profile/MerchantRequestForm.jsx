import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const MerchantRequestForm = ({ form, setForm, setIsRequestOpen, setProfile }) => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        // Validate required fields
        const requiredFields = [
            "name",
            "phone",
            "district",
            "upazila",
            "shopName",
            "shopNumber",
            "shopAddress",
        ];

        for (let field of requiredFields) {
            if (!form[field]) {
                return Swal.fire("Error!", `Please fill the ${field} field.`, "error");
            }
        }

        try {
            setLoading(true);

            // Send all user + shop info
            const res = await axiosSecure.post("/api/v1/auth/request-merchant", form);
            console.log("😁 :", form)
            Swal.fire("Success!", "Merchant request sent!", "success");

            // Update profile locally
            setProfile(res.data.user);
            setIsRequestOpen(false);
        } catch (err) {
            Swal.fire(
                "Error!",
                err.response?.data?.message || "Failed to send request.",
                "error"
            );
        } finally {
            setLoading(false);
        }


        try {
            setLoading(true);

            // Send all user + shop info
            const res = await axiosSecure.patch("/api/v1/auth/update-profile", {
                name: form.name,
                phone: form.phone,
                avatar: form.avatar,
                district: form.district,
                upazila: form.upazila,
                shopDetails: {
                    shopName: form.shopName,
                    shopNumber: form.shopNumber,
                    shopAddress: form.shopAddress,
                    tradeLicense: form.tradeLicense,
                },
            });

            console.log("Profile updated:", res.data.user);
            Swal.fire("Success!", "Profile updated successfully.", "success");
        } catch (err) {
            console.error("Profile update error:", err);
            Swal.fire("Error!", "Failed to update profile.", "error");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Merchant Request Form</h3>

            {/* General Info */}
            <label>Name*</label>
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input input-bordered w-full"
            />

            <label>Phone*</label>
            <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
            />

            <label>District*</label>
            <input
                name="district"
                value={form.district}
                onChange={handleChange}
                className="input input-bordered w-full"
            />

            <label>Upazila*</label>
            <input
                name="upazila"
                value={form.upazila}
                onChange={handleChange}
                className="input input-bordered w-full"
            />

            <label>Avatar URL</label>
            <input
                name="avatar"
                value={form.avatar}
                onChange={handleChange}
                className="input input-bordered w-full"
            />

            {/* Shop Info */}
            <label>Shop Name*</label>
            <input
                name="shopName"
                value={form.shopName}
                onChange={handleChange}
                className="input input-bordered w-full"
            />

            <label>Shop Number*</label>
            <input
                name="shopNumber"
                value={form.shopNumber}
                onChange={handleChange}
                className="input input-bordered w-full"
            />

            <label>Shop Address*</label>
            <textarea
                name="shopAddress"
                value={form.shopAddress}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
            />

            <label>Trade License</label>
            <input
                name="tradeLicense"
                value={form.tradeLicense}
                onChange={handleChange}
                className="input input-bordered w-full"
            />

            <div className="flex gap-2 mt-2">
                <button
                    onClick={handleSubmit}
                    className="btn btn-success"
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Send Request"}
                </button>
                <button
                    onClick={() => setIsRequestOpen(false)}
                    className="btn btn-secondary"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default MerchantRequestForm;
