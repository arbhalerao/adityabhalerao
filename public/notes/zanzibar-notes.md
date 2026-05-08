# My Notes on Zanzibar: Google's Authorization System

## Overview
Zanzibar is Google's globally distributed authorization system that handles trillions of access control checks daily across YouTube, Drive, Calendar, and other Google services.

## Core Architecture

### Relation Tuples
- Basic building block: `<object>#<relation>@<user>`
- Example: `doc:readme#owner@user:alice`
- Stored in a distributed database (Spanner)

### Key Features
- **Namespace Configuration**: Define object types and relations
- **Check API**: Verify if user has permission
- **Expand API**: Show all users with a given permission
- **Watch API**: Real-time permission change notifications

### Consistency Model
- Uses Zookies (similar to cookies) for external consistency
- Ensures users see effect of their own writes immediately
- Leverages Spanner's TrueTime for global consistency

## Design Decisions

### Why Spanner?
- Global distribution with strong consistency
- Scales to trillions of relations
- Built-in replication and fault tolerance

### Caching Strategy
- Negative results cached differently than positive
- Cache invalidation through Watch API
- TTL-based expiration for safety

## Personal Insights
- The relation tuple model is elegant and expressive
- External consistency through Zookies is clever
- Trade-off between consistency and latency is well-balanced

## Implementation Considerations
- How to model complex hierarchies efficiently
- Balancing cache hit rate vs. freshness
- Monitoring and debugging authorization issues at scale

## Open Source Alternatives
- SpiceDB (implements Zanzibar concepts)
- Ory Keto
- OpenFGA

## Questions to Explore
- How does Zanzibar handle schema migrations?
- Performance characteristics under different workload patterns
- Integration patterns with application code
