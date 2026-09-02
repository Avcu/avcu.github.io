---
title: "Union-Find Algorithm and Minimum Spanning Tree"
categories:
  - Programming
tags:
  - Graph
  - Data Structure
  - Algorithm
---

**Union-Find** algorithm also known as Disjoint Set Union (DSU) manages a collection of elements split into non-overlapping sets. It is highly efficient for tracking connected elements. It has two operations as follows:
1. find(n): finds the representative (root) of the set containing node n. If two elements return the same root, they are in the same set
2. union(n1, n2): merges the set containing n1 with the set containing n2 into a single set

Note that this algorithm only works with undirected graphs.

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

## Minimum Spanning Tree (Kruskal's Algorithm)

1. Sort all edges in the graph in ascending order
2. Pick the smallest edge from the sorted list
3. Check for cycles, union-find fits perfectly here
4. Add the edge to the MST if it does not form a cycle

Note that this algorithm only works with undirected graphs and its time complexity is `O(E x log(E))`

Sample Problem: [https://neetcode.io/problems/min-cost-to-connect-points](https://neetcode.io/problems/min-cost-to-connect-points)

Code:
``` python
class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        n = len(points)
        par = [i for i in range(n)]
        rank = [1] * n

        def find(n):
            if par[n] == n:
                return n
            par[n] = find(par[n])
            return par[n]

        def union(n1, n2):
            p1, p2 = find(n1), find(n2)
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

        edges = []
        for i in range(n):
            for j in range(i+1, n):
                currDist = abs(points[i][0]-points[j][0]) + abs(points[i][1]-points[j][1])
                edges.append([currDist, i, j])
        edges.sort()


        res = 0
        for dist, u, v in edges:
            if union(u, v):
                res += dist
        return res
```