"use client";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { ChatMessage } from "./actions";
import { nanoid } from "nanoid";
export default function Home() {
  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();
  const assistantClass = "bg-slate-100 rounded-lg p-4 ";
  const userClass = "bg-slate-800 rounded-lg p-4 text-white";
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messagesRef.current?.clientHeight, conversation]);
  return (
    <div className="flex flex-col justify-end p-20 h-[100vh] gap-4 max-w-[900px] m-auto ">
      <div
        ref={containerRef}
        className="w-full h-[80vh]flex flex-col justify-end overflow-scroll  "
      >
        <div
          ref={messagesRef}
          className="flex flex-col gap-4 w-full items-start justify-end "
        >
          {conversation.map((message: ChatMessage) => (
            <div
              className={`${
                message.role == "assistant" ? assistantClass : userClass
              }`}
              key={message.id}
            >
              {message.display}
            </div>
          ))}
        </div>
      </div>
      <form
        className="flex w-full gap-2 items-center"
        onSubmit={async (e) => {
          e.preventDefault();
          e.preventDefault();
          setInput("");
          setConversation((currentConversation: ChatMessage[]) => [
            ...currentConversation,
            { id: nanoid(), role: "user", display: input },
          ]);

          const message = await continueConversation(input);

          setConversation((currentConversation: ChatMessage[]) => [
            ...currentConversation,
            message,
          ]);
        }}
      >
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Gen UI</Button>
      </form>
    </div>
  );
}
