export const projects = [
  {
    title: "geotriage",
    description: "A **satellite imagery triage platform** - draw an area on a map, choose a date range and the detectors to run (water, vegetation, surface heat), and it searches public satellite archives, scores every matching image, and ranks them **green / yellow / red** so analysts only open the ones that matter.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "PostGIS", "Docker", "rasterio", "MinIO", "React", "MapLibre"],
    github: "https://github.com/arbhalerao/geotriage",
    demo: "",
    features: [
      "**Pluggable detectors and data sources as Docker images** - each is built on a shared base image and talks to the platform through a small command protocol, so new analyses or archives are added by registering an image, never by changing platform code",
      "**Sandboxed execution** - every run is a short-lived container with a read-only filesystem, dropped privileges, memory/CPU/time limits, and **no network access** for detectors, so untrusted code can't reach anything beyond its inputs",
      "**Automated admission checks** - before an image is accepted, the platform validates what it declares and does a **test run on synthetic data** to confirm it actually returns the scores it promised",
      "**Cost-aware processing pipeline** - cloud cover and location are filtered at search time, an optional quick check on a **low-resolution preview** discards uninteresting scenes early, and bands are read at the coarsest resolution the detectors accept instead of full size",
      "**Archive-agnostic data model** - bands from sources like **Sentinel-2** and **Landsat** are mapped to common names and converted to physical units, so one detector runs unchanged against any archive",
      "**Custom job queue on PostgreSQL** - parallel workers with retries and backoff, automatic recovery of work from crashed workers, chained steps per scene, and scheduled re-runs that keep an area under **continuous monitoring**",
      "**Analyst web app** - React + MapLibre for drawing areas, charts of scores over time, severity-filtered results, review status and bookmarks, and map overlays of derived rasters",
      "**Standalone Python SDK** - base classes for writing detectors and data sources, plus a CLI to validate them, verify them against a live archive, and test them on a real satellite scene before deployment",
      "**125 tests** across the SDK and the platform's pipeline, admission checks, and job flow"
    ],
  },
  {
    title: "causality-bench",
    description: "An experiment comparing two ways distributed systems track the order of events - **Lamport clocks vs vector clocks**. A deterministic simulator records the true order of every execution independently of both clocks, then scores each against it to measure how much ordering information the cheaper clock loses and what the exact one costs.",
    technologies: ["Python", "NumPy", "pandas", "NetworkX", "SciPy", "Matplotlib", "Discrete-Event Simulation"],
    github: "https://github.com/arbhalerao/causality-bench",
    demo: "",
    features: [
      "**Independent ground truth** - the true \"happened-before\" relationships are built purely from program order and message send/receive, never from either clock's timestamps, so the clocks being tested can't also be the answer key",
      "**Fair side-by-side comparison** - both clocks run over the exact same execution, so every difference comes from the clock design rather than from a different run",
      "**Every pair checked, not a sample** - a precomputed ancestor index answers \"did A happen before B?\" in a single lookup, making it practical to check all **~50M event pairs** in each run",
      "**Index verified two independent ways** - against a brute-force graph search on every pair of a small execution, and against NetworkX's transitive closure",
      "**1,320 simulated runs** across 2-128 nodes, 5 network topologies, 3 delay models, 6 message rates, and 16 message-loss/crash settings, each repeated over 30 seeds - Lamport clocks misorder **95.4%-99.3%** of concurrent event pairs, while vector clocks cost **16.3x** more per receive and carry **N×** more metadata per message",
      "**Crash-recovery modeling** - nodes keep their clock state through an outage, since a node that forgot its logical time would break the clock's ordering guarantee",
      "**163 tests** covering the clocks, causality engine, simulator, metrics, statistics, visualizations, and analysis notebooks"
    ],
  },
  {
    title: "overpass",
    description: "A live **\"what's above this point?\"** view of the sky - pick a location on a map and a radius, and Overpass shows the **aircraft** flying within that circle and the **satellites** passing overhead, including which ones you could actually see with the naked eye right now.",
    technologies: ["Python", "FastAPI", "Skyfield", "SGP4", "Geodesy", "WebSockets", "React", "Docker"],
    github: "https://github.com/arbhalerao/overpass",
    demo: "",
    features: [
      "**Real naked-eye visibility, not just \"overhead\"** - a satellite counts as visible only when it's above the horizon, lit by the sun, and the sky at your location is dark enough, computed with **Skyfield** and NASA JPL's **DE421** ephemeris",
      "**Accurate Earth geometry** - search areas use the **WGS-84** Earth model rather than a perfect sphere, and correctly handle areas that cross the international date line, sit near the poles, or need trimming to a true circle",
      "**Satellite positions from live orbital data** - elements from **CelesTrak** feed the **SGP4** propagator directly, and each satellite reports how old its data is, since predictions drift roughly a kilometre per day",
      "**Caching that protects upstream APIs** - aircraft refresh every 5 seconds and orbits every 2 hours, and many simultaneous requests for the same data trigger just one upstream call",
      "**Robust OpenSky integration** - OAuth2 login with cached tokens, one automatic retry when a token expires mid-request, and rate-limit wait times passed back to the caller instead of hidden",
      "**Graceful partial failure** - aircraft and satellite data are fetched in parallel, so if one source is down you still get the other; results are served over both REST and a live **WebSocket** stream",
      "**Flight numbers from callsigns** - aircraft broadcasts don't include the airline, so callsigns are decoded against a catalogue of 136 airlines to recover commercial flight numbers and separate airline traffic from private flights",
      "**Clean layered architecture** - API, services, data clients, and core domain each depend only on the layer below, with the whole stack started by one `docker compose up`"
    ],
  },
  {
    title: "cadutrace",
    description: "An offline analyzer for **spacecraft telemetry** in the **CCSDS** standards used by space agencies - it takes a raw recording of what a ground station received and unpacks it layer by layer, from transfer frames to reassembled data packets to decoded application data, producing a health report or an interactive terminal UI.",
    technologies: ["Go", "CCSDS", "Binary Protocol Parsing", "Bubble Tea", "mmap"],
    github: "https://github.com/arbhalerao/cadutrace",
    demo: "",
    features: [
      "**Packet reassembly across frame boundaries** - stitches back together data packets that were split across multiple transfer frames, detecting packets that were lost or truncated along the way",
      "**Zero-copy parsing over mmap** - reads the recording through memory-mapping instead of copying bytes, so multi-GB, larger-than-RAM captures stream at **~1.6 GB/s**",
      "**Wrap-aware gap detection** - frame and packet sequence counters roll over at a fixed size, so missing, duplicated, and out-of-order data is classified correctly even across the wraparound",
      "**CFDP file-transfer tracking** - reconstructs files sent down from the spacecraft and reports how complete each one is, down to the **exact missing byte ranges**, even when pieces arrive out of order or overlap",
      "**Broad standards coverage** - **TM** and **AOS** transfer frames, **Space** and **Encapsulation** packets, **CLCW** uplink status reports, and optional derandomization",
      "**Pluggable decoders** - application-specific decoders are selected by packet ID and isolated so a crashing decoder can't take down the analysis; CFDP is built as one of them",
      "**Two interfaces** - a text/JSON health report that's deterministic and easy to diff in CI, and an interactive **Bubble Tea** terminal UI for browsing frames, packets, hex dumps, file transfers, and stats",
      "**Synthetic data generator** - produces byte-exact test recordings, including randomized and lossy streams, at gigabyte scale"
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
    description: "The Python SDK for building geotriage plugins - base classes for writing satellite-image detectors and data sources, a CLI to validate them, check them against a live archive, and test them on a real scene, plus the Docker base image every plugin is built on.",
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
