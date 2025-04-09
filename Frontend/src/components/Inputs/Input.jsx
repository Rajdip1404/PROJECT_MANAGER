import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, label, placeholder, type, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className="text-[13px] text-slate-900">{label}</label>
      <div className="input-box">
        <input
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          required={required}
          className="w-full bg-transparent outline-none"
        />

        {type == "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
