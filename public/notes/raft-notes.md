# My Notes on RAFT Consensus Algorithm

## Overview
RAFT is a consensus algorithm designed for managing a replicated log. It's more understandable than Paxos while providing the same guarantees.

## Key Concepts

### Leader Election
- Servers can be in one of three states: follower, candidate, or leader
- Election timeouts are randomized to prevent split votes
- Majority vote required to become leader

### Log Replication
- Leader receives client requests and appends to its log
- Leader replicates entries to follower servers
- Entries are committed once safely replicated on majority

### Safety Properties
- **Election Safety**: At most one leader per term
- **Leader Append-Only**: Leaders never overwrite or delete entries
- **Log Matching**: If two logs contain same entry, all preceding entries match
- **Leader Completeness**: If entry committed in term, present in all future leaders
- **State Machine Safety**: If server applies log entry at index, no other server applies different entry

## Personal Insights
- The simplicity of RAFT makes it much easier to implement correctly
- Term numbers are crucial for maintaining consistency
- Randomized election timeouts elegantly solve the split vote problem

## Questions to Explore
- How does RAFT handle network partitions?
- Performance comparison with Paxos in production systems
- Optimal election timeout values for different scenarios

## Related Papers
- Paxos Made Simple
- ZooKeeper: Wait-free coordination for Internet-scale systems
