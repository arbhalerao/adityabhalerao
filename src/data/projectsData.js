export const projects = [
  {
    title: "picseek",
    description: "A **local screenshot search engine** - find any screenshot by the words in it, even when the OCR misread them, by what it means, or by what it looks like, all offline on a laptop.",
    technologies: ["Go", "Python", "gRPC", "Protocol Buffers", "SQLite FTS5", "ONNX Runtime", "PaddleOCR", "CLIP", "Sentence Embeddings", "Docker", "systemd"],
    github: "https://github.com/arbhalerao/picseek",
    demo: "",
    features: [
      "**Four-layer hybrid search** - exact text (SQLite FTS5 trigrams, so partial words match), OCR-aware near matches, meaning (MiniLM text vectors) and visual (CLIP), ranked in tiers with reciprocal rank fusion and a `--why` flag that explains every hit",
      "**OCR-error-aware matching** - folds the confusions OCR actually makes (0/O, 1/l, rn/m), collapses inserted characters and rejoins split words with a stopword guard; near hits always rank below exact ones and the stored text is never rewritten",
      "**Zero-shot classification** into 7 types (money, travel, message, dev, security, document, chart) from vectors already stored for search, with an explicit \"none of these\" class - accuracy **0.70 -> 0.95**, no training and no extra model calls",
      "**Measured search quality** - a deterministic synthetic benchmark (43 rendered screenshots, 35 labelled and 4 off-topic queries) scoring recall@k and MRR per layer: **1.00** on keyword, partial and misread queries, **0.90** recall@10 overall, and no results for off-topic queries",
      "**Go + Python services** - a Go daemon owns state and scheduling, Python services run OCR (PP-OCRv6 on ONNX Runtime) and embeddings, over typed gRPC contracts on Unix sockets, with CI checks for breaking changes and generated-code drift",
      "**Crash-safe indexing pipeline** - a persistent SQLite job queue with leases, live and backfill lanes, retries with backoff, parking of bad files, per-worker circuit breakers, and content-hash dedup so moved or copied files are never reprocessed",
      "**Saved to searchable in under a second** - a filesystem watcher, a live lane ahead of the backfill and opportunistic batched commits, while meaning and visual enrichment yield to OCR",
      "**Versioned derived data** - OCR, normalisation, embedding and classifier versions are stored, so a model or rule change reprocesses only what it affects, automatically",
      "**Ships like a real tool** - a CLI with tree output and clickable results, systemd user services at idle priority, distroless and slim Docker images, and govulncheck and pip-audit in CI"
    ],
  },
  {
    title: "geotriage",
    description: "A **satellite imagery triage platform** - describe a job in a sentence or draw it on a map, and it scores every matching archive image and ranks them green / yellow / red so analysts open only what matters.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "PostGIS", "Docker", "rasterio", "MinIO", "Ollama", "React", "MapLibre"],
    github: "https://github.com/arbhalerao/geotriage",
    demo: "",
    features: [
      "**Natural-language workflow agent** - built a tool-using agent that turns plain English into valid satellite monitoring workflows, reusing the platform's own validation so a draft can never break its rules",
      "**Eval-driven prompt development** - set targets before the first run, then scored every change on a 63-case eval set across 10 metrics, including whether the agent asks instead of guessing - **0.95** on answer kind and **1.00** on schema validity, against a **0.23** always-asks baseline",
      "**Local-first LLM engineering** - ran the whole agent on a small open-weight model on CPU, with zero API spend and no data leaving the machine, choosing the instruct build over the reasoning default to keep CPU latency down",
      "**LLM tracing and eval caching** - logged every model call with prompt version, tokens and latency, and cached responses so eval runs only re-ran what changed",
      "**Pluggable detectors and data sources** as Docker images on a shared base - new analyses are registered, never coded into the platform",
      "**Sandboxed runs** - short-lived containers with read-only filesystems, dropped privileges, resource limits, and no network for detectors",
      "**Storage policies per workflow** - keep imagery only for the scenes that scored Alert, or maps only, or scores only; the rest is deleted after scoring",
      "**Disk guardrails at three points** - the draft, the form and the start of every run, sizing scenes by their overlap with the area and refusing before anything is downloaded",
      "**Cost-aware pipeline** - filters cloud cover at search time, drops dull scenes from a low-res preview, and reads bands at the coarsest usable resolution",
      "**Archive-agnostic bands** - Sentinel-2 and Landsat mapped to common names and physical units, so one detector runs on any source",
      "**PostgreSQL job queue** - parallel workers, retries with backoff, crash recovery, and scheduled re-runs for continuous monitoring",
      "**React + MapLibre analyst app** and a Python SDK with a CLI to validate plugins and test them on real scenes",
      "**340 tests** across the platform (269) and SDK (71)"
    ],
  },
  {
    title: "causality-bench",
    description: "An experiment measuring **Lamport vs vector clocks** - a deterministic simulator records the true event order independently of both, then scores how much ordering the cheaper clock loses and what the exact one costs.",
    technologies: ["Python", "NumPy", "pandas", "NetworkX", "SciPy", "Matplotlib", "Discrete-Event Simulation"],
    github: "https://github.com/arbhalerao/causality-bench",
    demo: "",
    features: [
      "**Independent ground truth** built from program order and message send/receive, never from either clock's timestamps",
      "**Same execution for both clocks**, so every difference comes from clock design alone",
      "**Every pair checked** - a precomputed ancestor index makes all **~50M event pairs** per run a single lookup, verified against brute-force search and NetworkX transitive closure",
      "**1,320 runs** over 2-128 nodes, 5 topologies, 3 delay models, 6 message rates, and 16 loss/crash settings (30 seeds each) - Lamport misorders **95%-99.9%** of concurrent pairs; vector clocks cost **16.3x** more per receive and N× more metadata",
      "**Crash-recovery modeling** - nodes keep clock state through outages to preserve ordering guarantees",
      "**163 tests** across the clocks, causality engine, simulator, metrics, and notebooks"
    ],
  },
  {
    title: "overpass",
    description: "A live **\"what's above this point?\"** view - pick a location and radius to see the aircraft in that circle and the satellites overhead, including which are visible to the naked eye right now.",
    technologies: ["Python", "FastAPI", "Skyfield", "SGP4", "Geodesy", "WebSockets", "React", "Docker"],
    github: "https://github.com/arbhalerao/overpass",
    demo: "",
    features: [
      "**True naked-eye visibility** - above the horizon, sunlit, and against a dark enough sky, computed with Skyfield and JPL's DE421 ephemeris",
      "**WGS-84 geometry** that handles date-line crossings, polar areas, and true-circle trimming",
      "**Live orbits** from CelesTrak propagated with SGP4, with data age reported since predictions drift ~1 km/day",
      "**Upstream-friendly caching** - aircraft every 5s, orbits every 2h, concurrent identical requests collapsed into one call",
      "**Robust OpenSky client** - cached OAuth2 tokens, retry on expiry, and rate-limit waits passed back to callers",
      "**Graceful partial failure** - sources fetched in parallel and served over REST and a live WebSocket stream",
      "**Flight numbers from callsigns**, decoded against 136 airlines to separate commercial from private traffic",
      "**Layered architecture** (API -> services -> clients -> domain), started with one `docker compose up`"
    ],
  },
  {
    title: "cadutrace",
    description: "An offline analyzer for **CCSDS spacecraft telemetry** - unpacks raw ground-station recordings from transfer frames to reassembled packets to decoded data, producing a health report or an interactive terminal UI.",
    technologies: ["Go", "CCSDS", "Binary Protocol Parsing", "Bubble Tea", "mmap"],
    github: "https://github.com/arbhalerao/cadutrace",
    demo: "",
    features: [
      "**Packet reassembly across frames**, detecting lost or truncated packets",
      "**Zero-copy mmap parsing** - multi-GB captures are parsed in place, with only frame-spanning packets copied",
      "**Wrap-aware gap detection** classifies missing, duplicate, and out-of-order data across counter rollover",
      "**CFDP file-transfer tracking** down to the exact missing byte ranges, even with out-of-order or overlapping pieces",
      "**Standards coverage** - TM/AOS frames, Space/Encapsulation packets, CLCW reports, optional derandomization",
      "**Isolated, pluggable decoders** selected by packet ID, so one crashing decoder can't stop the analysis",
      "**Two interfaces** - a deterministic text/JSON report for CI diffs and a Bubble Tea TUI for browsing frames, packets, hex dumps, and transfers",
      "**Synthetic generator** for byte-exact, lossy, gigabyte-scale test recordings"
    ],
  },
  {
    title: "walrus",
    description: "A single-node **persistent key-value store** in Go (zero dependencies), fast in-memory reads backed by a segmented write-ahead log for durability and crash recovery, with optional per-key TTL.",
    technologies: ["Go", "Write-Ahead Log", "Key-Value Store", "HTTP API"],
    github: "https://github.com/arbhalerao/walrus",
    demo: "",
    features: [
      "**WAL-first writes** - every mutation is appended and fsynced to disk before the in-memory map is updated, so acknowledged writes survive crashes",
      "**Segmented binary log** (64MB segments) with a 21-byte header + CRC32 per record (~25 bytes fixed overhead)",
      "**Crash recovery** by replaying segments on startup in a single O(n) pass; corrupted tail entries are detected and skipped",
      "**Zero-allocation reads** (0 allocs/op) served directly from the in-memory map",
      "**Per-key TTL** with two-tier eviction, lazy on read plus a background sweeper goroutine",
      "**Zero external dependencies**, built entirely on the Go standard library; HTTP/JSON API",
      "**Tested and benchmarked** - 26 unit tests and 6 benchmarks across the WAL, store, and HTTP layers"
    ],
  },
  {
    title: "autorollout",
    description: "A **CRD-free Kubernetes operator** that triggers rolling restarts of Deployments when the ConfigMaps or Secrets they consume actually change.",
    technologies: ["Go", "Kubebuilder", "Kubernetes Controller", "Client-Go", "Docker"],
    github: "https://github.com/arbhalerao/autorollout",
    demo: "",
    features: [
      "**Label-based opt-in** (autorollout.io=true) and CRD-free - installs from a single YAML, no custom resources",
      "Detects all **4 reference patterns** (env valueFrom, envFrom, volume mounts, imagePullSecrets)",
      "**Event-filtered reconciliation** - ignores Create/Delete and metadata-only updates, firing only on real data changes",
      "**Namespace-scoped Deployment scan** rebuilds the dependency graph live from pod specs (no stored state)",
      "Delegates the restart to Kubernetes' native rolling update via a pod-template annotation patch",
      "Built on controller-runtime with RBAC, health probes, and an authn/authz-protected metrics server",
      "**End-to-end tested** on a real Kubernetes (Kind) cluster - controller startup, pod health, metrics exposure, and restart-on-change"
    ]
  },
];

