const tech = [
    {
        name: "GoLang",
        link: "https://golang.org",
        image: "/golang.svg",
        stack: ["GORM", "Concurrency Patterns", "Echo", "gRPC", "Gorilla Mux"],
        stackType: "Ecosystem"
    },
    {
        name: "Python",
        link: "https://www.python.org",
        image: "/python.svg",
        stack: ["FastAPI", "REST APIs"],
        stackType: "Ecosystem"
    },
    {
        name: "FastAPI",
        link: "https://fastapi.tiangolo.com/",
        image: "/fastapi.svg",
        stack: ["JWT Auth", "Pydantic", "Async Endpoints"],
        stackType: "Framework"
    },
    {
        name: "Docker",
        link: "https://www.docker.com",
        image: "/docker.svg",
        stack: ["Docker Compose", "Containerization", "Container Networking"],
        stackType: "Toolset"
    },
    {
        name: "Kubernetes",
        link: "https://kubernetes.io",
        image: "/kubernetes.svg",
        stack: ["CKA", "Helm Charts", "Ingress", "RBAC"],
        stackType: "Toolchain"
    },
    {
        name: "PostgreSQL",
        link: "https://www.postgresql.org",
        image: "/postgresql.svg",
        stack: ["Transactions", "Indexing", "Joins"],
        stackType: "Database"
    },
    {
        name: "MongoDB",
        link: "https://www.mongodb.com",
        image: "/mongodb.svg",
        stack: ["Transactions"],
        stackType: "Database"
    },
    {
        name: "InfluxDB",
        link: "https://www.influxdata.com",
        image: "/influxdb.svg",
        stack: ["Flux Query Language", "Data Retention", "Backups"],
        stackType: "Database"
    },
    {
        name: "Google Cloud",
        link: "https://cloud.google.com",
        image: "/googlecloud.svg",
        stack: ["GKE"],
        stackType: "Cloud Platform"
    },
    {
        name: "Keycloak",
        link: "https://www.keycloak.org",
        image: "/keycloak.svg",
        stack: ["OIDC", "Realm Management", "Access Control", "Magic Link Login"],
        stackType: "Identity Management"
    }
];

export default tech;
