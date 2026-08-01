// Articles hub. A planned series, so array order below IS the display order:
// the list renders it as written and never sorts. Each entry is a row in the
// Articles list on Home; published ones are also a page at /articles/:slug.
//
// `status` drives the list:
//   'live'   published; the row links to its page and needs a `body`
//   'draft'  planned; the row renders muted and inert, no link, no page
// Publishing is a matter of flipping status to 'live' and adding a body.
//
// Fields: title, summary and status are all the list renders. `tags` and
// `metric` appear on the article page header; `motif` is currently unused
// (kept from when the list was cards), harmless to leave.
//
// `body` is the long-form content, rendered by pages/Article.jsx. Blocks:
//   { type: 'h2',  text }                      section heading
//   { type: 'p',   text, lead?, strong? }      paragraph; `lead` is a bold
//                                              lead-in, `strong` marks a
//                                              standalone key statement
//   { type: 'ol',  items: [{ lead?, text }],   numbered list; `lead` is an
//                  start? }                    optional bold lead-in, `start`
//                                              continues an earlier list's
//                                              numbering
//   { type: 'ul',  items: [{ lead?, text }] }  same, unordered: for a set
//                                              of parts with no sequence
// A block's `text` is a string, or an array of parts: plain strings, { em }
// for inline italics (cited titles, defined terms), and
// { link: { href, text } } for an inline external hyperlink.

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

const aboutRag = [
  {
    type: 'p',
    text: 'An agent that can only answer from what it memorized during training is limited in an obvious way: it does not know your documents, your codebase, or anything that happened after it was trained. RAG is the standard fix. It is also one of the most over-applied patterns in the field, which makes it worth understanding properly.',
  },

  { type: 'h2', text: 'What it actually is' },
  {
    type: 'p',
    strong: true,
    text: 'RAG stands for retrieval-augmented generation. The idea is one sentence long: before the model answers, go fetch the relevant information and put it in front of the model.',
  },
  {
    type: 'p',
    text: 'That is it. You are not retraining anything. You are not changing the model’s weights. You are just doing a search first, and pasting the results into the prompt.',
  },
  {
    type: 'p',
    text: [
      'The name describes the two halves. ',
      { em: 'Retrieval' },
      ': find the relevant material. ',
      { em: 'Augmented generation' },
      ': the model generates its answer with that material in context.',
    ],
  },

  { type: 'h2', text: 'How it works' },
  { type: 'p', text: 'A standard RAG pipeline has two phases.' },
  {
    type: 'p',
    lead: 'Indexing,',
    text: 'done once, ahead of time:',
  },
  {
    type: 'ol',
    items: [
      {
        lead: 'Chunk',
        text: 'Split your documents into pieces. A 200-page manual becomes hundreds of smaller passages.',
      },
      {
        lead: 'Embed',
        text: 'Run each chunk through an embedding model, which turns text into a vector, a list of numbers that encodes meaning. Passages about similar things land near each other in that space.',
      },
      {
        lead: 'Store',
        text: 'Put the vectors in a vector database so they can be searched quickly.',
      },
    ],
  },
  {
    type: 'p',
    lead: 'Retrieval,',
    text: 'done on every query:',
  },
  {
    // `start: 4` so the second half of the pipeline keeps counting rather
    // than restarting at 1.
    type: 'ol',
    start: 4,
    items: [
      {
        text: 'Embed the question using the same model, so the query lives in the same space as the chunks.',
      },
      {
        text: 'Search for the chunks closest to the query vector, and take the top few.',
      },
      {
        lead: 'Generate',
        text: 'Hand those chunks to the model along with the original question.',
      },
    ],
  },
  {
    type: 'p',
    text: 'The payoff is concrete. Instead of stuffing a 100,000-token corpus into the context window, which is often impossible and always expensive, you send a few hundred tokens of the passages that actually matter. Lower cost, lower latency, and answers grounded in real source text rather than invented from memory.',
  },

  { type: 'h2', text: 'Why chunking is harder than it looks' },
  {
    type: 'p',
    text: 'Chunking sounds like a preprocessing detail. It is not. It decides what your system is capable of retrieving.',
  },
  {
    type: 'p',
    text: 'Make chunks too large and each one covers several topics at once. Its embedding becomes an average of all of them, matching everything vaguely and nothing precisely.',
  },
  {
    type: 'p',
    text: 'Make chunks too small and you shatter meaning. A sentence that only makes sense in the context of the paragraph above it becomes an orphan, retrievable but useless.',
  },
  {
    type: 'p',
    text: 'And any fixed-size split, no matter how you tune it, cuts through relationships. The definition of a term ends up in one chunk, the constraint that governs it in another, and vector search has no idea the two belong together. Nothing in a flat pile of chunks records that they were ever connected.',
  },

  { type: 'h2', text: 'Where RAG struggles' },
  {
    type: 'p',
    text: 'Knowing the failure modes is what separates using RAG from just deploying it.',
  },
  {
    type: 'p',
    lead: 'Multi-hop questions.',
    text: '“Which of our suppliers are affected by the policy we changed in March?” needs the policy, the suppliers, and the link between them. Vector search retrieves passages that look like the question, so it happily returns chunks about policies and chunks about suppliers, without ever connecting them. Similarity is not reasoning.',
  },
  {
    type: 'p',
    lead: 'Structure that chunking destroys.',
    text: 'Hierarchies, cross-references, and dependencies live in the relationships between passages. Flatten a document into independent chunks and that structure is gone.',
  },
  {
    type: 'p',
    lead: 'Too much of a good thing.',
    text: 'Retrieving more chunks to be safe fills the context window with near-duplicates and noise, which degrades the answer instead of improving it. More retrieval is not better retrieval.',
  },

  { type: 'h2', text: 'When to reach for it, and when not to' },
  {
    type: 'p',
    text: 'RAG earns its place when the knowledge is large, changes often, and lives outside the model. Company documentation, a codebase, a corpus of papers.',
  },
  {
    type: 'p',
    text: 'It is the wrong tool more often than people admit. If the relevant material fits in the context window, just put it there: a retrieval pipeline that returns the wrong three paragraphs is worse than pasting all ten. If the question is really a database query, such as how many orders shipped late in Q2, write the query, because semantic search over prose is a poor substitute for a WHERE clause. If the knowledge is stable and narrow, a well-written system prompt may cover it with no infrastructure at all.',
  },
  {
    type: 'p',
    text: 'And when plain vector search does fail, the answer is not always a bigger vector store. Sometimes it is keyword search alongside embeddings, or reranking the top results, or representing the connections between pieces explicitly rather than hoping similarity recovers them.',
  },
  {
    type: 'p',
    text: 'The measurable version of this question is the only one that matters: build the simplest retrieval you can, define what a correct answer looks like, and check whether the more complex approach actually beats it. Often it does not.',
  },

  { type: 'h2', text: 'In one sentence' },
  {
    type: 'p',
    strong: true,
    text: 'RAG is search placed in front of generation, powerful when your knowledge is too large or too fresh to live in the model, and worth the pipeline only when a simpler way of getting the right text in front of the model would not do.',
  },
]

