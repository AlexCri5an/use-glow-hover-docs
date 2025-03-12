import OpenAI from "openai";
import fs from "fs";

const API_URL = "https://api.deepseek.com";
const API_KEY = ""; // Add your API key here

const openai = new OpenAI({
    baseURL: API_URL,
    apiKey: API_KEY,
});

const filePath1 = "node_modules/@rescui/use-glow-hover/lib/glow-hover-effect.d.ts";
const filePath2 = "node_modules/@rescui/use-glow-hover/lib/use-glow-hover.d.ts";

const fileContent1 = fs.readFileSync(filePath1, "utf-8");
const fileContent2 = fs.readFileSync(filePath2, "utf-8");

const PROMPT = `
You are an expert in technical writing and software documentation. 
Your task is to generate a **professional, high-quality Markdown documentation** file for the **@rescui/use-glow-hover** NPM package, focusing **only on the useGlowHover hook and its options**. 
The documentation must be clear, structured, and contain all necessary details for developers to use the package efficiently.

---
## **TypeScript Definitions**
Below are the **TypeScript API definition files** for the package. Use this information to extract **only the useGlowHover hook, its parameters, and its options** to generate structured documentation. **Ignore the glowHoverEffect function entirely.**
\\\typescript
${fileContent1}
\\\

\\\typescript
${fileContent2}
\\\
---

## **Documentation Guidelines**
Follow these guidelines carefully when structuring the documentation:

### **Title & Introduction**
   - The title should be the package name: \# @rescui/use-glow-hover\
   - Provide a **brief but clear introduction** explaining:
     - What the package does.
     - Its primary use cases.
   - Include **installation instructions** using both \npm\ and \yarn\:
     \\\sh
     npm install @rescui/use-glow-hover
     yarn add @rescui/use-glow-hover
     \\\

### **API Reference Table**
   - **Create a well-structured table** summarizing the API, with these columns:
     - **Function/Hook**: Name of the exported function or hook.
     - **Parameters**: Expected parameters with type information and descriptions.
     - **Returns**: Return value including type information.
   - Ensure that each function and hook is **described in detail**.

### **Detailed API Documentation**
   - For **each function/hook** extracted from the TypeScript file:
     - **Provide a full breakdown** with:
       - **Function name**
       - **Description**
       - **Parameters (name, type, description, optional/required)** as a markdown table.
       - **Return type**
       - **Example usage**
   - If there are **configurable options or types**, document them in a **separate options section**.

### **Usage Examples**
   - Provide **at least three code examples**:
     - **Basic Usage:** A minimal working example.
     - **Advanced Usage:** A more complex real-world use case.
     - **Customization Options:** If applicable, show how the behavior can be modified.
   - Use proper **syntax highlighting** for all code snippets (\typescript\ or \jsx\).

### **Frequently Asked Questions (FAQ)**
   - Include **common questions** developers might have about the package.
   - If possible, generate realistic questions **based on the API structure**.

### **License & Additional Information**
   - Mention the **license type** (e.g., MIT, Apache, etc.).
   - If possible, **add a reference link**.

---

## **Formatting Requirements**
- **Use proper Markdown syntax** (\#\, \##\, \###\).
- **Ensure tables are readable** and aligned correctly.
- **Maintain a professional tone** that is developer-friendly.
- **Ensure that the documentation is fully structured** and ready to be published.

**Important:** Extract all necessary information from the TypeScript file provided above and make sure to not leave any undocumented parameters or functions.
`;

async function generateDocumentation() {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are an expert in software documentation." },
                { role: "user", content: PROMPT },
            ],
            model: "deepseek-chat",
        });

        const documentation = completion.choices[0].message.content;

        fs.writeFileSync("DOCUMENTATION.md", documentation, "utf-8");
        handleSuccess();
    } catch (error) {
        handleError(error.message);
    }
}

function handleSuccess() {
    fs.writeFileSync("success.log", "Documentation generated successfully and saved as DOCUMENTATION.md", "utf-8");
}

function handleError(error) {
    fs.writeFileSync("error.log", `Error: ${error}`, "utf-8");
}

generateDocumentation();