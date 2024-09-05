"use client"
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'

const Dashboard = () => {
  const [userSearchInput, setUserSearchInput] = useState<string>()

  const handleSearchInput = (value:string) => {
    
    setUserSearchInput(value);
    
    
  }

  return (
    <div>
      {/* Search section */}
      <SearchSection onSearchInput={handleSearchInput}/>

      {/* Template list section */}
      <TemplateListSection userSearchInput={userSearchInput}/>
    </div>
  )
}

export default Dashboard