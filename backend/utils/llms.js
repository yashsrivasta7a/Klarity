import { AzureChatOpenAI } from "@langchain/openai";
import dotenv  from "dotenv";
import { z } from "zod";

dotenv.config();
export const llm = new AzureChatOpenAI({
  azure: true,
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
  azureOpenAIApiDeploymentName: "gpt-4o",
  azureOpenAIApiVersion: "2024-04-01-preview",
  maxRetries: 1,
});

const schema = z.object({
  query : z.string().describe("Syntactically valid SQL query.")
})

export const Structuredllm  = llm.withStructuredOutput(schema)