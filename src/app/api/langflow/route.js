export const runtime = "edge";

import LangflowClient from "@/utils/LangflowClient";

export async function POST(req) {
  const { inputValue, inputType, outputType, stream, tweaks } =
    await req.json();

  // Replace these values with your actual configuration
  const flowIdOrName = process.env.NEXT_PUBLIC_FLOW_ID_OR_NAME;
  const langflowId = process.env.NEXT_PUBLIC_LANGFLOW_ID;
  const applicationToken = process.env.NEXT_PUBLIC_APPLICATION_TOKEN;

  const langflowClient = new LangflowClient(
    "https://api.langflow.astra.datastax.com",
    applicationToken
  );

  try {
    const response = await langflowClient.runFlow(
      flowIdOrName,
      langflowId,
      inputValue,
      inputType || "chat",
      outputType || "chat",
      tweaks || {},
      stream || false,
      (data) => console.log("Stream update:", data),
      (message) => console.log("Stream closed:", message),
      (error) => console.error("Stream error:", error)
    );

    let output;
    if (!stream && response && response.outputs) {
      const flowOutputs = response.outputs[0];
      const firstComponentOutputs = flowOutputs.outputs[0];
      output = firstComponentOutputs.outputs.message;
    }

    return new Response(JSON.stringify(output), { status: 200 });
  } catch (error) {
    console.error("API Error:", error.message);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
