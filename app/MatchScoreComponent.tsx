"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Score } from "./ScoreSchema";
const Scorecard = (match: Score) => {
  const [showScore, setShowScore] = useState(false);
  return (
    <div className=" w-80 bg-slate-800 p-4 rounded-lg flex flex-col items-center justify-between">
      <div className="flex justify-evenly items-center w-full">
        <div className="flex flex-col items-center justify-between h-full">
          <p className="text-white font-bold">{match.homeTeam}</p>
          <img
            alt="away"
            src={match.homeLogo ?? "/next.svg"}
            width={50}
            height={50}
          />
          {showScore && <p className="text-white ml-2">{match.homeScore}</p>}
        </div>
        <div className="text-white text-center">vs</div>
        <div className="flex flex-col items-center justify-between h-full">
          <p className="text-white font-bold">{match.awayTeam}</p>
          <img
            alt="away"
            src={match.awayLogo ?? "/next.svg"}
            width={50}
            height={50}
          />
          {showScore && <p className="text-white ml-2">{match.awayScore}</p>}
        </div>
      </div>
      <Button
        className="mt-2"
        variant={"outline"}
        onClick={() => {
          setShowScore(!showScore);
        }}
      >
        Show score
      </Button>
    </div>
  );
};

export default Scorecard;
