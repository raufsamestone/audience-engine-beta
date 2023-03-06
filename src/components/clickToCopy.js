import { useState } from "react";

export default function ClickToCopy({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <button
      className="bg-gray-100 rounded py-1 px-2 hover:bg-gray-300 text-xs focus:outline-none"
      onClick={handleCopy}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
