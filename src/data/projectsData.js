export const projects = [
  {
    title: "CohereDB",
    description: "A **distributed key-value database** implementing **consistent hashing** and **dynamic data server management** across multiple nodes.",
    technologies: ["Go", "gRPC", "BadgerDB", "Protocol Buffers", "Consistent Hashing"],
    images: { light: "/coheredb-light.png", dark: "/coheredb-dark.png" },
    github: "https://github.com/arbhalerao/cohereDB",
    demo: "",
    features: [
      "**Consistent hashing algorithm** for even data distribution across nodes",
      "**Automatic service discovery** and server registration via HTTP API",
      "**Health monitoring** with automatic failure detection and node removal",
      "**gRPC-based high-performance** client-server communication",
      "**CLI client** for easy database operations and cluster management",
      "**BadgerDB integration** for persistent local storage on each node"
    ],
  },
  {
    title: "Autorollout",
    description: "A **Kubernetes controller** that automatically triggers **rolling updates** for Deployments when their **ConfigMaps or Secrets change**.",
    technologies: ["Go", "Kubebuilder", "Kubernetes Controller", "Client-Go", "Docker"],
    images: { light: "/autorollout-light.png", dark: "/autorollout-dark.png" },
    github: "https://github.com/arbhalerao/autorollout",
    demo: "",
    features: [
      "**Label-based selective watching** (autorollout.io=true) - zero config needed",
      "Supports all **ConfigMap/Secret usage patterns** (env, envFrom, volumes, imagePullSecrets)",
      "**Event-driven** with efficient resource watching using controller-runtime",
      "Comprehensive **RBAC** and proper error handling",
      "**Lightweight, stateless design** with minimal cluster overhead"
    ]
  },
  {
    title: "GraphAuth",
    description: "A **graph-based relationship authorization engine**, modeling entities and permissions as a **directed graph** with **BFS-based permission traversal**.",
    technologies: ["Go", "Neo4j", "REST API", "Docker", "Graph Theory"],
    images: { light: "/graphauth-light.png", dark: "/graphauth-dark.png" },
    github: "https://github.com/arbhalerao/graphauth",
    demo: "",
    features: [
      "**Graph-based authorization model** with Users, Groups, and Documents as typed nodes",
      "**BFS permission traversal** resolving inherited access through group membership chains",
      "**Pluggable storage backends**, in-memory store and Neo4j",
      "**REST HTTP API** for managing nodes, relationships, and permission checks",
      "**Relation types** — VIEWER, EDITOR, OWNER, MEMBER_OF with strict validation",
      "**Docker and docker-compose** support for containerized deployment"
    ],
  },
];

export const sideProjects = [
  {
    title: "Go Software RAID",
    description: "RAID 0, 1, and 5 in Go — disks backed by flat files, blocks read/written through the RAID abstraction layer.",
    github: "https://github.com/arbhalerao/go-software-raid",
  },
];