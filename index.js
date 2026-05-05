
```javascript
const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic();

// Sample financial news articles for analysis
const newsArticles = [
  {
    id: 1,
    title: "Tech Stock Surge: AI Companies Rally on Strong Earnings",
    content:
      "Technology stocks experienced a significant rally today as major AI companies reported better-than-expected quarterly earnings. Investors showed strong confidence in the sector's growth prospects.",
    source: "Financial Times",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Market Correction Sparks Concerns Over Economic Growth",
    content:
      "Stock indices declined sharply today amid worries about slowing economic growth and rising inflation. Analysts warn that consumer spending may weaken in coming months.",
    source: "Bloomberg",
    date: "2024-01-14",
  },
  {
    id: 3,
    title: "Central Bank Maintains Interest Rates, Hints at Future Cuts",
    content:
      "The Federal Reserve kept interest rates unchanged but signaled potential rate cuts ahead, citing moderating inflation. Markets responded positively to the dovish guidance.",
    source: "Reuters",
    date: "2024-01-13",
  },
  {
    id: 4,
    title: "Energy Sector Faces Headwinds as Oil Prices Plummet",
    content:
      "Oil prices fell to a six-month low today, pressuring energy sector stocks. Analysts attribute the decline to oversupply concerns and weakening global demand.",
    source: "MarketWatch",
    date: "2024-01-12",
  },
  {
    id: 5,
    title: "Retail Sales Beat Expectations, Boosting Consumer Confidence",
    content:
      "Monthly retail sales came in above forecasts, suggesting consumers remain resilient despite economic headwinds. The data bolstered optimism about the economy's trajectory.",
    source: "CNBC",
    date: "2024-01-11",
  },
];

// Multi-turn conversation to analyze sentiments
async function analyzeSentiments() {
  const conversationHistory = [];

  console.log("🔍 Financial News Sentiment Analysis Bot");
  console.log("========================================\n");

  // First turn: Ask Claude to analyze all articles
  console.log("📊 Analyzing sentiment of financial news articles...\n");

  const articlesText = newsArticles
    .map(
      (article) =>
        `Article ${article.id}:\nTitle: ${article.title}\nContent: ${article.content}\nSource: ${article.source}\nDate: ${article.date}`
    )
    .join("\n\n");

  const firstMessage = `You are a financial sentiment analysis expert. Analyze the following news articles and provide:
1. Overall sentiment for each article (Positive, Negative, or Neutral)
2. A sentiment score from -1 (very negative) to 1 (very positive)
3. Key sentiment drivers for each article

Here are the articles:

${articlesText}

Please analyze each article systematically.`;

  conversationHistory.push({
    role: "user",
    content: firstMessage,
  });

  let response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1500,
    messages: conversationHistory,
  });

  let assistantMessage = response.content[0].text;
  conversationHistory.push({
    role: "assistant",
    content: assistantMessage,
  });

  console.log("Initial Analysis:\n");
  console.log(assistantMessage);
  console.log("\n" + "=".repeat(80) + "\n");

  // Second turn: Ask for market impact summary
  console.log("📈 Analyzing market impact...\n");

  const secondMessage =
    "Based on your sentiment analysis, what would be the overall market sentiment from these articles combined? Should investors be bullish or bearish? Provide a brief market outlook.";

  conversationHistory.push({
    role: "user",
    content: secondMessage,
  });

  response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1000,
    messages: conversationHistory,
  });

  assistantMessage = response.content[0].text;
  conversationHistory.push({
    role: "assistant",
    content: assistantMessage,
  });

  console.log("Market Impact Analysis:\n");
  console.log(assistantMessage);
  console.log("\n" + "=".repeat(80) + "\n");

  // Third turn: Ask for sector-specific insights
  console.log("🏭 Analyzing sector-specific trends...\n");

  const thirdMessage =
    "Which sectors appear most attractive and which ones should investors be cautious about based on the sentiment analysis? Provide specific recommendations.";

  conversationHistory.push({
    role: "user",
    content: thirdMessage,
  });

  response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1000,
    messages: conversationHistory,
  });

  assistantMessage = response.content[0].text;
  conversationHistory.push({
    role: "assistant",
    content: assistantMessage,
  });

  console.log("Sector-Specific Insights:\n");
  console.log(assistantMessage);
  console.log("\n" + "=".repeat(80) + "\n");

  // Fourth turn: Ask for sentiment trends
  console.log("📊 Analyzing sentiment trends...\n");

  const fourthMessage =
    "What overall trends do you see in financial sentiment across these articles? Are there any concerning patterns or opportunities investors should monitor?";

  conversationHistory.push({
    role: "user",
    content: fourthMessage,
  });

  response = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 