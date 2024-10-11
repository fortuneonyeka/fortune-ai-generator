"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowBigUp } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { HistoryItem } from "../history/_components/HistoryPage";
import { TotalUsageContext } from "@/app/context/TotalUsageContext";
import { useRouter } from "next/navigation";

const UsageTrack = () => {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const router = useRouter();

  useEffect(() => {
    user && GetData();
  }, [user]);

  const GetData = async () => {
    const result: HistoryItem[] = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress));

    GetTotalWordCount(result);
  };

  const GetTotalWordCount = (result: HistoryItem[]) => {
    let total: number = 0;

    result.forEach((element) => {
      if (element.aiResponse) {
        const aiResponse = element.aiResponse.trim(); // Remove leading/trailing spaces
        if (aiResponse.length > 0) {
          // Only count words if the response is non-empty
          const wordCount = aiResponse
            .split(/\s+/)
            .filter((word) => word !== "").length; // Ensure no empty words are counted
          total += wordCount;
        }
      }
    });

    setTotalUsage(total);
  };

  return (
    <div className="m-5 flex flex-col gap-3">
      <div className="bg-primary text-white p-3 rounded-lg flex flex-col gap-3">
        <h2 className="text-lg font-medium">Credit</h2>
        {/* progress bar */}
        <div className="h-2 bg-[#9981f9] w-full rounded-full ">
          <div
            className="h-2 rounded-full bg-white"
            style={{ width: (totalUsage / 10000) * 100 + "%" }}
          ></div>
        </div>
        <h2 className="text-sm text-gray-400">
          {totalUsage}/10,000 Credits Used
        </h2>
      </div>
      <Button
        onClick={() => router.push("/dashboard/billing")}
        className="w-full py-5 gap-3 text-primary font-medium"
        variant={"outline"}
      >
        Upgrade <ArrowBigUp />
      </Button>
    </div>
  );
};

export default UsageTrack;
