// Articles hub. Each article is a card on Home (rendered by the same
// ProjectCard component, so the two sections stay visually identical) and a
// page at /articles/:slug. Add new articles as objects here.
//
// Card fields mirror a project card: title, summary, tags, metric (the small
// mono line, used here for the date), motif (thumbnail), status.
//
// `body` is the long-form content, rendered by pages/Article.jsx. Blocks:
//   { type: 'h2',  text }                     section heading
//   { type: 'p',   text, lead?, strong? }     paragraph; `lead` is a bold
//                                             lead-in, `strong` marks a
//                                             standalone key statement
//   { type: 'ol',  items: [{ lead, text }] }  numbered list, bold lead-ins
// A block's `text` is a string, or an array of strings and { em } parts for
// inline italics (used for cited titles).

const whatIsAnAgent = [
  {
    type: 'p',
    text: 'The word “agent” is everywhere right now, and it means slightly different things to different people. Before building anything with one, it helps to be precise about what it actually is, and, just as importantly, when you do not need one.',
  },

  { type: 'h2', text: 'The simplest definition' },
  {
    type: 'p',
    strong: true,
    text: 'An agent is a system where a language model directs its own steps.',
  },
  {
    type: 'p',
    text: 'That is the whole idea. You give it a goal, and it decides what to do next: which tool to call, what to read, whether it is finished or needs another loop. The model stays in control of how the task gets done.',
  },
  {
    type: 'p',
    text: 'Compare that to a normal program, where a developer writes the steps in advance. In a normal program, the path is fixed. In an agent, the path is decided at runtime by the model, based on what it observes along the way.',
  },

  { type: 'h2', text: 'Agents vs. workflows' },
  {
    type: 'p',
    text: [
      'This distinction matters, and Anthropic draws it cleanly in their guide ',
      { em: 'Building Effective Agents' },
      '. Both are “agentic systems,” but they are not the same thing:',
    ],
  },
  {
    type: 'p',
    lead: 'A workflow',
    text: 'orchestrates a model and tools through predefined code paths. The developer decides the sequence. The model fills in the pieces, but the structure is fixed. Example: “First summarize this document, then translate the summary, then email it.” The steps never change.',
  },
  {
    type: 'p',
    lead: 'An agent',
    text: 'lets the model direct its own process and tool use. No fixed sequence. The model looks at the situation, picks the next action, sees the result, and decides again, looping until the goal is met. Example: “Resolve this bug.” The model reads the code, runs tests, tries a fix, checks the result, and iterates, without anyone scripting those steps ahead of time.',
  },
  {
    type: 'p',
    lead: 'The rule of thumb:',
    text: 'workflows give you predictability; agents give you flexibility.',
  },

  { type: 'h2', text: 'The three parts of an agent' },
  {
    type: 'p',
    text: 'Under the surface, an agent is simpler than it sounds. It is a loop with three moving parts:',
  },
  {
    type: 'ol',
    items: [
      {
        lead: 'The model',
        text: 'the reasoning core that decides what to do next.',
      },
      {
        lead: 'Tools',
        text: 'the actions it can take: search a database, call an API, run code, read a file. Tools are how the model reaches outside its own text.',
      },
      {
        lead: 'The loop',
        text: 'observe, act, observe the result, act again, until the task is done or a stopping condition is hit.',
      },
    ],
  },
  {
    type: 'p',
    text: 'Retrieval often lives inside this loop too: when the model needs information it does not have, it fetches the relevant context (this is where RAG and search come in) and feeds it back into its next decision.',
  },

  { type: 'h2', text: 'The part most people skip: when not to build one' },
  {
    type: 'p',
    text: 'Here is the counterintuitive lesson, and it comes straight from the teams building these systems in production: most tasks do not need an agent.',
  },
  {
    type: 'p',
    text: 'Agents buy you flexibility, but they cost you something in return: higher latency, higher token cost, and a harder time predicting what will happen. Every extra step the model takes on its own is another place things can go wrong, and small errors compound across a loop.',
  },
  {
    type: 'p',
    text: 'So the honest engineering answer is to start with the simplest thing that works. Often a single well-designed model call, or a fixed workflow, solves the problem with far more reliability than an autonomous agent would. You add agency only when the flexibility is genuinely worth the cost, when the path really cannot be known in advance.',
  },
  {
    type: 'p',
    text: 'That judgment, knowing where an agent earns its complexity and where a simpler approach wins, is the actual skill. The interesting question is rarely “can I build an agent for this?” It is “should I?”',
  },

  { type: 'h2', text: 'In one sentence' },
  {
    type: 'p',
    strong: true,
    text: 'An agent is a system that lets a language model choose its own steps toward a goal, useful when the path is unpredictable, and worth reaching for only when a simpler design would not do.',
  },
]

export const articles = [
  {
    slug: 'what-is-an-agent',
    title: 'What is an Agent?',
    summary:
      'What an agent actually is, how it differs from a workflow, and when not to build one.',
    tags: ['Agents'],
    metric: 'August 2026',
    motif: 'router',
    status: 'live',
    body: whatIsAnAgent,
  },
]

export const getArticle = (slug) => articles.find((a) => a.slug === slug)
