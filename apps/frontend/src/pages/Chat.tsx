import { useApp } from "../contexts/AppContext";
import { ChatView } from "@s2m-pac/ui";

export function Chat() {
  const { messages } = useApp();

  return (
    <div className="max-w-4xl mx-auto h-full">
      <ChatView messages={messages} />
    </div>
  );
}