const mcp = [
  {
    type: 'p',
    text: 'Every useful agent needs to reach outside itself: read a file, query a database, call an API. The awkward part was never the reaching. It was that every model and every tool had to be wired together by hand, one pair at a time. MCP is the attempt to stop doing that.',
  },

  { type: 'h2', text: 'The problem it solves' },
  {
    type: 'p',
    text: 'Say you have three AI applications and five systems you want them to touch: your file system, a database, GitHub, Slack, and an internal API. Without a shared standard, you write fifteen integrations. Add a sixth system and you write three more. Add a fourth application and you write five more.',
  },
  {
    type: 'p',
    text: 'This is the M times N problem. Every model-to-tool pairing is its own piece of custom code, with its own auth handling, its own error cases, and its own maintenance burden. Nothing you build for one application transfers to another.',
  },
  {
    type: 'p',
    strong: true,
    text: 'MCP turns that into M plus N. Each application implements the protocol once. Each system exposes itself through the protocol once. Then anything can talk to anything.',
  },
  {
    type: 'p',
    text: 'That is the whole pitch. MCP is not intelligence, and it is not a framework for building agents. It is a standard interface between models and the outside world, in the same way USB is a standard interface between computers and devices. Anthropic published it as an open standard in November 2024.',
  },

  { type: 'h2', text: 'How it is put together' },
  { type: 'p', text: 'MCP uses a client-server architecture with three roles.' },
  {
    type: 'ol',
    items: [
      {
        lead: 'The host',
        text: 'the AI application itself: Claude Desktop, an IDE, your own agent.',
      },
      {
        lead: 'The client',
        text: 'lives inside the host and speaks the protocol, maintaining one connection per server.',
      },
      {
        lead: 'The server',
        text: 'wraps an external system and exposes what it can do in a standard shape.',
      },
    ],
  },
  {
    type: 'p',
    text: 'A server publishes its capabilities in a form the model can discover at runtime. This is the part that matters and is easy to miss. With a traditional API, the developer has to know in advance what endpoints exist and hardcode the calls. With MCP, the agent can ask the server what it offers and decide what to use from the answer. The tool surface is discovered, not hardcoded.',
  },

  { type: 'h2', text: 'The three primitives' },
  {
    type: 'p',
    text: 'An MCP server exposes three kinds of things, and the distinction between them is not cosmetic.',
  },
  {
    type: 'p',
    lead: 'Tools',
    text: 'are functions the model can call to do something: create an issue, run a query, send a message. Actions with consequences.',
  },
  {
    type: 'p',
    lead: 'Resources',
    text: 'are data the model can read for context: documents, files, database rows. Passive material.',
  },
  {
    type: 'p',
    lead: 'Prompts',
    text: 'are reusable templates the server provides, so an organization can standardize how the model should approach a certain task.',
  },
  {
    type: 'p',
    text: 'The reason to keep tools and resources separate is operational. Reading a document is low-risk. Calling a function that writes to a production system is a different category of action entirely. Splitting them lets you apply different authorization rules to each, rather than treating every capability as equally dangerous.',
  },

  { type: 'h2', text: 'What MCP does not do' },
  {
    type: 'p',
    text: 'It is worth being clear about the boundaries, because the term gets stretched.',
  },
  {
    type: 'p',
    text: 'MCP does not make your agent smarter. It does not decide which tool to call, or when, or how to recover when the call fails. That is the agent’s job, and it remains just as hard as it was before. A standard connector solves the plumbing, not the reasoning.',
  },
  {
    type: 'p',
    text: 'It also does not automatically make things better. Exposing fifty tools through a tidy protocol still puts fifty tool descriptions in front of the model, and a model choosing among fifty options makes worse choices than one choosing among five. Standardizing access is not the same as designing the surface well. Every tool you expose should still justify why it exists.',
  },
  {
    type: 'p',
    text: 'And it carries the risks any connector carries. Tool descriptions come from the server, and the model reads them as instructions. If you do not trust the server, you should not trust its descriptions. Permissioning, and knowing what a tool actually does before you let it run, stay your responsibility.',
  },

  { type: 'h2', text: 'When it earns its place' },
  {
    type: 'p',
    text: 'MCP is worth it when you have more than one of something. More than one application that needs the same tools, or more than one system that many applications will need. That is exactly where the M times N cost shows up, and exactly where a shared protocol pays for itself.',
  },
  {
    type: 'p',
    text: 'If you have a single agent talking to a single internal API, a direct function call is simpler, faster to write, and easier to debug. Adopting a protocol to connect two things that will never be reused is ceremony, not architecture.',
  },
  {
    type: 'p',
    text: 'The honest test is the same one that applies to every layer of abstraction: does it remove more work than it adds? For a growing set of tools and clients, MCP clearly does. For a one-off script, it clearly does not.',
  },

  { type: 'h2', text: 'In one sentence' },
  {
    type: 'p',
    strong: true,
    text: 'MCP is a standard interface that lets any model talk to any tool without custom wiring for each pair, valuable exactly in proportion to how many pairs you have, and no substitute for deciding carefully which tools should exist at all.',
  },
]

