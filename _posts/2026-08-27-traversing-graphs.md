---
title: "Traversing Graphs"
categories:
  - Programming
tags:
  - Graph
  - Data Structure
  - Algorithm
---

There are two main ways to traverse a graph:
  1. Add vertices to stack or queue, and pop from the stack/queue and add the neighbors to the stack/queue. Stack will result in DFS while queue will result in BFS.
  2. Write a recursive method that takes vertex as an input and call the same method for the neighbors. In undirected graphs, we usually end up ending the parent vertex as a parameter to the method.

### Find cycle in undirected graph

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

        while q:
            child, parent = q.popleft()
            seen.add(child)
            
            for nei in adj[child]:
                if nei == parent:
                    continue
                if nei in seen:
                    return False
                q.append([nei, child])
        return len(seen) == n
```

### Rotting fruit

Problem: [https://neetcode.io/problems/rotting-fruit](https://neetcode.io/problems/rotting-fruit)

Idea: Fresh fruits are getting rotten if there is a rotten neighbor in a minute. That's why, we used BFS and counted how many level we go in our search in order to count the number of minutes passed for all the fresh fruits to get rotten.

Code:
``` python
from collections import deque

class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        q = deque()
        maxTime = 0
        fresh = 0
        directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

        for i in range(m):
            for  j in range(n):
                if grid[i][j] == 2:
                    q.append([i, j])
                elif grid[i][j] == 1:
                    fresh += 1
        
        while fresh > 0 and q:
            lenQ = len(q)
            for idx in range(lenQ):
                i, j = q.popleft()
                for direction in directions:
                    iU = i + direction[0]
                    jU = j + direction[1]
                    if iU >= 0 and iU < m and jU >= 0 and jU < n and grid[iU][jU] == 1:
                        grid[iU][jU] = 2
                        q.append([iU, jU])
                        fresh -= 1
                
            maxTime += 1
        return maxTime if fresh == 0 else -1
```