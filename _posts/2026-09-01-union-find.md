---
title: "Union-Find Algorithm"
categories:
  - Programming
tags:
  - Graph
  - Data Structure
  - Algorithm
---

This post will not go into the details of other data structures that are used for example: stacks, queues, hash maps etc. and will keep the focus on the graph techniques.

## Union-Find Algorithm

> `Union-Find`: also known as Disjoint Set Union (DSU) manages a collection of elements split into non-overlapping sets.


``` python
# initially, parent for each vertex is itself
parent = [i for i range(v)]
rank = [1 for i range(v)]

# find the parent recursively
def find(n):
  if par[n] == n:
    return n
  # path compression optimization
  par[n] = find(par[n])
  return par[n]

def union(n1, n2):
  p1, p2 = find(n1), find(n2)
  # they are in the same set, return False
  if p1 == p2:
    return False
  if rank[p1] > rank[p2]:
    par[p2] = p1
  elif rank[p2] > rank[p1]:
    par[p1] = p2
  else:
    par[p1] = p2
    rank[p2] += 1
  return True

```

Complexity Analysis:
* Runtime Complexity: `O(log(n)) -> O(alpha(n))` with path compression optimization where alpha is the inverse ackermann function that never exceeds 4 for any value n in the physical universe.
* Space Complexity: `O(n)`

### Redundant Connection

Sample Problem: [https://neetcode.io/problems/redundant-connection](https://neetcode.io/problems/redundant-connection)

Code:
``` python
class Solution:
    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:
        par = [i for i in range(len(edges)+1)]
        rank = [1] * (len(edges)+1)

        def find(n):
            if par[n] == n:
                return n
            par[n] = find(par[n])
            return par[n]
        
        def union(n1, n2):
            p1, p2 = find(n1), find(n2)

            if p1==p2:
                return False
            if rank[p1] > rank[p2]:
                par[p2] = p1
            elif rank[p2] > rank[p1]:
                par[p1] = p2
            else:
                par[p2] = p1
                rank[p1] += 1
            return True

        for n1, n2 in edges:
            if not union(n1, n2):
                return [n1, n2]
```
