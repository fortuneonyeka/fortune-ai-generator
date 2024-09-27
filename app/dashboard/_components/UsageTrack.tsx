"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { ArrowBigUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { HistoryItem } from '../history/_components/HistoryPage'

const UsageTrack = () => {

      const { user } = useUser()
      const [totalWords, setTotalWords] = useState<number>(0)

      useEffect(() => {
        user && GetData()
      }, [user])
    
      const GetData = async () => {
            const result: HistoryItem[] = await db
              .select()
              .from(AIOutput)
              .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress))
          
            GetTotalWordCount(result)
          }
          
              const GetTotalWordCount = (result: HistoryItem[]) => {
                let total: number = 0;

                result.forEach(element => {
                  if (element.aiResponse) {
                    const aiResponse = element.aiResponse.trim(); // Remove leading/trailing spaces
                    if (aiResponse.length > 0) {
                      // Only count words if the response is non-empty
                      const wordCount = aiResponse.split(/\s+/).filter(word => word !== "").length; // Ensure no empty words are counted
                      total += wordCount;
                    }
                  }
                });

                setTotalWords(total);
              }
      
  return (
    <div className='m-5 flex flex-col gap-3'>
      <div className='bg-primary text-white p-3 rounded-lg flex flex-col gap-3'>
            <h2 className='text-lg font-medium'>Credit</h2>
            {/* progress bar */}
            <div className='h-2 bg-[#9981f9] w-full rounded-full '>
                  <div className='h-2 rounded-full bg-white'
                  style={{width:(totalWords/10000)*100+"%"}}
                  >

                  </div>
            </div>
            <h2 className='text-sm text-gray-400'>{totalWords}/10,000 Credits Used</h2>
      </div>
      <Button className='w-full py-5 gap-3 text-primary font-medium' variant={'outline'}>Upgrade <ArrowBigUp/></Button>
    </div>
  )
}

export default UsageTrack