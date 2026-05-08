# My Notes on Consistent Hashing

## Problem Statement
Traditional hashing (e.g., `hash(key) % N`) requires remapping most keys when servers are added or removed. This is inefficient for distributed caches and databases.

## Core Concept
Consistent hashing maps both keys and nodes to the same hash space (typically a ring), minimizing remapping when nodes join or leave.

## How It Works

### Hash Ring
- Hash space is treated as a circular ring (0 to 2^32-1)
- Both keys and nodes are hashed onto this ring
- Each key is assigned to the first node clockwise from its position

### Virtual Nodes
- Each physical node is mapped to multiple positions (virtual nodes)
- Improves load distribution
- Reduces impact of hotspots

## Key Properties

### Monotonicity
- When a node is added, only keys that would map to it are remapped
- When a node is removed, only its keys are redistributed
- No cascading remapping required

### Load Balancing
- With virtual nodes, load is distributed evenly
- Number of virtual nodes can be tuned based on node capacity

### Bounded Load
- With K virtual nodes per physical node, load variance is O(log N / K)

## Applications

### Distributed Caching
- Memcached, Redis Cluster
- Minimizes cache invalidation on cluster changes

### Distributed Databases
- Cassandra, DynamoDB
- Partition data across nodes efficiently

### Content Delivery Networks
- Route requests to nearest edge server
- Handle server failures gracefully

## Personal Insights
- Virtual nodes are crucial for practical implementations
- Trade-off between number of virtual nodes and lookup performance
- Weighted consistent hashing can handle heterogeneous nodes

## Implementation Considerations
- Choosing the right hash function (MD5, SHA-1, MurmurHash)
- Optimal number of virtual nodes (typically 100-200)
- Handling node capacity differences
- Monitoring load distribution

## Advanced Topics
- Jump Consistent Hash (Google's improvement)
- Rendezvous Hashing (Highest Random Weight)
- Multi-probe consistent hashing

## Questions to Explore
- How does consistent hashing compare to range-based partitioning?
- Impact on query patterns that need data locality
- Handling gradual capacity changes
