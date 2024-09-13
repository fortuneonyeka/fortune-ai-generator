"use client";
import React, { useState } from "react";
import { TEMPLATE } from "../../_components/TemplateListSection";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";

interface PROPS {
  selectedTemplate: TEMPLATE;
  userFormInput: any;
  loading: boolean;
}

const FormSection = ({ selectedTemplate, userFormInput, loading }: PROPS) => {
  // Set initial state for form fields
  const initialFormData = selectedTemplate?.form?.reduce((acc: { [key: string]: string }, item: { name: string }) => {
    acc[item.name] = "";
    return acc;
  }, {} as { [key: string]: string });
  

  const [formData, setFormData] = useState<any>(initialFormData);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    userFormInput(formData);
    clearForm(); // Clear the form after submission
  };
  // Function to clear the form fields
  const clearForm = () => {
    setFormData(initialFormData); // Reset the form data to the initial state
  };


  return (
    <div className="p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white">
      <div className="flex flex-col justify-center items-center">
        <Image src={selectedTemplate.icon} width={70} height={70} alt="icon" />
        <h2 className="font-bold text-2xl text-primary mb-2">
          {selectedTemplate.name}
        </h2>
      </div>
      <p className="text-gray-500 text-sm">{selectedTemplate.desc}</p>

      <form
        action=""
        className="mt-8 mb-2 flex flex-col gap-10"
        onSubmit={handleSubmit}
      >
        {selectedTemplate?.form?.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 my-2">
            <label className="font-bold text-gray-600 font-xl">
              {item.label}
            </label>
            {item.field === "input" ? (
              <Input
                name={item.name}
                value={formData[item.name]} // Bind input value to formData state
                required={item?.required}
                onChange={handleInputChange}
                className="text-gray-600"
              />
            ) : item.field === "textarea" ? (
              <Textarea
                name={item.name}
                value={formData[item.name]} // Bind textarea value to formData state
                required={item?.required}
                onChange={handleInputChange}
                className="text-gray-600"
              />
            ) : null}
          </div>
        ))}
        <Button
          type="submit"
          className="w-full py-6 text-xl font-bold self-center"
          disabled={loading}
        >
          {loading && <LoaderIcon className="animate-spin" />}
          Generate Content
        </Button>
      </form>
    </div>
  );
};

export default FormSection;
