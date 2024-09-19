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
      console.log("Old history purged successfully");
      // Fetch the updated history after purging
      await fetchHistory();
    } catch (error) {
      console.error("Error purging old history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();

    // Set up a daily check to purge old history
    const dailyPurge = setInterval(purgeOldHistory, 24 * 60 * 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(dailyPurge);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      duration: 2000,
      position: "bottom-right",
    });
  };

  const deleteItem = async (id: number) => {
    try {
      await db.delete(AIOutput).where(eq(AIOutput.id, id));
      toast.success("Item deleted successfully", {
        duration: 2000,
        position: "bottom-right",
      });
      await fetchHistory(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item", {
        duration: 2000,
        position: "bottom-right",
      });
    }
  };

  return (
      <div className="container mx-auto p-4">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Search History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {historyItems.map((item) => {
          // Remove braces and quotes from formData using split() and join()
          const cleanedFormData = item.formData.split(/[{}"]/).join('');
          
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              
              {/* Bold the first 6 letters and display the rest */}
              <div className="mb-4">
                <p className="capitalize">
                  <strong>{cleanedFormData.slice(0, 6)}</strong>
                  {cleanedFormData.slice(6)}
                </p>
              </div>
    
              <h2 className="font-semibold text-lg mb-2">Result:</h2>
              <p className="mb-4">{item.aiResponse || "No response available"}</p>
    
              <div className="flex flex-col justify-between items-center lg:flex-row">
                <span className="text-sm text-gray-500">
                  <p>Created on : {item.createdAt ? item.createdAt : "Date not available"}</p>
                  <p>Created by: {item.createdBy}</p>
                </span>
    
                <div className="flex gap-4 py-4">
                  <Button
                    className="flex gap-2"
                    onClick={() => item.aiResponse && copyToClipboard(item.aiResponse)}
                    disabled={!item.aiResponse}
                  >
                    <Copy size={16} className="sm:block md:hidden lg:block" />
                    <span className="hidden md:block">Copy</span>
                  </Button>
    
                  <Button
                    className="flex gap-2"
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
