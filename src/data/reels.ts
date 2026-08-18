export type ReelCategory = "technology" | "career" | "gaming" | "entertainment";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Reel = { id: string; title: string; description: string; category: ReelCategory; topics: string[]; difficulty: Difficulty; creator: string; duration: string; watchPercentage: number; liked: boolean; saved: boolean; shared: boolean; skipped: boolean; educationalValue: number; hypeScore: number; signalScore: number; explanation: string };
type Seed = Omit<Reel, "id" | "watchPercentage" | "liked" | "saved" | "shared" | "skipped" | "creator" | "duration" | "signalScore" | "explanation">;
const t = (title: string, description: string, topics: string[], difficulty: Difficulty = "Intermediate", educationalValue = 86, hypeScore = 15): Seed => ({ title, description, topics, difficulty, educationalValue, hypeScore, category: "technology" });
const c = (title: string, description: string, topics: string[], hypeScore = 28): Seed => ({ title, description, topics, difficulty: "Intermediate", educationalValue: 72, hypeScore, category: "career" });
const g = (title: string, description: string, topics: string[]): Seed => ({ title, description, topics, difficulty: "Beginner", educationalValue: 28, hypeScore: 38, category: "gaming" });
const e = (title: string, description: string, topics: string[], hypeScore = 48): Seed => ({ title, description, topics, difficulty: "Beginner", educationalValue: 18, hypeScore, category: "entertainment" });
const SEEDS: Seed[] = [
 t("Binary search without the mystery", "A visual DSA walkthrough of the invariant that makes binary search reliable, including off-by-one cases.", ["DSA", "Programming"], "Beginner", 94),
 t("Java collections: choose the right one", "A practical Java comparison of ArrayList, HashMap and HashSet for common coding problems.", ["Java", "Data Structures"], "Beginner", 90),
 t("Python decorators in one real project", "Build a timing decorator around a Python API function and see why functools.wraps matters.", ["Python", "Programming"], "Intermediate", 88),
 t("C++ vectors and memory growth", "An animated C++ explanation of capacity, reallocation and when reserve saves a contest solution.", ["C++", "Competitive Programming"], "Intermediate", 89),
 t("JavaScript event loop, drawn", "Trace promises, timers and microtasks through the JavaScript event loop with a browser-console example.", ["JavaScript", "Web Development"], "Intermediate", 91),
 t("React state that does not go stale", "Fix a counter bug with functional React state updates and understand render snapshots.", ["React", "Web Development"], "Beginner", 90),
 t("Make a portfolio page actually fast", "A web development teardown covering images, semantic HTML and performance checks recruiters notice.", ["Web Development", "JavaScript"], "Beginner", 82),
 t("DBMS normalization from a messy table", "Turn an order spreadsheet into 1NF, 2NF and 3NF while keeping database queries useful.", ["DBMS", "Data Science"], "Intermediate", 92),
 t("Why processes and threads feel different", "An operating systems explainer follows a browser tab from process scheduling to context switching.", ["Operating Systems", "Computer Science"], "Intermediate", 90),
 t("TCP handshake in a coffee shop", "A computer networks story about packets, SYN/ACK, retries and why public Wi-Fi feels slow.", ["Computer Networks", "Cybersecurity"], "Beginner", 87),
 t("Cache locality beats clever code", "A computer architecture demo shows why contiguous memory can outperform a theoretically tidy loop.", ["Computer Architecture", "C++"], "Advanced", 91),
 t("AI vs machine learning vs deep learning", "A grounded AI primer separates rules, machine learning models and neural networks using spam filtering.", ["AI", "Machine Learning"], "Beginner", 88),
 t("Train a tiny classifier", "Use a small dataset to explain features, labels, train-test split and model evaluation in machine learning.", ["Machine Learning", "Data Science"], "Intermediate", 93),
 t("Generative AI prompts that are testable", "A developer lesson builds repeatable prompts with constraints and evaluation cases, not prompt magic.", ["Generative AI", "AI"], "Intermediate", 85),
 t("Password hashes are not encryption", "A cybersecurity mini-lesson explains salts, slow hashes and the common login-storage mistake.", ["Cybersecurity", "Web Development"], "Beginner", 94),
 t("Deploy a service without server confusion", "A cloud computing tour of regions, containers and managed databases through one small API deployment.", ["Cloud", "DevOps"], "Beginner", 86),
 t("CI pipeline that catches a broken build", "Follow a DevOps workflow from a pull request to tests, linting and a safe deployment gate.", ["DevOps", "Git/GitHub"], "Intermediate", 89),
 t("Git rebase when the branch is messy", "A Git/GitHub screen recording resolves a real conflict and explains when merge is kinder.", ["Git/GitHub", "Software Engineering"], "Intermediate", 84),
 t("Design a URL shortener", "A system design and HLD breakdown of IDs, redirects, caching and analytics trade-offs.", ["System Design/HLD", "DBMS"], "Advanced", 92),
 t("Two pointers: recognize the pattern", "A coding interviews practice reel turns a sorted-array problem into a reusable checklist.", ["Coding Interviews", "DSA"], "Intermediate", 91),
 t("Competitive programming: constraints first", "A contest mentor converts input limits into time complexity choices before writing code.", ["Competitive Programming", "DSA"], "Intermediate", 90),
 t("Pandas cleanup before the dashboard", "A data science workflow fixes nulls, duplicates and types before any chart tells a story.", ["Data Science", "Python"], "Beginner", 88),
 t("Recursion tree for merge sort", "A programming explanation draws the call tree, merge phase and O(n log n) cost.", ["Programming", "DSA"], "Intermediate", 89),
 t("Java exceptions beyond try-catch", "A Java developer refactors error paths into meaningful exceptions instead of swallowing failures.", ["Java", "Software Engineering"], "Intermediate", 83),
 t("Build a REST API with Python types", "A Python backend reel models request validation and why types reduce API surprises.", ["Python", "Web Development"], "Intermediate", 85),
 t("C++ move semantics made visual", "A focused C++ lesson compares copying and moving objects in a performance-sensitive program.", ["C++", "Computer Architecture"], "Advanced", 87),
 t("React component boundaries", "A React code review splits a crowded page into reusable components without prop chaos.", ["React", "JavaScript"], "Intermediate", 84),
 t("SQL indexes: fast until they are not", "A DBMS query-plan demo connects indexes, selectivity and write costs in an e-commerce table.", ["DBMS", "System Design/HLD"], "Advanced", 92),
 t("Operating system virtual memory", "An operating systems sketch explains pages, page faults and nuanced memory usage.", ["Operating Systems", "Computer Architecture"], "Advanced", 90),
 t("DNS lookup, packet by packet", "A computer networks sequence follows a domain lookup through resolver, cache and authoritative server.", ["Computer Networks", "Cloud"], "Intermediate", 88),
 t("Threat model your side project", "A cybersecurity checklist identifies assets, attackers and the highest-impact fix before launch.", ["Cybersecurity", "System Design/HLD"], "Intermediate", 90),
 t("Docker layers with a real build", "A cloud and DevOps tutorial reduces image size while making cache behaviour predictable.", ["Cloud", "DevOps"], "Intermediate", 86),
 t("Language myths, tested", "A developer compares JavaScript, Python and C++ trade-offs using the same workload, not hot takes.", ["Programming", "JavaScript", "Python", "C++"], "Intermediate", 80),
 t("Data structures interview warm-up", "A coding interview practice solves a stack problem, narrating edge cases and complexity aloud.", ["Coding Interviews", "DSA"], "Intermediate", 88),
 t("Generative AI RAG, no buzzwords", "A practical generative AI diagram distinguishes retrieval, embeddings and answer generation in internal search.", ["Generative AI", "AI", "Data Science"], "Advanced", 90),
 c("A junior engineer's first useful PR", "A software engineering mentor reviews a small pull request: scope, tests and useful feedback.", ["Software Engineering", "Git/GitHub"]),
 c("What interviewers hear in your project story", "A coding interviews coach turns vague portfolio claims into a clear problem, decision and outcome.", ["Coding Interviews", "Career"]),
 c("Roadmap reality check", "A career creator compares fundamentals with viral get-rich-in-tech claims and realistic milestones.", ["Career", "Programming"], 64),
 c("How to read an engineering job description", "A practical software career breakdown separates must-have skills, seniority signals and nice-to-haves.", ["Software Engineering", "Career"]),
 c("System design interview communication", "A senior engineer demonstrates clarifying questions and trade-offs for a system design interview.", ["System Design/HLD", "Coding Interviews"]),
 g("Speedrun route: one risky shortcut", "A gaming highlight explains the timing window behind a platformer speedrun route with live reactions.", ["Gaming", "Speedrun"]),
 g("Cozy game build tour", "A relaxing gaming clip tours a thoughtfully designed in-game village and its hidden details.", ["Gaming", "Entertainment"]),
 g("Ranked match comeback", "A competitive gaming recap captures a tense final round, team callouts and a last-second play.", ["Gaming", "Esports"]),
 g("Controller settings experiment", "A gamer tests sensitivity settings over several matches, separating useful advice from montage.", ["Gaming", "Hardware"]),
 g("Game physics makes no sense", "A funny gaming bug compilation shows impossible ragdolls and surprising physics interactions.", ["Gaming", "Comedy"]),
 e("When production says it worked on my machine", "Programming humor: a developer celebrates a deploy before the error dashboard lights up.", ["Programming Humor", "Developer Content"]),
 e("The group project timeline", "A comedy sketch follows the teammate who appears at midnight with a mysteriously finished slide deck.", ["Comedy", "Entertainment"]),
 e("AI will replace every developer tomorrow?", "An over-the-top entertainment rant uses career hype and dramatic captions instead of technical evidence.", ["Career Hype", "AI"], 82),
 e("Debugging at 4:59 PM", "Developer content comedy about a one-line fix revealing three unrelated bugs before the weekend.", ["Programming Humor", "Developer Content"]),
 e("The algorithm's perfect dinner plan", "A light general-entertainment sketch about following increasingly absurd short-video recommendations.", ["Comedy", "General Entertainment"]),
];
export const REELS: Reel[] = SEEDS.map((seed, index) => { const watchPercentage = Math.max(18, 96 - (index * 9) % 72); return { ...seed, id: `r${index + 1}`, creator: `@${["devnotes", "studybyte", "stacktrace", "learnloop"][index % 4]}`, duration: `${30 + (index * 7) % 55}s`, watchPercentage, liked: index % 6 === 0, saved: index % 7 === 0, shared: index % 11 === 0, skipped: index % 13 === 0, signalScore: Math.round(watchPercentage * 0.75 + seed.educationalValue * 0.25), explanation: "Engagement and educational depth reinforce this topic cluster." }; });
export function getReelById(id: string) { return REELS.find((reel) => reel.id === id); }
