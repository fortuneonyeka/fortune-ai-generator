"use client"
import React from 'react'
import Link from 'next/link'
import FormSection from '../_components/FormSection'
import OutPutSection from '../_components/OutPutSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { ArrowLeft, SkipBack, StepBack } from 'lucide-react'
import { Button } from '@/components/ui/button'


interface PROPS {
      params: {
            "template-slug":string
      }
     
}

const CreateNewContent = (props:PROPS) => {
      const selectedTemplate:TEMPLATE|any=Templates?.find((template) => template.slug==props.params['template-slug']);
      const generateAiContent = (FormData:any) => {

      }
      
  return (
      <div>
        <Link href="/dashboard" ><Button className="ml-6 mt-2 text-2xl font-bold shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"><ArrowLeft /></Button></Link>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
      {/* Form section */}
      <FormSection selectedTemplate={selectedTemplate} userFormInput={(v:any)=> generateAiContent(v)}/>

      {/* Output section */}
      <div className='col-span-2'>

      <OutPutSection />
      </div>
    </div>
    </div>
  )
}

export default CreateNewContent