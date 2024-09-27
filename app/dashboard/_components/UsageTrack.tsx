import React from 'react'

const UsageTrack = () => {
  return (
    <div className='m-5'>
      <div className='bg-primary text-white p-3 rounded-lg'>
            <h2 className='text-lg font-medium'>Credit</h2>
            {/* progress bar */}
            <div className='h-2 bg-[#9981f9] w-full rounded-full mt-3'>
                  <div className='h-2 rounded-full bg-white'
                  style={{width:"35%"}}
                  >

                  </div>
            </div>
      </div>
    </div>
  )
}

export default UsageTrack