export const implementations = [
  {
    title: "magpie",
    description: "The **SWIM membership protocol**, in Go. On top of the paper it adds a left state, joins through seed nodes, a two-way state sync that **heals network partitions**, and a simulation harness to measure it all: the suspect state cut **false failure detections by 98%** at 10% packet loss, and probing stays at **2 messages per node per period** from 10 to 1000 nodes. A React dashboard crashes, isolates and restarts nodes in a Docker cluster of any size.",
    github: "https://github.com/arbhalerao/magpie",
  },
  {
    title: "otter",
    description: "The **Raft consensus algorithm**, in Go over gRPC. **Leader election**, **log replication** with backtracking and conflict truncation, and the current-term commit rule, with each node's state persisted through an atomic temp-file and rename so a **restarted node rejoins safely**. It drives a replicated key-value store that keeps working with a minority of nodes down.",
    github: "https://github.com/arbhalerao/otter",
  },
  {
    title: "meerkat",
    description: "**Consistent hashing** put to work in a distributed key-value store, in Go. A coordinator owns a CRC32 hash ring and writes every key to its owner and the next node on the ring, **reads fail over** to that replica, and when a node joins, leaves or stops answering health checks, its **keys migrate automatically**. Storage is BadgerDB behind gRPC, with Prometheus metrics.",
    github: "https://github.com/arbhalerao/meerkat",
  },
  {
    title: "graphauth",
    description: "**Zanzibar's relationship-based authorization**, modelled as a graph in Go. Permissions are edges between users, groups and documents, and a check resolves **nested group membership in a single bounded Neo4j traversal**, up to 15 levels deep, returning **allow or deny with the reason**. Neo4j and an in-memory store sit behind one interface.",
    github: "https://github.com/arbhalerao/graphauth",
  },
];

export const sideProjects = [
  {
    title: "geotriage-sdk",
    description: "The **Python SDK for geotriage plugins** - base classes for detectors and data sources, a **CLI to validate them and test them against a live archive** and a real scene, and the **Docker base image** every plugin builds on.",
    github: "https://github.com/arbhalerao/geotriage-sdk",
  },
  {
    title: "go-software-raid",
    description: "**User-space RAID 0/1/5/6** in Go, file-backed disks with block I/O through a RAID abstraction layer. RAID 5 (XOR) **survives 1 disk failure** and RAID 6 (**Galois-field dual parity**) **survives 2**; usable capacity 100/50/75/50%. Covered by 14 unit tests.",
    github: "https://github.com/arbhalerao/go-software-raid",
  },
  {
    title: "CoWIN-Slot-Finder",
    description: "A **vaccination-slot discovery web app** from **India's 2021 COVID drive**, a React (Vite) SPA over a **stateless FastAPI proxy** to the public CoWIN API, with State -> District -> Center navigation and pincode search. No database, no auth; migrated from an original Django build.",
    github: "https://github.com/arbhalerao/CoWIN-Slot-Finder",
  },
];
