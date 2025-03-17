import React from "react";
import { RotateCw } from "lucide-react";
import { FaShieldAlt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import Title from "./Title";

const Policy = () => {
  return (
    <div className="bg-gray-100 text-gray-700 py-12 px-6">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Our"} text2={"Policies"} />
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 md:gap-16">
        <div className="flex flex-col items-center text-center w-64">
          <FaShieldAlt className="text-black w-12 h-12 mb-3" />
          <h3 className="text-lg font-semibold">Secure Payments</h3>
          <p className="text-sm text-gray-600">
            Your transactions are protected with encryption.
          </p>
        </div>

        <div className="flex flex-col items-center text-center w-64">
          <RotateCw className="text-black w-12 h-12 mb-3" />
          <h3 className="text-lg font-semibold">Easy Returns</h3>
          <p className="text-sm text-gray-600">
            Hassle-free returns within 7 days of purchase.
          </p>
        </div>

        <div className="flex flex-col items-center text-center w-64">
          <MdLocalShipping className="text-black w-12 h-12 mb-3" />
          <h3 className="text-lg font-semibold">Fast Delivery</h3>
          <p className="text-sm text-gray-600">
            Get your orders delivered within 3-5 business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
