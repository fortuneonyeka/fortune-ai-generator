import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";

interface PROPS {
  aiOutput: string;
}

const OutPutSection = ({ aiOutput }: PROPS) => {
  const editorRef = useRef<any>(null);

  const handleCopy = async () => {
    const editorInstance = editorRef.current?.getInstance();

    if (editorInstance) {
      const markdownContent = editorInstance.getMarkdown(); // Get current content as markdown

      try {
        await navigator.clipboard.writeText(markdownContent); // Copy content to clipboard
        toast.success("Copied to clipboard!", { duration: 2000, position: "bottom-right" });
      } catch (error) {
        console.error("Failed to copy text:", error);
      }
    }
  };


  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    
    // Ensure editorInstance is initialized before calling setMarkdown
    if (editorInstance) {
      editorInstance.setMarkdown(aiOutput || ""); // Set aiOutput or empty string if not available
    }
  }, [aiOutput]);

  return (
    <div className="bg-white rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-black">
      <Toaster />
      <div className="flex border-b p-5 justify-between items-center">
        <h2 className="font-semibold text-lg">Your Output</h2>
        <Button className="flex gap-2"
        onClick={handleCopy}>
          <Copy />
          Copy
        </Button>
      </div>

      <Editor
        ref={editorRef}
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg" // Corrected typo
        useCommandShortcut={true}
        // onChange={() => console.log(editorRef.current?.getInstance().getMarkdown())}
      />
    </div>
  );
};

export default OutPutSection;
