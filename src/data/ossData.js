const contributions = [
    {
        title: "redis/rueidis",
        link: "https://github.com/redis/rueidis",
        priority: 1,
        summary: "A fast Golang Redis client that supports Client Side Caching, Auto Pipelining, Generics OM, RedisJSON, RedisBloom, RediSearch, etc.",
        prs: [
            {
                kind: "Feature",
                title: "Implemented LCS (Longest Common Substring) Command",
                link: "https://github.com/redis/rueidis/pull/767",
                status: "merged"
            },
            {
                kind: "Bug",
                title: "Ensure AUTH Command is Sent Before HELLO in NewClient Initialization",
                link: "https://github.com/redis/rueidis/pull/791",
                status: "merged"
            },
            {
                kind: "Bug",
                title: "Added SCORER and ADDSCORES Options to FT.AGGREGATE Command",
                link: "https://github.com/redis/rueidis/pull/815",
                status: "merged"
            },
            {
                kind: "Perf",
                title: "Consolidate wire, sc, mu slices into muxwire struct to reduce memory overhead",
                link: "https://github.com/redis/rueidis/pull/869",
                status: "merged"
            },
        ],
        issues: []
    },
    {
        title: "authzed/spicedb",
        link: "https://github.com/authzed/spicedb",
        priority: 2,
        summary: "Open Source, Google Zanzibar-inspired database for scalably storing and querying fine-grained authorization data.",
        prs: [
            {
                kind: "Feature",
                title: "Support a WriteSchema dry-run",
                link: "https://github.com/authzed/spicedb/pull/2491",
                status: "open"
            }
        ],
        issues: []
    },
    {
        title: "DiceDB/dice",
        link: "https://github.com/DiceDB/dice",
        priority: 3,
        summary: "DiceDB is an open-source in-memory database with query subscriptions.",
        prs: [
            {
                kind: "Feature",
                title: "Add APPEND Command to DiceDB with Redis-like Behavior, Tests, and Benchmarking",
                link: "https://github.com/DiceDB/dice/pull/759",
                status: "merged"
            },
        ],
        issues: [
            {
                title: "Reported Inconsistent MSET Command Behavior",
                link: "https://github.com/DiceDB/dice/issues/516"
            },
            {
                title: "Reported another Inconsistent MSET Command Behavior",
                link: "https://github.com/DiceDB/dice/issues/406"
            },
        ]
    },
    {
        title: "p2-inc/keycloak-orgs",
        link: "https://github.com/p2-inc/keycloak-orgs",
        priority: 4,
        summary: "A Keycloak extension enabling single-realm, multi-tenancy for SaaS applications",
        prs: [
            {
                kind: "Feature",
                title: "Add attribute-based filtering to get organization count API",
                link: "https://github.com/p2-inc/keycloak-orgs/pull/321",
                status: "merged"
            },
        ],
        issues: [
            {
                title: "Support attribute-based filtering",
                link: "https://github.com/p2-inc/keycloak-orgs/issues/320"
            },
            {
                title: "GET /invitations fails with 400 error when using admin-cli token",
                link: "https://github.com/p2-inc/keycloak-orgs/issues/306"
            },
        ]
    }
];

export default contributions;
