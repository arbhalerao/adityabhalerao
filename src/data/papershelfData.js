const papers = [
    {
        title: "In Search of an Understandable Consensus Algorithm",
        summary: "This paper presents the RAFT consensus algorithm, emphasizing its simplicity and ease of understanding compared to other distributed consensus algorithms like Paxos.",
        link: "https://raft.github.io/raft.pdf",
    },
    {
        title: "Zanzibar: Google's Consistent, Global Authorization System",
        summary: "This paper details Zanzibar, Google's scalable and globally distributed access control system designed to provide consistent permission management at massive scale.",
        link: "https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/",
    },
    {
        title: "Consistent Hashing and Random Trees",
        summary: "This paper introduces consistent hashing, a distributed systems technique that enables efficient data distribution and load balancing in scalable hash table implementations.",
        link: "https://www.cs.princeton.edu/courses/archive/fall09/cos518/papers/chash.pdf",
    },
    {
        title: "Scaling Memcache at Facebook",
        summary: "This paper describes Facebook's approach to scaling memcached to handle billions of requests per second, detailing their distributed caching architecture and optimization strategies.",
        link: "https://research.facebook.com/file/839620310074473/scaling-memcache-at-facebook.pdf",
    },
    {
        title: "Monolith: Real Time Recommendation System With Collisionless Embedding Table",
        summary: "This paper presents ByteDance's Monolith, a production recommendation system featuring a collisionless Cuckoo hash-based embedding table and online training architecture that syncs parameters to serving PS at minute-level intervals for real-time personalization.",
        link: "https://arxiv.org/pdf/2209.07663",
    },
];

export default papers;