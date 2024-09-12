import React, { useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

const OutPutSection = () => {
  const editorRef:any = useRef()
  return (
     
       
    <div className='bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
        <div className="flex border-b p-5 justify-between items-center">
        <h2 className='font-semibold text-lg'>Your Output</h2>
        <Button className='flex gap-2'><Copy/>Copy</Button>
      </div>
      <Editor
      ref={editorRef}
    initialValue="hello react editor world!"
    previewStyle="vertical"
    height="600px"
    initialEditType="wysiwwyg"
    useCommandShortcut={true}
    onChange={() =>console.log(editorRef.current.getInstance().getMarkdown())
    }
  />
    </div>
   
  )
}

export default OutPutSection