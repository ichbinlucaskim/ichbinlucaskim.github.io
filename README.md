# Lucas Kim

Agent systems. My background is in machine learning, and during my graduate studies I
have focused on agent systems: how LLM-based agents route across tools, retrieve what
they need, and stay reliable in production. The through-line is judgment: knowing where
a learned or agentic approach wins, and where a rule-based or deterministic one is
simpler, auditable, and correct, including the cases where the honest answer is that the
model loses.

Live site: https://ichbinlucaskim.github.io

## Writing

A seven-part series on agent systems, in reading order.

1. **[What is an Agent?](https://ichbinlucaskim.github.io/articles/what-is-an-agent)** —
   What an agent actually is, how it differs from a workflow, and when not to build one.
2. **[About RAG](https://ichbinlucaskim.github.io/articles/about-rag)** — What RAG
   actually does, why chunking is the hard part, and when a simpler approach wins.
3. **[MCP](https://ichbinlucaskim.github.io/articles/mcp)** — What the Model Context
   Protocol is, and what problem it actually solves.
4. **[Agent Harness Design](https://ichbinlucaskim.github.io/articles/agent-harness-design)** —
   Why the harness around the model, not the model itself, decides how well an agent
   performs.
5. **[Ontology and Knowledge Graphs](https://ichbinlucaskim.github.io/articles/ontology-and-knowledge-graphs)** —
   The questions vector search cannot answer, and what explicit structure buys you.
6. **[How to Evaluate Agents](https://ichbinlucaskim.github.io/articles/how-to-evaluate-agents)** —
   What to measure, why it is harder than it looks, and how to know the complexity paid
   off.
7. **[Single Agent vs Multi-Agent](https://ichbinlucaskim.github.io/articles/single-agent-vs-multi-agent)** —
   When splitting work across agents helps, and when it just multiplies the failure
   modes.

## Selected work

**[Does a GNN beat retrieval for MCP tool routing?](https://ichbinlucaskim.github.io/projects/mcp-router-eval)** — Frames MCP tool routing
as ranking over a tool graph and asks whether a GNN beats retrieval. It does not: dense
retrieval completes 0.979 of queries, the GNN at most 0.052. The value is an audited
negative finding and a diagnosis of why the GNN collapses.
· [Repo](https://github.com/ichbinlucaskim/mcp-router-eval)

## Links

- Site: https://ichbinlucaskim.github.io
- Email: ichbinlucas211@gmail.com
- LinkedIn: https://www.linkedin.com/in/ichbinlucas
- GitHub: https://github.com/ichbinlucaskim