const agentHarnessDesign = [
  {
    type: 'p',
    text: 'Most conversations about agent quality start with the model. Which one is smartest, which scores highest, which just shipped. It is the easiest variable to talk about and the one you have the least control over.',
  },
  {
    type: 'p',
    text: [
      'The variable you actually control is everything around the model. That surrounding system has a name now: ',
      { em: 'the harness' },
      '.',
    ],
  },

  { type: 'h2', text: 'What the harness is' },
  {
    type: 'p',
    strong: true,
    text: 'If the model is the reasoning core, the harness is the machinery that turns it into a working agent.',
  },
  { type: 'p', text: 'Concretely, it is:' },
  {
    type: 'ul',
    items: [
      {
        lead: 'The execution loop',
        text: 'how many turns, when to stop, what happens on failure.',
      },
      {
        lead: 'The system prompt',
        text: 'the role, the constraints, the reasoning style you ask for.',
      },
      {
        lead: 'The tool registry',
        text: 'which tools exist, how they are described, which are available at which point.',
      },
      {
        lead: 'Context management',
        text: 'what goes into the window at each step, what gets summarized, what gets dropped.',
      },
      {
        lead: 'State and memory',
        text: 'what persists between steps, and how.',
      },
      {
        lead: 'Verification',
        text: 'how the agent checks its own work before handing it over.',
      },
    ],
  },
  {
    type: 'p',
    text: 'None of this is intelligence. All of it decides whether the intelligence gets used well.',
  },

  { type: 'h2', text: 'The evidence' },
  {
    type: 'p',
    text: [
      {
        link: {
          href: 'https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering',
          text: 'LangChain published a controlled version',
        },
      },
      ' of this. Holding the model fixed at GPT-5.2-Codex, they changed only the system prompt, the tools, and the middleware around it. Their coding agent went from 52.8% to 66.5% on Terminal Bench 2.0, moving from outside the Top 30 to fifth on the leaderboard. Same weights, same benchmark, 13.7 points from the harness alone.',
    ],
  },
  {
    type: 'p',
    text: [
      {
        link: {
          href: 'https://www.endorlabs.com/learn/gpt-5-5-sets-a-new-code-security-record-with-cursor-not-codex-in-agent-security-league',
          text: 'Endor Labs found the same effect',
        },
      },
      ' across vendors. GPT-5.5 scored 61.5% on functional correctness in OpenAI’s own Codex harness, and 87.2% in Cursor’s. Claude Opus 4.7 scored 87.2% in Claude Code and 91.1% in Cursor. Both frontier models did better in a competitor’s harness than in the one their own makers ship.',
    ],
  },
  {
    type: 'p',
    text: 'These are larger swings than most model upgrades deliver. And unlike a model upgrade, they are swings you can engineer.',
  },

  { type: 'h2', text: 'Why it works this way' },
  {
    type: 'p',
    text: 'A model does not experience your task. It experiences whatever text you put in its context window, in whatever order you put it there.',
  },
  { type: 'p', text: 'Three consequences follow.' },
  {
    type: 'p',
    lead: 'The model can only use tools it can understand.',
    text: 'A tool with a vague description gets called at the wrong time or not at all. The model is not reading your source code. It is reading one paragraph you wrote about what the tool does, and deciding from that.',
  },
  {
    type: 'p',
    lead: 'Context is a budget, not a bucket.',
    text: 'Naively appending every prior step fills the window with stale output until the actually relevant material is buried. What you retrieve, summarize, and prune is what the model reasons over. Everything else is noise competing for attention.',
  },
  {
    type: 'p',
    lead: 'Failure paths are design decisions.',
    text: 'When a tool call errors, does the agent see a useful message and retry differently, or does it see a stack trace and loop on the same mistake? Most long-running agent failures are recovery failures, not reasoning failures.',
  },

  { type: 'h2', text: 'The honest version of the claim' },
  {
    type: 'p',
    text: 'The title of this piece overstates on purpose, so let me correct it.',
  },
  {
    type: 'p',
    text: 'It is not true that the model does not matter. It plainly does, and the harness cannot rescue a model that cannot do the task at all. The careful statement is that agent performance depends jointly on the model and its execution system, and that the surrounding system explains far more of the variance than most teams assume.',
  },
  {
    type: 'p',
    text: 'There is also a moving target here. As models get better at planning, self-verification, and staying coherent over long horizons, some of what the harness compensates for today will get absorbed into the model itself. Harness work that patches over a model weakness has a shelf life. Harness work that shapes a good environment, clear tools, durable state, verification loops, tends to keep paying off, because it makes any model more effective rather than propping up a specific one.',
  },
  { type: 'p', text: 'Worth knowing which kind you are building.' },

  { type: 'h2', text: 'What to do about it' },
  { type: 'p', text: 'The practical version is unglamorous.' },
  {
    type: 'p',
    lead: 'Fix the harness before you upgrade the model.',
    text: 'A model swap is the most visible change available and often not the most valuable one. If your agent is failing, the failure is more likely to be in tool descriptions, context assembly, or error handling than in the weights.',
  },
  {
    type: 'p',
    lead: 'Hold one variable fixed and measure.',
    text: 'Define a task set with known correct outputs. Change the harness, keep the model constant, and see what moves. Then swap the model with the harness constant. Without that separation you are guessing about which one was the bottleneck. The LangChain result above is exactly this experiment run properly.',
  },
  {
    type: 'p',
    lead: 'Design the tool surface deliberately.',
    text: 'Every tool you expose is another option the model has to choose among, and choices get worse as options multiply. Fewer, well-described tools beat a large catalogue.',
  },
  {
    type: 'p',
    lead: 'Treat context as engineering, not plumbing.',
    text: 'Deciding what the model sees at each step is the highest-leverage work in the whole system, and it is where the least effort usually goes.',
  },

  { type: 'h2', text: 'In one sentence' },
  {
    type: 'p',
    strong: true,
    text: 'The harness is the part of an agent you actually design, it explains more of the performance gap than the model choice does in most systems, and the only way to know which one is holding you back is to change one at a time and measure.',
  },
]

