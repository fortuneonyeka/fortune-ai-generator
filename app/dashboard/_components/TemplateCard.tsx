import React from 'react'
import { Template } from './TemplateListSection'
import Image from 'next/image'

const TemplateCard = (item:Template) => {
  return (
    <div className='p-5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] rounded-md border bg-white flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all hover:rounded-lg'>
      <Image src={item.icon} width={50} height={50} alt='icon' className=' self-center'/>
      <h2 className='font-medium text-lg'>{item.name}</h2>
      <p className='text-gray-500 line-clamp-3'>{item.desc}</p>
    </div>
  )
}

export default TemplateCard