"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { ShippingAddress } from "@/lib/types";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  pinCode?: string;
  city?: string;
  state?: string;
}

export default function AddressForm() {
  const router = useRouter();
  const setShippingAddress = useCheckoutStore((s) => s.setShippingAddress);
  const existingAddress = useCheckoutStore((s) => s.shippingAddress);

  const [form, setForm] = useState<ShippingAddress>(
    existingAddress || {
      fullName: "",
      email: "",
      phone: "",
      pinCode: "",
      city: "",
      state: "",
    }
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): FormErrors => {
    const errs: FormErrors = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      errs.fullName = "Full name is required (min 2 characters)";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email)) {
      errs.email = "Valid email address is required";
    }

    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) {
      errs.phone = "Phone number must be exactly 10 digits";
    }

    if (!form.pinCode.trim() || !/^\d{6}$/.test(form.pinCode)) {
      errs.pinCode = "PIN code must be exactly 6 digits";
    }

    if (!form.city.trim()) {
      errs.city = "City is required";
    }

    if (!form.state.trim()) {
      errs.state = "State is required";
    }

    return errs;
  };

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // re-validate on keystroke if field was already touched
    if (touched[field]) {
      const newForm = { ...form, [field]: value };
      const tempErrors = validateField(field, newForm);
      setErrors((prev) => ({ ...prev, [field]: tempErrors }));
    }
  };

  const validateField = (
    field: keyof ShippingAddress,
    formData: ShippingAddress
  ): string | undefined => {
    switch (field) {
      case "fullName":
        return !formData.fullName.trim() || formData.fullName.trim().length < 2
          ? "Full name is required (min 2 characters)"
          : undefined;
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
          ? "Valid email address is required"
          : undefined;
      case "phone":
        return !/^\d{10}$/.test(formData.phone)
          ? "Phone number must be exactly 10 digits"
          : undefined;
      case "pinCode":
        return !/^\d{6}$/.test(formData.pinCode)
          ? "PIN code must be exactly 6 digits"
          : undefined;
      case "city":
        return !formData.city.trim() ? "City is required" : undefined;
      case "state":
        return !formData.state.trim() ? "State is required" : undefined;
    }
  };

  const handleBlur = (field: keyof ShippingAddress) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, form);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    // show all errors on submit attempt
    const allTouched: Record<string, boolean> = {};
    Object.keys(form).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    if (Object.keys(validationErrors).length === 0) {
      setShippingAddress(form);
      router.push("/confirmation");
    }
  };

  const inputClass = (field: keyof ShippingAddress) =>
    `w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-white text-[#1B4332] placeholder-[#6B4F3A]/40 outline-none ${
      errors[field] && touched[field]
        ? "border-red-400 focus:ring-2 focus:ring-red-200"
        : "border-[#E8E4DC] focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          placeholder="Vivek Dagar"
          value={form.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          onBlur={() => handleBlur("fullName")}
          className={inputClass("fullName")}
        />
        {errors.fullName && touched.fullName && (
          <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="vivek@example.com"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          className={inputClass("email")}
        />
        {errors.email && touched.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone + PIN in a row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="9876543210"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            className={inputClass("phone")}
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
            PIN Code
          </label>
          <input
            id="pinCode"
            type="text"
            placeholder="110001"
            value={form.pinCode}
            onChange={(e) => handleChange("pinCode", e.target.value)}
            onBlur={() => handleBlur("pinCode")}
            className={inputClass("pinCode")}
          />
          {errors.pinCode && touched.pinCode && (
            <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>
          )}
        </div>
      </div>

      {/* City + State in a row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
            City
          </label>
          <input
            id="city"
            type="text"
            placeholder="New Delhi"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            onBlur={() => handleBlur("city")}
            className={inputClass("city")}
          />
          {errors.city && touched.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1B4332] mb-1.5">
            State
          </label>
          <input
            id="state"
            type="text"
            placeholder="Delhi"
            value={form.state}
            onChange={(e) => handleChange("state", e.target.value)}
            onBlur={() => handleBlur("state")}
            className={inputClass("state")}
          />
          {errors.state && touched.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-[#2D6A4F] hover:bg-[#52B788] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#2D6A4F]/20 active:scale-[0.98]"
      >
        Continue to Payment →
      </button>
    </form>
  );
}
