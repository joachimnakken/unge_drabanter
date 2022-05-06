import React from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaGlassWhiskey, FaHamburger, FaRandom } from "react-icons/fa";
import { AiTwotoneStar } from "react-icons/ai";

// Fix this!
interface inputInterface {
  label: string;
  name: string;
  type: string;
  value: string;
  Icon?: any;
  // typeof React.Component
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  valid?: boolean;
  error?: string;
  maxLength?: number;
  warning?: string;
  helperText?: string;
  props?: any;
  onChange?: any;
}

const Input: React.FC<inputInterface> = ({
  Icon,
  placeholder,
  disabled,
  value = "",
  onChange = () => null,
  name = "",
  type = "text",
  maxLength = 0,
  label = "",
  error = "",
  warning = "",
  helperText = "",
  valid = false,
  className = "",
  ...props
}) => {
  const hasValue = value !== "" && value !== undefined;
  return (
    <div
      className={clsx(
        "relative flex items-center h-10 rounded-full border-2 border-gray-300 focus-within:ring-offset-0 border-3 focus-within:border-yellow-300",
        disabled && "cursor-not-allowed",
        className
      )}
    >
      <Icon className="absolute w-4 h-4 left-4" />
      <input
        type={type}
        name={name}
        placeholder={placeholder || label}
        onChange={onChange}
        maxLength={maxLength > 0 ? maxLength : undefined}
        autoComplete="new-password"
        className="w-full h-full pl-10 placeholder-transparent border border-none rounded-full focus:ring-0 outline-0 peer"
        {...props}
      />
      <label
        htmlFor="search"
        className={clsx(
          "absolute pointer-events-none text-[8x] capitalize text-gray-600 transition-all left-10 top-0 peer-focus:text-[8px] peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-gray-400 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1.5",
          hasValue && "top-0 text-[8px] text-gray-400"
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
