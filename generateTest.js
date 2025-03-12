import OpenAI from "openai";
import fs from "fs";

const API_URL = "https://api.deepseek.com";
const API_KEY = "";// Add your API key here

const openai = new OpenAI({
    baseURL: API_URL,
    apiKey: API_KEY,
});

const filePath1 = "node_modules/@rescui/use-glow-hover/lib/glow-hover-effect.d.ts";
const filePath2 = "node_modules/@rescui/use-glow-hover/lib/use-glow-hover.d.ts";
const documentationPath = "DOCUMENTATION.md";

const fileContent1 = fs.readFileSync(filePath1, "utf-8");
const fileContent2 = fs.readFileSync(filePath2, "utf-8");
const documentationContent = fs.readFileSync(documentationPath, "utf-8");

const TEST_PROMPT = `
# **Task: Generate High-Quality Tests and Documentation**

You are an expert in **software testing** and **technical documentation**. Your goal is to create a **comprehensive and professional TESTING.md** that contains:

 **Clear setup & run instructions**  
 **Highly maintainable & structured tests**  
 **Full test coverage for the \`useGlowHover\` React hook**  
 **A focus on quality, readability, and reusability**  

---

## ** TypeScript API Reference**
Below are the official **TypeScript definitions** of the package.  
Use them to generate meaningful tests.

\`\`\`typescript
${fileContent1}
\`\`\`

\`\`\`typescript
${fileContent2}
\`\`\`

---

## **Documentation**
Here is the official documentation for the package:

\`\`\`markdown
${documentationContent}
\`\`\`

---

## **Test Generation Guidelines**
All tests **must be runnable**, structured, and meaningful.

### **Test Types to Generate**
#### **Unit Tests**
   - **Basic Usage**: Minimal setup of \`useGlowHover\`.
   - **Advanced Usage**: All available options used.
   - **Edge Cases**: Invalid inputs, unexpected states.

#### **Integration Tests**
   - Ensure \`useGlowHover\` works with multiple components together.
   - Verify hover effects are correctly applied across elements.

#### **Visual Regression Tests**
   - Use **Jest Snapshots** + Storybook or Percy for UI validation.
   - Ensure glow effects render consistently across updates.

#### **Accessibility Tests**
   - Validate **color contrast compliance**.
   - Ensure **keyboard accessibility** (Tab, Enter, Space).

#### **Performance & Stress Tests**
   - **Test 100+ elements** with \`useGlowHover\` to detect lag.
   - Ensure smooth animations without frame drops.

#### **Cross-Browser & Mobile Tests**
   - Simulate **Chrome, Firefox, Safari, Edge**.
   - Validate **touch interactions** for mobile.

#### **Error Handling & Edge Cases**
   - Test **invalid inputs**, null refs, and unmount scenarios.
   - Ensure rapid hover in/out events **don't break animations**.

#### **Snapshot Testing**
   - Capture DOM structure before & after applying \`useGlowHover\`.

---

## **TESTING.md Requirements**
Your output must be a **well-structured TESTING.md** file. It must include:

1. **Installation & Setup**
   - How to install dependencies.
   - How to configure Jest & React Testing Library.

2. **Running the Tests**
   - Commands to execute tests.

3. **Test Coverage**
   - How to check coverage.

4. **Dependencies**
   - Required packages.

5. **Troubleshooting**
   - Solutions to common issues.

---

## **Output Format**
You must return everything inside a **single TESTING.md** file.  

Ensure:  
Tests are **correct and runnable**.  
Code is **well-commented and structured**.  
Documentation is **clear, concise, and professional**.

**Important:** Poorly written or redundant tests will NOT be accepted.

`;

async function generateTests() {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are an expert in software testing and documentation." },
                { role: "user", content: TEST_PROMPT },
            ],
            model: "deepseek-chat",
        });

        const testContent = completion.choices[0].message.content;

        fs.writeFileSync("TESTING.md", testContent, "utf-8");

        handleSuccess();
    } catch (error) {
        handleError(error.message);
    }
}

function handleSuccess() {
    fs.writeFileSync("success.log", "Tests and TESTING.md generated successfully.", "utf-8");
}

function handleError(error) {
    fs.writeFileSync("error.log", `Error: ${error}`, "utf-8");
}

generateTests();