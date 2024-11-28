"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Joke } from "./JokeSchema";
const JokeCard = (joke: Joke) => {
  const [showPunchline, setShowPunchline] = useState(false);
  return (
    <div className=" rounded-lg flex flex-col gap-2 justify-between">
      <p>{joke.setup}</p>
      {showPunchline && (
        <p className="text-red-500 font-bold ml-2">{joke.punchline}</p>
      )}
      <Button
        className="w-1/4 bg-slate-800"
        onClick={() => {
          setShowPunchline(!showPunchline);
        }}
      >
        {showPunchline ? "Hide" : "Show"} punchline
      </Button>
    </div>
  );
};

export default JokeCard;
