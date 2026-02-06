const experiences = [
    {
        company: "Geminus Space",
        logo: "/geminus_space.jpeg",
        role: "Software Engineer (backend)",
        duration: "October 2024 - Present",
        projects: [
            {
                name: "Unified Ground Ops Platform",
                achievements: [
                    "Architected and built a **multi-tenant platform** supporting **multiple satellites and ground stations**, enabling end-to-end downstream data processing workflows—from **pass schedule ingestion** and **event-driven pipeline instantiation**, through **registry-based data acquisition**, **configurable processing chains**, and long-term archival systems—using **microservices in Go**.",
                    "Designed and implemented a **reconciliation engine** with **concurrent control loops** managing **data pipeline lifecycles**, orchestrating multi-stage **Argo Workflows** with **dynamic workflow generation**, **artifact chaining across L0/L1/L2 stages**, and **MinIO-backed object storage**.",
                    "Developed a **binary TCP protocol client** for **SAFRAN CORTEX HDR**, supporting **chunked streaming downloads** (∼1500 blocks/request) and complex **state machines** for session discovery, file listing, and telemetry block reconstruction, with **Python-based mock servers** for development and testing."
                ]
            },
            {
                name: "Unified Data Platform",
                achievements: [
                    "Developed a **Python-based catalog importer** to ingest **satellite imagery** from **ISRO's Bhoonidhi platform**.",
                    "Integrated **commercial SAR imagery** from **Umbra Space**, building **ingestion pipelines** backed by **AWS S3 public catalogs** with support for **GEC, SICD, and SIDD (NITF) data formats**.",
                    "Implemented ingestion support for **Planet Labs SkySat and Tanager catalogs**, including **recursive traversal** of hierarchical catalog structures specific to Planet Labs datasets."
                ]
            }
        ],
        link: "https://geminus.space/",
    },
    {
        company: "Geminus Tech",
        logo: "/geminus_tech.jpeg",
        role: "Software Engineer (backend)",
        duration: "July 2024 - September 2024",
        projects: [
            {
                name: "Antaris",
                achievements: [
                    "Integrated **multiple internal services** within the **Antaris Cloud Platform**, enabling reliable **cross-service communication** and improving overall **platform orchestration**.",
                    "Worked extensively on the **Mission Orchestrator**, contributing to **task scheduling** and **optimization** for satellite operations by factoring in **satellite constraints** and **imaging order priorities**."
                ]
            },
            {
                name: "Pyro",
                achievements: [
                    "Implemented **Keycloak-based authentication**, **API key management**, and **multitenancy**, enabling **secure tenant isolation** and **scalable access control**.",
                    "Designed and built **backend infrastructure primitives** including **organization-scoped data isolation**, **role-based authorization**, and **resilient API layers** to support **distributed services**."
                ]
            }
        ],
        link: "https://geminustech.com/",
    },
    {
        company: "Diamanti",
        logo: "/diamanti.jpeg",
        role: "SDE Intern (backend)",
        duration: "October 2023 - July 2024",
        projects: [
            {
                name: null,
                achievements: [
                    "Resolved **2 critical Kubernetes RBAC vulnerabilities** in Ultimate Enterprise and Ultima Accelerator, strengthening least-privilege access and improving cluster security.",
                    "Contributed to **KubeVirt integration** within Diamanti's Kubernetes-native platform, testing and validating **∼30 VM pods per cluster** across multiple clusters to support VM-based workloads and hybrid container–VM deployments."
                ]
            }
        ],
        link: "https://diamanti.com/",
    },
];

export default experiences;