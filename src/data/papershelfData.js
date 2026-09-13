const papers = [
    {
        title: "Time, Clocks, and the Ordering of Events in a Distributed System",
        summary: "Lamport's 1978 paper defining the happens-before relation and the logical clock built on it, showing that a distributed system can order events by causality without any shared notion of time.",
        link: "https://lamport.azurewebsites.net/pubs/time-clocks.pdf",
    },
    {
        title: "Virtual Time and Global States of Distributed Systems",
        summary: "Mattern argues that a linearly ordered notion of time is inadequate for distributed systems, and replaces it with vectors of clocks that are only partially ordered, capturing causality exactly where a single counter cannot.",
        link: "https://www.vs.inf.ethz.ch/publ/papers/VirtTimeGlobStates.pdf",
    },
    {
        title: "In Search of an Understandable Consensus Algorithm",
        summary: "This paper presents the RAFT consensus algorithm, emphasizing its simplicity and ease of understanding compared to other distributed consensus algorithms like Paxos.",
        link: "https://raft.github.io/raft.pdf",
        notes: "/notes/raft-notes.md"
    },
    {
        title: "Zanzibar: Google's Consistent, Global Authorization System",
        summary: "This paper details Zanzibar, Google's scalable and globally distributed access control system designed to provide consistent permission management at massive scale.",
        link: "https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/",
        notes: "/notes/zanzibar-notes.md"
    },
    {
        title: "Consistent Hashing and Random Trees",
        summary: "This paper introduces consistent hashing, a distributed systems technique that enables efficient data distribution and load balancing in scalable hash table implementations.",
        link: "https://www.cs.princeton.edu/courses/archive/fall09/cos518/papers/chash.pdf",
        notes: "/notes/consistent-hashing-notes.md"
    },
    {
        title: "Scaling Memcache at Facebook",
        summary: "This paper describes Facebook's approach to scaling memcached to handle billions of requests per second, detailing their distributed caching architecture and optimization strategies.",
        link: "https://research.facebook.com/file/839620310074473/scaling-memcache-at-facebook.pdf",
        notes: "/notes/memcache-notes.md"
    },
    {
        title: "Monolith: Real Time Recommendation System With Collisionless Embedding Table",
        summary: "This paper presents ByteDance's Monolith, a production recommendation system featuring a collisionless Cuckoo hash-based embedding table and online training architecture that syncs parameters to serving PS at minute-level intervals for real-time personalization.",
        link: "https://arxiv.org/pdf/2209.07663",
    },
];

export default papers;