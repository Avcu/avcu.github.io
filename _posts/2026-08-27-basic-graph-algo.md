---
title: "Basic Graph Algorithms"
categories:
  - Programming
tags:
  - Graph
  - Data Structure
  - Algorithm
---

Here is the most frequently used graph algorithms and data structures. This page will
not go into the details of other data structures that are used for example: stacks, queues,
hash maps etc. and will keep the focus on the graph techniques.

### Traversing Graphs - Find cycle in undirected graph

First, prepare the following variables:
  1. `adj` (list of list): adjacency matrix
      * add both directions [i][j] and [j][i] for a single edge
  2. `seen` (set): to store the discovered vertex

Then, do the following operations:
  1. Add [0, -1] to a queue, format is going to be (node, parent)
  2. Pop from the queue in a while loop
      * If there is a neighbor that is seen before return `True`, that's a cycle
      * If neighbor is the parent, skip
      * Otherwise, add the neighbor to the queue and seen set

Runtime Complexity: `O(V + E)`

Sample Problem: [https://neetcode.io/problems/valid-tree](https://neetcode.io/problems/valid-tree)

Code:
``` python
from collections import deque

class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        adj = [[] for _ in range(n)]

        for edge in edges:
            adj[edge[0]].append(edge[1])
            adj[edge[1]].append(edge[0])

        seen = set()
        q = deque()
        q.append([0, -1])
        seen.add(0)

        while q:
            child, parent = q.popleft()

            for nei in adj[child]:
                if nei == parent:
                    continue
                if nei in seen:
                    return False
                q.append([nei, child])
                seen.add(nei)
        return len(seen) == n
```