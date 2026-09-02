---
title: "Topological Sort"
categories:
  - Programming
tags:
  - Graph
  - Data Structure
  - Algorithm
---

**Topological Sort**: linear ordering of vertices in a directed graph such that for every directed edge from vertex u to vertex v, u comes before v in the ordering. It only exists for directed acyclic graph (DAG) and result may not be unique.

### Detecting Cycles in Directed Graph

Following algorithm is also known as Kahn's algorithm:

First, prepare the following variables:
  1. `inDegree` (list): number of incoming edges for each vertex
  2. `adj` (list of list): adjacency matrix

Then, do the following operations:
  1. Add the vertices whose `inDegree` is zero to a queue
  2. Pop from the queue in a while loop
      * Update the `inDegree` for the neighbor vertices
      * Add the new vertices whose `inDegree` becomes zero to the queue

Complexity Analysis:
* Runtime Complexity: `O(V + E)`
* Space Complexity: `O(V)`

Sample Problem: [https://neetcode.io/problems/course-schedule](https://neetcode.io/problems/course-schedule)

Code:
``` python
from collections import deque
class Solution(object):
    def canFinish(self, numCourses, prerequisites):
        """
        :type numCourses: int
        :type prerequisites: List[List[int]]
        :rtype: bool
        """
        adj = [[] for _ in range(numCourses)]
        indegree = [0 for _ in range(numCourses)]

        q = deque()
        seen = set()

        for course, prereq in prerequisites:
            adj[prereq].append(course)
            indegree[course] += 1
        
        for idx in range(numCourses):
            if indegree[idx] == 0:
                q.append(idx)

        while q:
            cur = q.popleft()
            seen.add(cur)

            for nei in adj[cur]:
                indegree[nei] -= 1
                if indegree[nei] == 0:
                    q.append(nei)
        
        return len(seen) == numCourses
```

### More Complex Problems
Fundemental idea in topological sort which is processing vertices based on their in-degree count can be used in solving more complex problems.

#### Loud and Rich

Problem: [https://leetcode.com/problems/loud-and-rich](https://leetcode.com/problems/loud-and-rich)

Idea: This solution has two additions to the cycle detection logic above
  1. We would like to find the least quiet person in every subtree formed from each vertex, so we create a 1-d list to store this result
  2. To avoid redundant calculations, we switch to recursion and we skip the calculations for a subtree if it is already calculated before. This is similar to top-down dynamic programming where we use recursion and memoization.

Code:
``` python
class Solution(object):
    def loudAndRich(self, richer, quiet):
        """
        :type richer: List[List[int]]
        :type quiet: List[int]
        :rtype: List[int]
        """
        n = len(quiet)
        adj = [[] for _ in range(n)]
        for r, p in richer:
            adj[p].append(r)

        resList = [-1 for _ in range(n)]
        def dfs(i):
            if resList[i] == -1:
                curIdx = i

                for nei in adj[i]:
                    neiQ = dfs(nei)
                    if quiet[neiQ] < quiet[curIdx]:
                        curIdx = neiQ
                resList[i] = curIdx
            return resList[i]

        for idx in range(n):
            dfs(idx)
        return resList
```
#### Min Height Tree

Problem: [https://neetcode.io/problems/minimum-height-trees](https://neetcode.io/problems/minimum-height-trees)

Idea: We would like to find the vertices which minimizes the height of the tree when they are selected as the root. This problem requires finding the longest path in the graph and then taking the median (middle vertex/vertices) in that path. A way to find these middle vertices is to get rid of leaf vertices step by step until we end up with one or two vertex.

Code:
``` python
from collections import deque

class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        if n == 1:
            return [0]
        n = len(edges) + 1
        adj = [[] for _ in range(n)]
        degree = [0 for _ in range(n)]
        isRemained = [True for _ in range(n)]

        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            degree[u] += 1
            degree[v] += 1

        leaves = deque(i for i in range(n) if degree[i] == 1)
        remaining = n

        while remaining > 2:
            leafCount = len(leaves)
            remaining -= leafCount

            for _ in range(leafCount):
                leaf = leaves.popleft()

                for nei in adj[leaf]:
                    degree[nei] -= 1

                    if degree[nei] == 1:
                        leaves.append(nei)
        return list(leaves)
            
```

Straightforward solution is to find the longest path and then returns the middle vertices. Note that since this graph is undirected, we need to keep track of the parent vertex in our recursive method. Also, since we are starting from a random vertex, the first longest path we find may not actually be the longest path overall. So, we start another path search from the point we find in our first search.

Code: 
``` python
class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        n = len(edges) + 1
        adj = [[] for _ in range(n)]

        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)

        def dfs(i, p):
            cur = []
                
            for nei in adj[i]:
                if nei != p:
                    arr = dfs(nei, i)
                    if len(arr) > len(cur):
                        cur = arr
            cur = cur + [i]
            return cur

        firstArr = dfs(0, -1)
        firstIdx = firstArr[0]

        secondArr = dfs(firstIdx, -1)
        lenArr = len(secondArr)
        if lenArr%2==1:
            return [secondArr[lenArr//2]]
        return [secondArr[lenArr//2 -1], secondArr[lenArr//2]]
```

### References
* Topological Sort problem list:
  * [https://neetcode.io/practice/problem-list/topological-sort](https://neetcode.io/practice/problem-list/topological-sort)
  * [https://leetcode.com/problem-list/topological-sort](https://leetcode.com/problem-list/topological-sort)