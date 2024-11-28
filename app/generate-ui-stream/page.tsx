"use client";

import { useState } from "react";
import { ClientMessage } from "./action";
import { useActions, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();
  async function myFunc() {
    setInput("");
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: nanoid(), role: "user", display: input },
    ]);

    const message = await continueConversation(input);

    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ]);
  }
  return (
    <div>
      <div>
        {conversation.map((message: ClientMessage) => (
          <div key={message.id}>
            {message.role}: {message.display}
          </div>
        ))}
      </div>

      <form className="flex w-2/3 gap-2 items-center p-8" action={myFunc}>
        <Input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <Button>Send Message</Button>
      </form>
    </div>
  );
}
