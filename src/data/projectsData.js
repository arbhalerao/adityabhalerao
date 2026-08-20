export const projects = [
  {
    title: "cadutrace",
    description: "An offline **CCSDS protocol analyzer** for spacecraft telemetry, walking a recorded **CADU stream** up the stack - transfer frames → virtual channels → reassembled space packets → application decoders - into a health report or an interactive terminal UI.",
    technologies: ["Go", "CCSDS", "Binary Protocol Parsing", "Bubble Tea", "mmap"],
    github: "https://github.com/arbhalerao/cadutrace",
    demo: "",
    features: [
      "**Cross-frame packet reassembly** driven by the First Header Pointer - stitches space packets that span transfer-frame boundaries, with loss and truncation detection",
      "**Zero-copy over mmap** - parsers hold slices straight into the memory-mapped capture, so larger-than-RAM and multi-GB files stream at ~1.6 GB/s",
      "**Wrap-aware continuity tracking** - classifies sequence gaps, duplicates, and reorders across modular frame/packet counters using signed modular arithmetic",
      "**CFDP file-transfer tracking** via a merge-on-insert interval set - reports completeness and the **exact missing byte ranges**, robust to reordering and overlap",
      "Decodes **TM (132.0)** and **AOS (732.0)** transfer frames, **Space (133.0)** and **Encapsulation (133.1)** packets, **CLCW (232.0)** uplink status, and optional **131.0 derandomization**",
      "**Compile-time decoder SDK** - application protocols dispatched by APID behind a recover boundary; CFDP ships as one such decoder",
      "**Two surfaces** - a text/JSON health report (deterministic, CI-diffable) and a virtualized **Bubble Tea TUI** (frames, packets, inspector + hex, CFDP, stats, events)",
      "**Deterministic sample-stream generator** that synthesizes byte-exact CADU captures (TM/AOS, encap, CFDP, randomized, lossy) at gigabyte scale"
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
    title: "go-software-raid",
    description: "User-space RAID 0/1/5/6 in Go, file-backed disks with block I/O through a RAID abstraction layer. RAID 5 (XOR) survives 1 disk failure and RAID 6 (Galois-field dual parity) survives 2; usable capacity 100/50/75/50%. Covered by 14 unit tests.",
    github: "https://github.com/arbhalerao/go-software-raid",
  },
  {
    title: "CoWIN-Slot-Finder",
    description: "A vaccination-slot discovery web app from India's 2021 COVID drive, a React (Vite) SPA over a stateless FastAPI proxy to the public CoWIN API, with State → District → Center navigation and pincode search. No database, no auth; migrated from an original Django build.",
    github: "https://github.com/arbhalerao/CoWIN-Slot-Finder",
  },
];
