export const runtime = "edge";

const sendMessage = async (message: string) => {
  try {
    const response = await fetch("/api/langflow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputValue: message }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to send message");
    }

    const data = await response.json();
    console.log("Langflow Response:", data);
    return data; // Return response for further handling if needed
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error sending message:", error.message);
      throw error;
    } else {
      console.error("Unknown error occurred");
    }
  }
};
export default sendMessage;