const ontologyAndKnowledgeGraphs = [
  {
    type: 'p',
    text: 'The last piece ended on an admission: chunk a document and you destroy the relationships inside it. The definition of a term lands in one chunk, the constraint that governs it in another, and vector search has no idea the two belong together.',
  },
  {
    type: 'p',
    text: 'This piece is about the alternative. Not a better embedding, but a different representation.',
  },

  { type: 'h2', text: 'The question similarity cannot answer' },
  {
    type: 'p',
    text: 'Vector search answers one question well: which text resembles this query?',
  },
  {
    type: 'p',
    text: 'That is a genuinely useful question, and for most retrieval it is the right one. But some questions are not about resemblance at all.',
  },
  {
    // Set apart as a display line: the question is the section's whole point.
    type: 'p',
    strong: true,
    text: '“Which of our suppliers are affected by the policy we changed in March?”',
  },
  {
    type: 'p',
    text: 'Nothing in your corpus resembles that question. The answer does not exist as a passage anywhere. It has to be assembled: find the policy, find what it governs, find which suppliers fall under those terms. Three steps, each depending on the one before.',
  },
  {
    type: 'p',
    text: 'This is a multi-hop question, and similarity search structurally cannot do it. Not because the embeddings are bad, but because similarity is not traversal. Retrieving three chunks that each look somewhat like the query gives you three disconnected fragments and no path between them.',
  },

  { type: 'h2', text: 'What a knowledge graph is' },
  {
    type: 'p',
    strong: true,
    text: 'A knowledge graph stores your domain as entities and the relationships between them, rather than as passages of text.',
  },
  {
    type: 'p',
    lead: 'Entities',
    text: 'are the things: a supplier, a policy, a component, a person.',
  },
  {
    type: 'p',
    lead: 'Relationships',
    text: 'are the edges: governs, supplies, depends on, supersedes.',
  },
  {
    type: 'p',
    lead: 'An ontology',
    text: 'is the schema above it: what types of things exist, what relationships are allowed between which types, and what those relationships mean.',
  },
  {
    type: 'p',
    text: 'The ontology is the part that gets skipped and the part that matters. It is a set of commitments about your domain, written down. A component belongs to exactly one assembly. A policy supersedes at most one prior policy. A supplier cannot govern anything. Once those rules exist, the structure can be validated, and a question can be answered by following edges rather than guessing from surface text.',
  },
  {
    type: 'p',
    text: 'That is the trade being made. You do modelling work upfront, and in exchange you get to ask questions that require the model to know how things connect rather than infer it from wording.',
  },

  { type: 'h2', text: 'What the structure actually buys you' },
  {
    type: 'p',
    lead: 'Multi-hop traversal.',
    text: 'The supplier question becomes a path: policy, then governed terms, then suppliers under those terms. Each hop is an explicit edge, not a lucky retrieval.',
  },
  {
    type: 'p',
    lead: 'Global questions.',
    text: [
      '“What are the main themes across these two thousand documents?” is not a retrieval question at all. No chunk contains the answer. ',
      {
        link: {
          href: 'https://arxiv.org/abs/2404.16130',
          text: 'Microsoft’s GraphRAG work',
        },
      },
      ' framed this precisely: it is a query-focused summarization task rather than an explicit retrieval task, which is why similarity search fails at it no matter how many chunks you pull. Their approach answers it by summarizing communities of connected entities.',
    ],
  },
  {
    type: 'p',
    lead: 'Auditability.',
    text: 'A graph answer comes with its path. You can see which entities and which edges produced it. When something is wrong you can point at the edge that was wrong. A vector answer comes with three chunks and a shrug.',
  },
  {
    type: 'p',
    lead: 'Constraints that catch errors.',
    text: 'If your ontology says a component belongs to exactly one assembly, then data violating that is detectable. Text chunks have no notion of being invalid.',
  },

  { type: 'h2', text: 'What it costs' },
  {
    type: 'p',
    text: 'This is where enthusiasm usually outruns the evidence.',
  },
  {
    type: 'p',
    lead: 'Construction is expensive.',
    text: 'Standing up a vector pipeline is a matter of days. Building a knowledge graph means ontology work first, then entity extraction, relationship mapping, and summarization over your corpus.',
  },
  {
    type: 'p',
    lead: 'Maintenance compounds.',
    text: 'Extraction errors propagate. Fix one wrongly-typed entity and every derived summary that depended on it is now stale. The blast radius of a correction is something you should understand before production, not during.',
  },
  {
    type: 'p',
    lead: 'Query cost is higher too.',
    text: 'A vector query is one embedding call and an index lookup. A graph query may involve extracting entities from the question, traversing multiple hops, summarizing at several levels, and then a synthesis call. Each hop is inference.',
  },

  { type: 'h2', text: 'And it does not simply win' },
  {
    type: 'p',
    text: [
      'When ',
      {
        link: {
          href: 'https://arxiv.org/abs/2502.11371',
          text: 'researchers ran RAG and GraphRAG head to head',
        },
      },
      ' under a unified evaluation protocol, neither approach won. They found complementary behaviour: RAG was consistently better on single-hop, detail-oriented queries needing precise evidence, while GraphRAG was better on multi-hop, reasoning-intensive questions and on corpus-level summaries. Combining the two through selection and integration strategies beat either one alone. The same study is blunt about the price: GraphRAG is not free, carrying higher construction cost, retrieval latency, and storage footprint.',
    ],
  },
  {
    type: 'p',
    text: 'That result should be unsurprising, and it is the whole point. These are not competing implementations of the same thing. They answer different question shapes. Deploying a knowledge graph against a corpus of support tickets where users ask how to reset a password buys you nothing but cost.',
  },

  { type: 'h2', text: 'The decision, made properly' },
  {
    type: 'p',
    text: 'The question is not whether graph beats vector. It is: what fraction of my actual queries are relational?',
  },
  {
    type: 'p',
    text: 'That fraction is measurable, and measuring it is cheaper than building the graph. Take a real sample of the questions your system receives. Classify them: single-hop lookups, or questions about how things connect. If the relational fraction is small, a vector store with a reranker and hybrid keyword search will outperform a graph you spent two months building. If it is large, and if those are the queries that matter most, the structure earns its cost.',
  },
  {
    type: 'p',
    text: [
      'There is also a middle path worth trying first: let an agent do multi-hop retrieval by issuing several vector searches in sequence, using each result to inform the next. This is not just a hunch. ',
      {
        link: {
          href: 'https://arxiv.org/abs/2604.09666',
          text: 'A 2026 benchmark found',
        },
      },
      ' that agentic search substantially improves dense retrieval and narrows the gap to GraphRAG, though graph retrieval remained ahead on genuinely complex multi-hop reasoning. If agentic retrieval is good enough for your occasional relational queries, you have saved yourself the entire construction cost.',
    ],
  },
  {
    type: 'p',
    text: 'And when you do build the graph, hold the comparison honestly. Run both. If the graph does not beat the simpler retrieval on your query distribution, that is a finding, not a failure. It tells you where the structure was actually needed, which is exactly what you set out to learn.',
  },

  { type: 'h2', text: 'In one sentence' },
  {
    type: 'p',
    strong: true,
    text: 'A knowledge graph records how things connect instead of what they resemble, which makes multi-hop and global questions answerable and answers auditable, at a construction cost high enough that it is only worth paying when a real share of your queries are asking about connections rather than similarity.',
  },
]

