const OpenAI = require('openai');

const openai = new OpenAI({apiKey: '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'});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();