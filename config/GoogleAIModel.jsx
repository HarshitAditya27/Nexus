/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'reference to:\n{\n   "time": 1550476186479,\n   "blocks": [\n      {\n         "id": "oUq2g_tl8y",\n         "type": "header",\n         "data": {\n            "text": "Editor.js",\n            "level": 2\n         }\n      },\n      {\n         "id": "zbGZFPM-iI",\n         "type": "paragraph",\n         "data": {\n            "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."\n         }\n      },\n      {\n         "id": "qYIGsjS5rt",\n         "type": "header",\n         "data": {\n            "text": "Key features",\n            "level": 3\n         }\n      },\n      {\n         "id": "XV87kJS_H1",\n         "type": "list",\n         "data": {\n            "style": "unordered",\n            "items": [\n               "It is a block-styled editor",\n               "It returns clean data output in JSON",\n               "Designed to be extendable and pluggable with a simple API"\n            ]\n         }\n      },\n      {\n         "id": "AOulAjL8XM",\n         "type": "header",\n         "data": {\n            "text": "What does it mean «block-styled editor»",\n            "level": 3\n         }\n      },\n      {\n         "id": "cyZjplMOZ0",\n         "type": "paragraph",\n         "data": {\n            "text": "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\\"cdx-marker\\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core."\n         }\n      }\n   ],\n   "version": "2.8.1"\n}\n',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "time": 1688746367721,\n  "blocks": [\n    {\n      "id": "O2kZ_q_y8",\n      "type": "header",\n      "data": {\n        "text": "Grocery Todo List",\n        "level": 1\n      }\n    },\n    {\n      "id": "Z3nB7k911j",\n      "type": "paragraph",\n      "data": {\n        "text": "Keep track of your grocery shopping with this handy todo list!"\n      }\n    },\n    {\n      "id": "L8o1J6_oZ",\n      "type": "list",\n      "data": {\n        "style": "unordered",\n        "items": [\n          "Milk",\n          "Eggs",\n          "Bread",\n          "Cheese",\n          "Apples"\n        ]\n      }\n    },\n    {\n      "id": "M7Z_s4d_t3",\n      "type": "paragraph",\n      "data": {\n        "text": "You can add, remove, and edit items in the list to your heart\'s content!"\n      }\n    }\n  ],\n  "version": "2.8.1"\n}\n```\n\n**Explanation:**\n\n* **"time": 1688746367721** - Timestamp of when the content was created/modified.\n* **"blocks": []** - An array containing the blocks of content in the editor.\n* **"version": "2.8.1"** - Version of Editor.js the content is compatible with.\n\n**Blocks:**\n\n* **Header:** A heading for the todo list.\n* **Paragraph:** Introductory text explaining the purpose of the list.\n* **List:** The core of the todo list, containing the grocery items.\n* **Paragraph:** Another paragraph explaining how to interact with the list.\n\n**Customization:**\n\nYou can easily customize this template by:\n\n* **Adding more items** to the list.\n* **Changing the text** in the paragraphs.\n* **Adding new blocks** like code blocks or images to provide additional information.\n* **Using different block types** available in Editor.js (e.g., "quote", "code", "image").\n\nThis template provides a basic structure for a grocery todo list. You can expand on this template and customize it further to suit your specific needs. \n',
        },
      ],
    },
  ],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());
