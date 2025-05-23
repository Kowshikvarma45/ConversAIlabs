
---

##  ConversAIlabs

ConversAIlabs is a powerful API integration backend that allows you to create AI voice agents dynamically with two popular providers:

- **Vapi.ai** (for voice-first AI agents)
- **Retell.ai** (for real-time conversational AI)

With just a simple API call, you can spin up new AI agents, customize their voices, models, and seamlessly manage their creation.

---

## Features
- Create AI agents dynamically via API
- Choose between **Vapi** and **Retell** as providers
- Easy switching between models and voices
- Clean, typed Node.js (Express) backend
- Flexible and scalable architecture

---

##  Tech Stack
- Node.js
- Express.js
- TypeScript
- Axios for API requests
- dotenv for environment management
- CORS for secure API access

---

##  Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/conversailabs.git
   cd conversailabs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up `.env` file:
   ```bash
   PORT=3000
   VAPI_API_KEY=your_vapi_api_key
   RETELL_API_KEY=your_retell_api_key
   ```

4. Start the server:
   ```bash
   npm test
   ```

---

## API Usage

### Endpoint: `/create-agent`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "provider": "vapi", // or "retell"
    "name": "Agent Name",
    "firstMessage": "Hello, how can I help you?", // (only for Vapi)
    "voiceId": "voice-id-here",
    "model": "gpt-3.5-turbo", // (only for Vapi)
    "llm_id": "your-llm-id" // (only for Retell)
  }
  ```

---

##  Quick Notes
- For **Vapi**, you'll need a **Public API Key** from [Vapi.ai](https://vapi.ai).
- For **Retell**, you'll need your **API key** and an **LLM ID**.
- Make sure your voice IDs match the provider's requirements.
- Everything is handled dynamically inside one simple route.

---

## Author
Made with ❤️ by [Kowshik varma kucharallapati]  
GitHub: [@your-github](https://github.com/Kowshikvarma45)

---
