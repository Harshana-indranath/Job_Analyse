import { OpenAI } from "openai";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store your API key in environment variables
  organization: process.env.OPENAI_ORGANIZATION_ID,
});

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    // Make a request to OpenAI API with a newer model (e.g., gpt-3.5-turbo)
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            'You are a recruiter with over twenty years of experience analyzing job postings. Your task is to analyze job postings and provide insights in a STRICTLY FORMATTED response with EXACTLY these sections in this order:\n\n1. "**Job Summary**" - A brief overview of the role\n2. "**Suggested Relevant Skills and Model Achievements**" - List each relevant skill followed by a bullet point showing a model achievement that demonstrates that skill\n3. "**Typical Pain Points for This Role**" - Common challenges\n4. "**Relevant Keywords for ATS Optimization**" - Keywords to include in a resume\n5. "**Action Verbs and Language Refinement**" - List 10-15 powerful action verbs that are specifically relevant to this role and would strengthen a resume. Format as a simple comma-separated list.\n6. "**Questions to Ask the Interviewer**" - Strategic questions for the interview\n\nFor the "Suggested Relevant Skills and Model Achievements" section, use this exact format:\n\n1. [Skill Name]\n  - [Specific achievement that demonstrates this skill]\n\n2. [Skill Name]\n  - [Specific achievement that demonstrates this skill]\n\nYou must ONLY use these exact section headers and maintain this exact order. Do not add, modify, or remove any sections. If the input provided contains random words like test, testing, text, etc., or is unrelated to a job posting, respond with: "The job posting is missing or invalid. Please provide a valid job posting to analyze."',
        },
        {
          role: "user",
          content: `Analyze the following job posting using EXACTLY these section headers in this order:\n\n**Job Summary**\n\n**Suggested Relevant Skills and Model Achievements**\n\n**Typical Pain Points for This Role**\n\n**Relevant Keywords for ATS Optimization**\n\n**Action Verbs and Language Refinement**\n\n**Questions to Ask the Interviewer**\n\nFor the "Suggested Relevant Skills and Model Achievements" section, list each skill with a numbered format, followed by a bullet point showing a specific achievement that demonstrates that skill. For example:\n\n1. Project Management\n  - Successfully led a team of 8 developers to deliver a $2M project on time and under budget\n\n2. Stakeholder Communication\n  - Implemented a new reporting system that improved client satisfaction scores by 40%\n\nDo not deviate from these exact headers or add any other sections.\n\nHere is the job posting:\n\n${prompt}`,
        },
      ],
    });

    const responseText = response.choices[0].message.content.trim();
    const invalidMessage =
      "The job posting is missing or invalid. Please provide a valid job posting to analyze.";

    // Check if response contains the invalid message
    const isInvalid = responseText.includes(invalidMessage);

    return new Response(
      JSON.stringify({ text: responseText, invalidInput: isInvalid }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
