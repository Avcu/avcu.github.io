---
title: "Dijkstra's Algorithm and Shortest Path"
categories:
  - Programming
tags:
  - Graph
  - Data Structure
  - Algorithm
---

**Dijkstra's** algorithm finds the shortest path from the source node to all other nodes when all edge weights are *non-negative* by using min-heap.

Key idea in this algorithm is to always keep expanding by using the min edge distance among unexplored nodes. Note that same node could be added into min-heap many times but when it is picked from the min-heap, its shortest distance is final.

Sample problem: [https://neetcode.io/problems/network-delay-time](https://neetcode.io/problems/network-delay-time)

Code:
``` python
from heapq import heappush, heappop

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        minDict = defaultdict(int)
        adj = [[] for _ in range(n+1)]

        for t in times:
            adj[t[0]].append([t[1], t[2]])

        # (weight, node)
        minHeap = [(0, k)]

        while minHeap:
            curW, curNode = heappop(minHeap)

            if curNode in minDict:
                continue
            minDict[curNode] = curW

            for nei, neiW in adj[curNode]:
                if nei not in minDict:
                    heappush(minHeap, (curW+neiW, nei))

        
        return -1 if len(minDict) != n else max(minDict.values())
```

Complexity Analysis:
* Runtime Complexity: `O(E x log(E))` for the above implementation.
  * With decrease key: `O(V x log(V) + E x log(V))` where `V x log(V)` to delete vertices from the heap and `E x log(V)` to update values in the heap.
* Space Complexity: `O(E+V)`

## Bellman-Ford Algorithm

Bellman-Ford algorithm updates the distances repeatedly with relaxations. Each relaxation tries to improve the shortest distance to a node by expanding the optimal shortest distances.

Code:
``` python
class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        dist = [float('inf')] * n
        dist[k - 1] = 0
        for _ in range(n - 1):
            for u, v, w in times:
                if dist[u - 1] + w < dist[v - 1]:
                    dist[v - 1] = dist[u - 1] + w
        max_dist = max(dist)
        return max_dist if max_dist < float('inf') else -1
```

Complexity Analysis:
* Runtime Complexity: `O(V x E)`
* Space Complexity: `O(E+V)`

And here is the optimized version of Bellman-Ford algorithm, known as Shortest Path Faster Algorithm.
* Only process nodes whose distance was actually improved
* Use queue to propagate distance updates

Code:
``` python
class Solution:
    def networkDelayTime(self, times, n, k):
        adj = defaultdict(list)
        for u, v, w in times:
            adj[u].append((v, w))

        dist = {node: float("inf") for node in range(1, n + 1)}
        q = deque([(k, 0)])
        dist[k] = 0

        while q:
            node, time = q.popleft()
            if dist[node] < time:
                continue
            for nei, w in adj[node]:
                if time + w < dist[nei]:
                    dist[nei] = time + w
                    q.append((nei, time + w))

        res = max(dist.values())
        return res if res < float('inf') else -1
```

Complexity Analysis:
* Runtime Complexity: `O(V x E)` in worst case and `O(V+E)` in average
* Space Complexity: `O(E+V)`

### Cheapest Flights Within K Stops

Problem: [https://neetcode.io/problems/cheapest-flight-path](https://neetcode.io/problems/cheapest-flight-path)

For this problem, Bellman-Ford algorithm fits very well because of the limit on the path length.

Code:
``` python
from collections import deque

class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        cost = [float('inf')] * n
        cost[src] = 0

        for _ in range(k+1):
            newCost = cost.copy()
            for u, v, price in flights:
                if cost[u] != float('inf'):
                    newCost[v] = min(newCost[v], cost[u] + price)

            cost = newCost

        return -1 if cost[dst] == float('inf') else cost[dst]
```