const howToEvaluateAgents = [
  {
    type: 'p',
    text: 'Every piece in this series has ended in the same place: measure it, and check whether the complicated thing actually beat the simple one. That advice is easy to give and genuinely hard to follow, because evaluating an agent is harder than evaluating a model.',
  },
  {
    type: 'p',
    text: 'A model takes an input and returns an output. You compare the output to a reference answer and you are largely done. An agent takes a goal, makes a sequence of decisions, calls tools, reacts to what comes back, and eventually stops. The final answer is one thin slice of what happened.',
  },

  { type: 'h2', text: 'Why the final answer is not enough' },
  {
    type: 'p',
    text: 'Consider an agent that produces exactly the right result, and gets there by calling a deletion tool it should never have touched, retrying the same failing request eleven times, and burning fifty dollars of tokens.',
  },
  {
    type: 'p',
    strong: true,
    text: 'By output-only evaluation, that is a pass. In production it is a failure on three separate counts.',
  },
  { type: 'p', text: 'This is why evaluation of agents has split into layers.' },
  {
    type: 'ol',
    items: [
      {
        lead: 'Final output',
        text: 'is the answer correct? Necessary, and the easiest to measure.',
      },
      {
        lead: 'Trajectory',
        text: 'was the path sound? Did it choose the right tools, pass correct arguments, in a sensible order, and recover properly when something failed?',
      },
      {
        lead: 'System behaviour',
        text: 'what did it cost? Token spend, latency, number of tool calls, failure rate. An agent that is correct and costs fifty dollars a query does not ship.',
      },
    ],
  },
  {
    type: 'p',
    text: 'Most teams measure only the first layer and are then surprised by production. The signal that predicts real-world behaviour lives mostly in the second and third.',
  },

  { type: 'h2', text: 'Judging with a model, carefully' },
  {
    type: 'p',
    text: 'You cannot have humans read every trajectory, so the field has converged on using a language model as the judge. It works, and it comes with well-documented failure modes that you inherit whether or not you know about them.',
  },
  {
    type: 'p',
    text: [
      'The literature on LLM-as-judge has catalogued several: ',
      { em: 'position bias' },
      ', where the same two answers get scored differently depending on which is presented first; ',
      { em: 'verbosity bias' },
      ', where longer answers score higher regardless of quality; and ',
      { em: 'self-enhancement bias' },
      ', where a model prefers text produced by itself or its own family.',
    ],
  },
  {
    type: 'p',
    text: [
      'Position bias in particular has been ',
      {
        link: {
          href: 'https://arxiv.org/abs/2406.07791',
          text: 'studied systematically',
        },
      },
      ', and it is not a small effect. If your evaluation of A versus B flips when you swap the presentation order, you are measuring the judge, not the systems.',
    ],
  },
  { type: 'p', text: 'The mitigations are mundane and effective:' },
  {
    type: 'p',
    lead: 'Swap the order',
    text: 'and run both directions. If the verdict changes, the comparison is not real.',
  },
  {
    type: 'p',
    lead: 'Make the judge reason',
    text: 'before scoring rather than emitting a bare number.',
  },
  {
    type: 'p',
    lead: 'Calibrate against humans.',
    text: 'Label a sample by hand, compare the judge to those labels, and compute agreement. A judge you have never checked against human judgement is an unvalidated instrument, and you are reporting its readings as facts.',
  },
  {
    type: 'p',
    text: [
      'Even validated judges stay imperfect. ',
      {
        link: {
          href: 'https://arxiv.org/abs/2604.16706',
          text: 'One 2026 study of an ensemble judge',
        },
      },
      ' for tool-using agents found agreement with human labels well below the conventional threshold for substantial agreement, along with a measured conservative bias that systematically underreported correctness. That is what a reasonably good judge looks like. Plan for the gap rather than assuming it away.',
    ],
  },

  { type: 'h2', text: 'The contamination problem' },
  {
    type: 'p',
    text: 'There is a second failure mode, and it is worse because it looks like progress.',
  },
  {
    type: 'p',
    text: [
      'Public benchmarks leak into training data and into the environment the agent runs in. ',
      {
        link: {
          href: 'https://cursor.com/blog/reward-hacking-coding-benchmarks',
          text: 'Cursor audited successful runs',
        },
      },
      ' on SWE-bench Pro and found that 63% of Opus 4.8 Max’s passing resolutions retrieved a known fix rather than deriving one, by looking it up upstream or mining git history. When they sealed git history and cut internet access, Opus 4.8 Max fell from 87.1% to 73.0%, and their own model Composer 2.5 fell from 74.7% to 54.0%. Notably, they reported the largest gap in their own model.',
    ],
  },
  {
    type: 'p',
    text: 'A rising benchmark score can therefore mean the agent got better at solving problems, or that it got better at finding answers. Those are not the same capability, and only one of them transfers to your codebase.',
  },
  {
    type: 'p',
    text: 'Two consequences follow, and they are not optional.',
  },
  {
    type: 'p',
    lead: 'Public benchmark numbers are a floor for comparison, not evidence about your system.',
    text: 'They tell you something about a model family in a controlled setting. They tell you almost nothing about whether your agent works on your data.',
  },
  {
    type: 'p',
    lead: 'Build a private evaluation set.',
    text: 'Tasks drawn from your actual traffic, with answers you defined, that have never been published anywhere. This is unglamorous work and it is the only evaluation you can fully trust.',
  },

  { type: 'h2', text: 'Change one thing at a time' },
  {
    type: 'p',
    text: 'This is the part that gets skipped under deadline pressure, and it invalidates almost everything else.',
  },
  {
    type: 'p',
    text: 'An agent’s performance is the joint product of the model, the harness, the tools, the retrieval layer, and the prompt. Change three of them, observe a five point gain, and you have learned nothing about which change mattered, or whether two of them helped while the third quietly hurt.',
  },
  {
    type: 'p',
    text: 'The discipline is the ablation: hold everything fixed, change one component, measure. Then restore it and change the next. It is slower, and it is the only way to know where your performance actually came from. It is also the only way to detect the case that matters most for cost, which is the complicated component that turns out not to help at all.',
  },

  { type: 'h2', text: 'Define correct before you measure' },
  {
    type: 'p',
    text: 'An evaluation is only as good as the definition of success behind it, and that definition is a design decision, not a technical detail.',
  },
  {
    type: 'p',
    text: 'For a retrieval question, is a correct answer one that cites the right source, or one that reaches the right conclusion by any route? For a multi-step task, does a suboptimal but successful path count as a pass? Is an agent that correctly refuses an impossible request scoring a success or a failure?',
  },
  {
    type: 'p',
    text: 'Write those decisions down before you build the harness. Otherwise the metric quietly drifts toward whatever is easy to compute, and easy-to-compute metrics have a way of being the ones your system already scores well on.',
  },

  { type: 'h2', text: 'In one sentence' },
  {
    type: 'p',
    strong: true,
    text: 'Evaluating an agent means scoring the path and the cost rather than only the answer, treating your judge as an instrument that itself needs validating, trusting private task sets over public benchmarks, and changing one component at a time, because an evaluation that cannot tell you which part earned the improvement cannot tell you which part to keep.',
  },
]

