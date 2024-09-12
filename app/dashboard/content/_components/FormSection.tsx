"use client";
import React, { useState } from "react";
import { TEMPLATE } from "../../_components/TemplateListSection";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface PROPS {
  selectedTemplate: TEMPLATE;
  userFormInput: any
}

const FormSection = ({ selectedTemplate, userFormInput }: PROPS) => {
  

  const [formData, setFormData] = useState<any>("")

  const handleInputChange = (e: any) => {
    const {name, value} = e.target
    setFormData({...formData,[name]: value})
   
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    userFormInput(formData)
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
            {item.field == "input" ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
                className="text-gray-600"
              />
            ) : item.field == "textarea" ? (
              <Textarea
                name={item.name}
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
        >
          Generate Content
        </Button>
      </form>
    </div>
  );
};

export default FormSection;
