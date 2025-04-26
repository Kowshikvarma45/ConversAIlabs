import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = Number(process.env.PORT);


app.use(express.json());
app.use(cors());

interface CommonBody {
  name: string;
  firstMessage?: string;
  voiceId: string;
  model?: string;
  llm_id?: string;
}

interface CreateAgentRequestBody extends CommonBody {
  provider: "vapi" | "retell";
}

async function createVapiAgent(commonBody: CommonBody) {
  const url = "https://api.vapi.ai/assistant";

  const vapiPayload = {
    name: commonBody.name,
    firstMessage: commonBody.firstMessage,
    voice: {
      provider: "azure",
      voiceId: commonBody.voiceId,
    },
    model: {
      provider: "anyscale",
      model: commonBody.model,
    },
    transcriber: {
      provider: "assembly-ai",
      language: "en",
    },
  };

  const headers = {
    Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
    "Content-Type": "application/json",
  };

  const response = await axios.post(url, vapiPayload, { headers });
  return response.data;
}

async function createRetellAgent(commonBody: CommonBody) {
  const url = "https://api.retellai.com/agent";

  const retellPayload = {
    response_engine: {
      llm_id: commonBody.llm_id,
      type: "retell-llm",
    },
    voice_id: commonBody.voiceId,
    agent_name: commonBody.name,
  };

  const headers = {
    Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
    "Content-Type": "application/json",
  };

  const response = await axios.post(url, retellPayload, { headers });
  return response.data;
}

// Fixed handler with proper TypeScript typing
const createAgentHandler = async (req: Request<{}, {}, CreateAgentRequestBody>, res: Response): Promise<void> => {
  const { provider, ...commonBody } = req.body;
  
  try {
    if (!provider || !["vapi", "retell"].includes(provider)) {
      res.status(400).json({ error: "Invalid provider. Use 'vapi' or 'retell'." });
      return;
    }

    let result;
    if (provider === "vapi") {
      if (!commonBody.model || !commonBody.firstMessage) {
        res.status(400).json({ error: "Missing required fields for VAPI agent" });
        return;
      }
      result = await createVapiAgent(commonBody);
    } else {
      if (!commonBody.llm_id) {
        res.status(400).json({ error: "Missing required llm_id for Retell agent" });
        return;
      }
      result = await createRetellAgent(commonBody);
    }

    res.status(201).json(result);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data || "Something went wrong";
    res.status(statusCode).json({ error: errorMessage });
  }
};

app.post("/create-agent", createAgentHandler);

app.listen(port, () => {
  console.log("LISTENING TO PORT NUMBER:", port);
});