const singleAgentVsMultiAgent = [
  {
    type: 'p',
    text: [
      'In June 2025, two of the most respected teams in the field published essays within a day of each other. Cognition’s was called ',
      { em: 'Don’t Build Multi-Agents' },
      '. Anthropic’s was called ',
      { em: 'How we built our multi-agent research system' },
      '.',
    ],
  },
  {
    type: 'p',
    text: 'They were not confused, and neither was wrong. They were solving different problems. Understanding why is most of what you need to know about this decision.',
  },

  { type: 'h2', text: 'The case for splitting' },
  { type: 'p', text: 'Some tasks are wide rather than deep.' },
  {
    type: 'p',
    text: 'Take Anthropic’s example: find every board member of every information technology company in the S&P 500. That is 65 companies, each needing its own searches, none depending on the others. A single agent walks that list sequentially and burns through its context window twice before finishing.',
  },
  {
    type: 'p',
    text: [
      'Spawn one subagent per company, each with its own fresh context window, and the work happens in parallel. ',
      {
        link: {
          href: 'https://www.anthropic.com/engineering/multi-agent-research-system',
          text: 'Anthropic reported',
        },
      },
      ' that a lead-and-subagent configuration outperformed a single agent by more than 90% on their internal research evaluations, and attributed the gain largely to token budget and the ability to spread reasoning across separate context windows.',
    ],
  },
  {
    type: 'p',
    text: 'That last part is the real mechanism, and it is easy to miss. The value of a subagent is often its own clean context window, not its intelligence. Context is the scarcest resource an agent has. Splitting a wide task gives you more of it.',
  },
  {
    type: 'p',
    text: 'The cost is not small: they measured roughly fifteen times the token usage of a standard chat interaction. That is only worth paying when the value of the answer clearly exceeds it.',
  },

  { type: 'h2', text: 'The case against splitting' },
  {
    type: 'p',
    text: [
      {
        link: {
          href: 'https://cognition.ai/blog/dont-build-multi-agents',
          text: 'Cognition’s argument',
        },
      },
      ' is about a different shape of problem, and it is a warning about decisions.',
    ],
  },
  {
    type: 'p',
    text: 'Their example: ask a system to build a Flappy Bird clone, and split it into subtasks, one for the background with pipes, one for the bird. Each subagent completes its assigned piece, and the pieces do not fit, because neither saw the framing that made matching the original game’s look an obvious constraint.',
  },
  {
    type: 'p',
    text: 'This is the failure mode that parallelism creates. Agents working in parallel make independent decisions, and independent decisions on a shared problem conflict. Nobody made a mistake. The context that would have prevented the conflict simply was not there when each decision was made.',
  },
  {
    type: 'p',
    text: 'Their principle follows directly: every action an agent takes should be informed by the context of the relevant decisions made elsewhere in the system.',
  },
  {
    type: 'p',
    text: 'Anthropic hit the same wall from the other side. When their lead agent gave subagents vague instructions like “research the semiconductor shortage,” one subagent went off into the 2021 automotive chip crisis while two others duplicated each other’s work on current supply chains. The fix was not smarter subagents. It was much more precise delegation.',
  },

  { type: 'h2', text: 'What the failure data says' },
  {
    type: 'p',
    text: [
      'This is not just competing anecdotes. ',
      {
        link: {
          href: 'https://arxiv.org/abs/2503.13657',
          text: 'A NeurIPS 2025 paper',
        },
      },
      ' analyzed over 1,600 execution traces across seven multi-agent frameworks and built a taxonomy of how these systems fail. Their opening observation is worth sitting with: despite the enthusiasm, performance gains from multi-agent systems on popular benchmarks are often minimal.',
    ],
  },
  {
    type: 'p',
    text: 'The 14 failure modes they identified cluster into three categories, and only one of them is about the agents being individually wrong:',
  },
  {
    type: 'ul',
    items: [
      {
        lead: 'System design issues',
        text: 'disobeying the task or role specification, repeating steps, losing conversation history.',
      },
      {
        lead: 'Inter-agent misalignment',
        text: 'withholding information, ignoring another agent’s input, derailing the task, failing to ask for clarification.',
      },
      {
        lead: 'Task verification',
        text: 'terminating prematurely, verifying incompletely or incorrectly.',
      },
    ],
  },
  {
    type: 'p',
    text: 'Notice what dominates. Most of these are coordination failures, not reasoning failures. Adding agents does not just add capability, it adds an entire category of things that can go wrong, and that category has to be engineered against explicitly.',
  },

  { type: 'h2', text: 'The rule that falls out' },
  {
    type: 'p',
    strong: true,
    text: 'The two positions reconcile cleanly once you ask one question about your task: do the parts share state?',
  },
  {
    type: 'p',
    lead: 'Split when the work is genuinely parallel.',
    text: 'Independent threads, read-heavy work, breadth over depth. Research across many sources, scanning many documents, gathering facts about many entities. Each subagent needs a clear, narrow brief and returns a result; nothing one does changes what another should do.',
  },
  {
    type: 'p',
    lead: 'Stay single when decisions interlock.',
    text: 'Writing code, designing a system, anything where an early choice constrains a later one. Here the context that would keep decisions consistent is exactly what delegation destroys. Anthropic notes the same boundary: their approach suits parallelizable research and is a poor fit for tightly interdependent tasks like coding.',
  },
  {
    type: 'p',
    text: 'If you need both, the pattern that works is one decision-maker with delegated gathering. Subagents fetch, the lead agent decides. The moment a subagent starts making decisions that other subagents depend on, you have signed up for the coordination problem. Claude Code was an early example of this discipline: it spawned subtasks, but did not run them in parallel with the main agent, and the subtask agent was typically asked to answer a question rather than to write code.',
  },
  {
    type: 'p',
    text: [
      'Cognition arrived at the same place after another year in production. ',
      {
        link: {
          href: 'https://cognition.ai/blog/multi-agents-working',
          text: 'Their 2026 follow-up',
        },
      },
      ' sharpens the original position rather than retracting it: multi-agent systems work best when writes stay single-threaded and the additional agents contribute intelligence rather than actions. Parallel writers are still out. A single writer with intelligence around it is in.',
    ],
  },

  { type: 'h2', text: 'Before you split' },
  {
    type: 'p',
    text: 'Multi-agent architecture is a genuine tool and it is also the most over-reached-for one in this field. A few checks before committing:',
  },
  {
    type: 'p',
    lead: 'Is the task actually wide?',
    text: 'If it is one problem with sequential dependencies, more agents will not help.',
  },
  {
    type: 'p',
    lead: 'Can you write each subagent’s brief precisely?',
    text: 'If you cannot specify the boundary of a subtask in a sentence or two, subagents will overlap or drift. That vagueness is a design smell, not a prompting problem.',
  },
  {
    type: 'p',
    lead: 'Does the value justify the tokens?',
    text: 'At roughly fifteen times the cost, this needs to be a task where a better answer is worth real money.',
  },
  {
    type: 'p',
    lead: 'Have you measured it against one agent?',
    text: 'Same task set, same model, one agent versus many. If the single agent is close, you have just bought a coordination problem for nothing.',
  },
  {
    type: 'p',
    text: 'That last check is the one that gets skipped, and it is the one that would prevent most of the disappointment in the benchmark data.',
  },

  { type: 'h2', text: 'In one sentence' },
  {
    type: 'p',
    strong: true,
    text: 'Split the work when the parts are independent and each subagent mostly needs its own context window to read in, keep it single when decisions depend on each other, and measure the two against each other before assuming the more elaborate architecture won.',
  },
]

