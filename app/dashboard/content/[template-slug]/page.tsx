"use client"
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import FormSection from '../_components/FormSection'
import OutPutSection from '../_components/OutPutSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { ArrowLeft, SkipBack, StepBack } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { chatSession } from '@/utils/AiModel'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment';
import { TotalUsageContext } from '@/app/context/TotalUsageContext'
import { useRouter } from 'next/navigation'



interface PROPS {
      params: {
            "template-slug":string
      }
     
}

const CreateNewContent = (props:PROPS) => {
      const selectedTemplate:TEMPLATE|any=Templates?.find((template) => template.slug==props.params['template-slug']);

      const[loading, setLoading] = useState(false)
      const[aiOutput, setAiOutput] = useState<string>("")

      const { isLoaded, isSignedIn, user } = useUser()
      const router = useRouter()
      const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);


      const generateAiContent = async(formData:any) => {
        if (totalUsage>=10000) {
          router.push("/dashboard/billing")
          
          return;
        }

        setLoading(true)
        const selectedPrompt = selectedTemplate?.aiPrompt

        const finalAIPrompt = JSON.stringify(FormData)+", "+selectedPrompt;

        const result = await chatSession.sendMessage(finalAIPrompt);

        // console.log(result.response.text());
        setAiOutput(result.response.text())
        await saveDataInDB(formData, selectedTemplate.slug, result.response.text())
        setLoading(false)
        
      }

      const saveDataInDB = async(formData:any, slug:any, aiResp:string) => {
        if (!isLoaded || !isSignedIn || !user) {
          console.error('User is not loaded or signed in')
          return
        }
    
        const result = await db.insert(AIOutput).values({
          formData: formData,
          templateSlug: slug,
          aiResponse: aiResp,
          createdBy: user.emailAddresses[0]?.emailAddress || "unknown",
          createdAt: moment().format("DD/MM/YY"),
          // updatedAt: moment().format("DD/MM/YY")
        })
        console.log(result);
        
      }
      
  return (
      <div>
        <Link href="/dashboard" ><Button className="ml-6 mt-2 text-2xl font-bold shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]"><ArrowLeft /></Button></Link>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
      {/* Form section */}
      <FormSection selectedTemplate={selectedTemplate} userFormInput={(v:any)=> generateAiContent(v)}  loading={loading}/>

      {/* Output section */}
      <div className='col-span-2'>

      <OutPutSection aiOutput={aiOutput}/>
      </div>
    </div>
    </div>
  )
}

export default CreateNewContent