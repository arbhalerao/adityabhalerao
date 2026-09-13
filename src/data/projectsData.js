export const projects = [
  {
    title: "geotriage",
    description: "A **satellite imagery triage platform** - draw an area, pick dates and detectors (water, vegetation, surface heat), and it scores every matching archive image and ranks them **green / yellow / red** so analysts open only what matters.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "PostGIS", "Docker", "rasterio", "MinIO", "React", "MapLibre"],
    github: "https://github.com/arbhalerao/geotriage",
    demo: "",
    features: [
      "**Pluggable detectors and data sources** as Docker images on a shared base - new analyses are registered, never coded into the platform",
      "**Sandboxed runs** - short-lived containers with read-only filesystems, dropped privileges, resource limits, and **no network** for detectors",
      "**Admission checks** validate what each plugin declares and do a **test run on synthetic data** before accepting it",
      "**Cost-aware pipeline** - filters cloud cover at search time, drops dull scenes from a **low-res preview**, and reads bands at the coarsest usable resolution",
      "**Archive-agnostic bands** - **Sentinel-2** and **Landsat** mapped to common names and physical units, so one detector runs on any source",
      "**PostgreSQL job queue** - parallel workers, retries with backoff, crash recovery, and scheduled re-runs for **continuous monitoring**",
      "**React + MapLibre analyst app** and a **Python SDK** with a CLI to validate plugins and test them on real scenes",
      "**125 tests** across the SDK and platform"
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
      "**1,320 runs** over 2-128 nodes, 5 topologies, 3 delay models, 6 message rates, and 16 loss/crash settings (30 seeds each) - Lamport misorders **95.4%-99.3%** of concurrent pairs; vector clocks cost **16.3x** more per receive and **N×** more metadata",
      "**Crash-recovery modeling** - nodes keep clock state through outages to preserve ordering guarantees",
      "**163 tests** across the clocks, causality engine, simulator, metrics, and notebooks"
    ],
  },
  {
    title: "overpass",
    description: "A live **\"what's above this point?\"** view - pick a location and radius to see the **aircraft** in that circle and the **satellites** overhead, including which are visible to the naked eye right now.",
    technologies: ["Python", "FastAPI", "Skyfield", "SGP4", "Geodesy", "WebSockets", "React", "Docker"],
    github: "https://github.com/arbhalerao/overpass",
    demo: "",
    features: [
      "**True naked-eye visibility** - above the horizon, sunlit, and against a dark enough sky, computed with **Skyfield** and JPL's **DE421** ephemeris",
      "**WGS-84 geometry** that handles date-line crossings, polar areas, and true-circle trimming",
      "**Live orbits** from **CelesTrak** propagated with **SGP4**, with data age reported since predictions drift ~1 km/day",
      "**Upstream-friendly caching** - aircraft every 5s, orbits every 2h, concurrent identical requests collapsed into one call",
      "**Robust OpenSky client** - cached OAuth2 tokens, retry on expiry, and rate-limit waits passed back to callers",
      "**Graceful partial failure** - sources fetched in parallel and served over REST and a live **WebSocket** stream",
      "**Flight numbers from callsigns**, decoded against 136 airlines to separate commercial from private traffic",
      "**Layered architecture** (API → services → clients → domain), started with one `docker compose up`"
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
      "**Zero-copy mmap parsing** - multi-GB, larger-than-RAM captures stream at **~1.6 GB/s**",
      "**Wrap-aware gap detection** classifies missing, duplicate, and out-of-order data across counter rollover",
      "**CFDP file-transfer tracking** down to the **exact missing byte ranges**, even with out-of-order or overlapping pieces",
      "**Standards coverage** - **TM**/**AOS** frames, **Space**/**Encapsulation** packets, **CLCW** reports, optional derandomization",
      "**Isolated, pluggable decoders** selected by packet ID, so one crashing decoder can't stop the analysis",
      "**Two interfaces** - a deterministic text/JSON report for CI diffs and a **Bubble Tea** TUI for browsing frames, packets, hex dumps, and transfers",
      "**Synthetic generator** for byte-exact, lossy, gigabyte-scale test recordings"
    ],
  },
  {
    title: "walrus",
    description: "A single-node **persistent key-value store** in Go (zero dependencies), fast in-memory reads backed by a **segmented write-ahead log** for durability and crash recovery, with optional per-key TTL.",
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
    title: "meerkat",
    description: "A **distributed key-value database** with **CRC32 consistent hashing**, **replication (factor 2)**, and **automatic key migration** as nodes join or leave the cluster.",
    technologies: ["Go", "gRPC", "BadgerDB", "Protocol Buffers", "Consistent Hashing", "Prometheus"],
    github: "https://github.com/arbhalerao/meerkat",
    demo: "",
    features: [
      "**Consistent hash ring (CRC32)** with O(log n) lookup, adding a node remaps only ~1/N of keys, vs ~100% under modulo hashing",
      "**Synchronous replication (factor 2)** with read fallback from primary to replica, tolerating a single-node failure",
      "**Automatic key migration** on node join/leave, drain-before-remove and live ring reconciliation",
      "**Health monitoring** over gRPC with automatic failure detection and node removal",
      "**5-method gRPC service** per storage node, backed by **BadgerDB** (pure-Go LSM engine)",
      "**Prometheus metrics** and a /cluster topology endpoint; Docker Compose (1 manager + 3 nodes)",
      "**Tested and benchmarked** - 28 unit tests and 7 benchmarks across the hashing and storage layers"
    ],
  },
  {
    title: "otter",
    description: "A from-scratch implementation of the **Raft consensus protocol** in Go over gRPC - leader election, log replication, and crash-safe persistence across a multi-node cluster.",
    technologies: ["Go", "gRPC", "Raft", "Protocol Buffers", "Distributed Consensus"],
    github: "https://github.com/arbhalerao/otter",
    demo: "",
    features: [
      "**Randomized leader election** (150–300ms timeouts) with term-based voting and 50ms heartbeats",
      "**Log replication** with per-follower nextIndex/matchIndex tracking, backtracking, and conflict truncation",
      "**Commit-safety rule** - advances the commit index only on majority match of a current-term entry",
      "**Crash-safe persistence** - currentTerm, votedFor, and the log written via atomic temp-file + rename, restored on restart",
      "**Replicated key-value state machine** (SET/DEL) kept consistent across all nodes",
      "Tolerates the loss of a minority of nodes (e.g. 1 of 3, 2 of 5); works for any odd cluster size"
    ],
  },
  {
    title: "autorollout",
    description: "A **CRD-free Kubernetes operator** that triggers **rolling restarts** of Deployments when the **ConfigMaps or Secrets** they consume actually change.",
    technologies: ["Go", "Kubebuilder", "Kubernetes Controller", "Client-Go", "Docker"],
    github: "https://github.com/arbhalerao/autorollout",
    demo: "",
    features: [
      "**Label-based opt-in** (autorollout.io=true) and **CRD-free** - installs from a single YAML, no custom resources",
      "Detects all **4 reference patterns** (env valueFrom, envFrom, volume mounts, imagePullSecrets)",
      "**Event-filtered reconciliation** - ignores Create/Delete and metadata-only updates, firing only on real data changes",
      "**Namespace-scoped Deployment scan** rebuilds the dependency graph live from pod specs (no stored state)",
      "Delegates the restart to **Kubernetes' native rolling update** via a pod-template annotation patch",
      "Built on **controller-runtime** with RBAC, health probes, and an authn/authz-protected metrics server",
      "**End-to-end tested** on a real Kubernetes (Kind) cluster - controller startup, pod health, metrics exposure, and restart-on-change"
    ]
  },
  {
    title: "graphauth",
    description: "A **Zanzibar-inspired ReBAC authorization engine** modeling permissions as a **graph of relationships**, resolving inherited access through bounded recursive traversal.",
    technologies: ["Go", "Neo4j", "REST API", "Docker", "Graph Theory"],
    github: "https://github.com/arbhalerao/graphauth",
    demo: "",
    features: [
      "**Relationships-as-edges** model - Users, Groups, and Documents as typed nodes",
      "**Bounded recursive traversal** (Cypher MEMBER_OF*0..15 + relation edge) resolving transitive, group-inherited access in a single query - O(path length)",
      "**Pluggable storage** behind a GraphStore interface, Neo4j (bolt) and in-memory implementations",
      "**Stateless REST API** for nodes, relationships, and permission checks, returning allow/deny + reason",
      "**Relation types** - VIEWER, EDITOR, OWNER, MEMBER_OF with strict validation; Neo4j uniqueness constraints per label",
      "**Docker and docker-compose** support for containerized deployment",
      "**9 unit tests** covering relationship and permission-traversal scenarios"
    ],
  },
];

export const sideProjects = [
  {
    title: "geotriage-sdk",
    description: "The Python SDK for geotriage plugins - base classes for detectors and data sources, a CLI to validate them and test them against a live archive and a real scene, and the Docker base image every plugin builds on.",
    github: "https://github.com/arbhalerao/geotriage-sdk",
  },
  {
    title: "go-software-raid",
    description: "User-space RAID 0/1/5/6 in Go, file-backed disks with block I/O through a RAID abstraction layer. RAID 5 (XOR) survives 1 disk failure and RAID 6 (Galois-field dual parity) survives 2; usable capacity 100/50/75/50%. Covered by 14 unit tests.",
    github: "https://github.com/arbhalerao/go-software-raid",
  },
  {
    title: "CoWIN-Slot-Finder",
    description: "A vaccination-slot discovery web app from India's 2021 COVID drive, a React (Vite) SPA over a stateless FastAPI proxy to the public CoWIN API, with State -> District -> Center navigation and pincode search. No database, no auth; migrated from an original Django build.",
    github: "https://github.com/arbhalerao/CoWIN-Slot-Finder",
  },
];