// Series order. Fixed and explicit: the list renders this array as written.
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
  {
    slug: 'about-rag',
    title: 'About RAG',
    summary:
      'What RAG actually does, why chunking is the hard part, and when a simpler approach wins.',
    tags: ['RAG'],
    metric: 'August 2026',
    motif: 'contour',
    status: 'live',
    body: aboutRag,
  },
  {
    slug: 'mcp',
    title: 'MCP',
    summary:
      'What the Model Context Protocol is, and what problem it actually solves.',
    tags: ['MCP'],
    metric: 'August 2026',
    status: 'live',
    body: mcp,
  },
  {
    slug: 'agent-harness-design',
    title: 'Agent Harness Design',
    summary:
      'Why the harness around the model, not the model itself, decides how well an agent performs.',
    tags: ['Agents'],
    metric: 'August 2026',
    status: 'live',
    body: agentHarnessDesign,
  },
  {
    slug: 'ontology-and-knowledge-graphs',
    title: 'Ontology and Knowledge Graphs',
    summary:
      'The questions vector search cannot answer, and what explicit structure buys you.',
    tags: ['Knowledge Graphs'],
    metric: 'August 2026',
    status: 'live',
    body: ontologyAndKnowledgeGraphs,
  },
  {
    slug: 'how-to-evaluate-agents',
    title: 'How to Evaluate Agents',
    summary:
      'What to measure, why it is harder than it looks, and how to know the complexity paid off.',
    tags: ['Evaluation'],
    metric: 'August 2026',
    status: 'live',
    body: howToEvaluateAgents,
  },
  {
    slug: 'single-agent-vs-multi-agent',
    title: 'Single Agent vs Multi-Agent',
    summary:
      'When splitting work across agents helps, and when it just multiplies the failure modes.',
    tags: ['Multi-Agent'],
    metric: 'August 2026',
    status: 'live',
    body: singleAgentVsMultiAgent,
  },
]

export const getArticle = (slug) => articles.find((a) => a.slug === slug)
