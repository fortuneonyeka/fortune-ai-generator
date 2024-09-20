"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { Button } from "@/components/ui/button";
import { Copy, Trash2 } from "lucide-react";
import { lt, eq } from "drizzle-orm";
import toast, { Toaster } from "react-hot-toast";

// Update this interface to match your AIOutput table structure
interface HistoryItem {
  id: number;
  formData: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string | null;
  aiResponse: string | null;
}

const HistoryPage = () => {
      const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
      const [showFullResponse, setShowFullResponse] = useState<number | null>(null); // Track which item to show full response
    
      const fetchHistory = async () => {
        const results = await db
          .select()
          .from(AIOutput)
          .orderBy(AIOutput.createdAt);
        setHistoryItems(results);
      };
    
      const purgeOldHistory = async () => {
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    
        try {
          await db
            .delete(AIOutput)
            .where(lt(AIOutput.createdAt, fiveDaysAgo.toISOString()));
          await fetchHistory(); // Refresh after purging
        } catch (error) {
          console.error("Error purging old history:", error);
        }
      };
    
      useEffect(() => {
        fetchHistory();
        const dailyPurge = setInterval(purgeOldHistory, 24 * 60 * 60 * 1000);
        return () => clearInterval(dailyPurge);
      }, []);
    
      const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!", { duration: 2000, position: "bottom-right" });
      };
    
      const deleteItem = async (id: number) => {
        try {
          await db.delete(AIOutput).where(eq(AIOutput.id, id));
          toast.success("Item deleted successfully", { duration: 2000, position: "bottom-right" });
          await fetchHistory(); // Refresh after deletion
        } catch (error) {
          toast.error("Failed to delete item", { duration: 2000, position: "bottom-right" });
        }
      };
    
      const toggleResponse = (id: number) => {
        setShowFullResponse((prevId) => (prevId === id ? null : id)); // Toggle between full and truncated response
      };
    
      return (
        <div className="container mx-auto p-4">
          <Toaster />
          <h1 className="text-2xl font-bold mb-4">Search History</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {historyItems.map((item) => {
              const cleanedFormData = item.formData.split(/[{}"]/).join(''); // Clean up formData
              const responseWords = item.aiResponse?.split(" ") || [];
              const truncatedResponse = responseWords.slice(0, 20).join(" "); // Get first 20 words
    
              return (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="mb-4">
                    <p>
                      <strong>{cleanedFormData.slice(0, 6)}</strong>
                      {cleanedFormData.slice(6)}
                    </p>
                  </div>
    
                  <h2 className="font-semibold text-lg mb-2">Result:</h2>
                  <div className="mb-4">
                    <p>
                      {showFullResponse === item.id
                        ? item.aiResponse // Show full response if toggled
                        : `${truncatedResponse}...`} {/* Show truncated response */}
                    </p>
                    {responseWords.length > 30 && (
                      <button
                        className="text-blue-500 underline"
                        onClick={() => toggleResponse(item.id)}
                      >
                        {showFullResponse === item.id ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
    
                  <div className="">
                    <span className="text-sm text-gray-500">
                      <p>Created on : {item.createdAt ? item.createdAt : "Date not available"}</p>
                      <p>Created by: {item.createdBy}</p>
                    </span>
    
                    <div className="flex lg:flex-col gap-2 py-4">
                      <Button
                        className="flex gap-2"
                        onClick={() => item.aiResponse && copyToClipboard(item.aiResponse)}
                        disabled={!item.aiResponse}
                      >
                        <Copy size={16} className="sm:block md:hidden lg:block" />
                        <span className="hidden md:block">Copy</span>
                      </Button>
    
                      <Button
                        className="flex gap-2 hover:bg-red-700"
                        onClick={() => deleteItem(item.id)}
                        variant="destructive"
                      >
                        <Trash2 size={16} className="sm:block md:hidden lg:block" />
                        <span className="hidden md:block">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };
    
    export default HistoryPage;
