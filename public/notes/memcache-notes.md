# My Notes on Scaling Memcache at Facebook

## Overview
This paper describes how Facebook scaled memcached to handle billions of requests per second, serving as a distributed cache layer between application servers and databases.

## Architecture Layers

### Within a Cluster
- **Web servers**: Application tier that queries memcache
- **Memcached servers**: Cache layer storing key-value pairs
- **Databases**: Persistent storage layer (MySQL)

### Across Regions
- Multiple data centers with read replicas
- One primary region for writes
- Regional pools for different use cases

## Key Optimizations

### Latency Reduction
- **All-to-All Communication**: Every web server can talk to every memcache server
- **UDP for Gets**: Lower latency than TCP for read-heavy workloads
- **TCP for Sets**: Reliability needed for writes
- **Client-Side Batching**: Aggregate requests to reduce network round trips

### Load Distribution
- **Consistent Hashing**: Distribute keys across memcache servers
- **Replication**: Replicate hot keys across multiple servers
- **Regional Pools**: Isolate different workloads

### Failure Handling
- **Gutter Pool**: Small cluster of servers to handle failovers
- **Automatic Fallback**: On memcache miss, fall back to database
- **Stale Sets**: Prevent thundering herd on cache invalidation

## Leases and Consistency

### Problem: Stale Data
- Race condition: Read from DB while another client invalidates cache

### Solution: Leases
- 64-bit token granted on cache miss
- Must present valid lease to update cache
- Prevents stale sets from overwriting fresh data

### Delete Operations
- Invalidate cache on write (don't update in place)
- Simpler reasoning about consistency
- Deletes propagated to all regions

## Regional Consistency

### Master-Slave Replication
- Writes go to primary region
- Invalidations sent to replica regions via mcsqueal
- Race conditions handled through versioning

### Cold Cluster Warmup
- Gradually redirect traffic to new clusters
- Prevent thundering herd on database

## Personal Insights
- The scale is mind-boggling (billions of requests/sec)
- Many problems are unique to extreme scale
- Simple solutions (like deletes instead of updates) often work best
- UDP for gets is clever - losing occasional request is acceptable

## Design Trade-offs

### Eventual Consistency
- Accept stale reads for better performance
- Leases provide bounded staleness

### Write-Through vs Write-Behind
- Chose invalidation over write-through
- Simpler failure modes

### Availability vs Consistency
- Gutter pool prioritizes availability
- Can serve slightly stale data during failures

## Key Takeaways
1. **Look-aside cache**: Application manages cache population
2. **Separate read and write paths**: Different protocols (UDP vs TCP)
3. **Failure is normal**: Design for graceful degradation
4. **Regional replication**: Balance between consistency and latency

## Questions to Explore
- How does this compare to modern solutions like Redis?
- Impact of machine learning workloads on cache patterns
- Evolution since paper publication (2013)

## Related Technologies
- TAO (Facebook's distributed data store for social graph)
- Redis Cluster
- Memcached protocol extensions
