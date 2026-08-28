---
title: "Graph Algorithms and Data Structures"
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

## Detecting Cycles

### Directed Graph

Use `topological sort` as follows:

First, prepare the following variables:
  1. `inDegree` (list): number of incoming edges for each vertex
  2. `adj` (list of list): adjacency matrix

Then, do the following operations:
  1. Add the vertex whose `inDegree` is zero to a queue
  2. Pop from the queue in a while loop
      * Update the `inDegree` for the neighbor vertex
      * Add the new vertex whose `inDegree` becomes zero to the queue

Runtime Complexity: `O(V + E)`

Sample Problem: [course-schedule](https://neetcode.io/problems/course-schedule)

Code:
``` python
from collections import deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        numberOfPrereq = [0 for _ in range(numCourses)]
        adj = [[] for _ in range(numCourses)]
        
        for prereqs in prerequisites:
            course, pre = prereqs[0], prereqs[1]
            # number of required courses
            numberOfPrereq[course] += 1
            # list of next courses that require this course
            adj[pre].append(course)

        q = deque()
        seen = set()

        for idx in range(len(numberOfPrereq)):
            if numberOfPrereq[idx] == 0:
                q.append(idx)
                seen.add(idx)

        while q:
            currCourse = q.popleft()
            for nextCourse in adj[currCourse]:
                numberOfPrereq[nextCourse] -= 1
                if numberOfPrereq[nextCourse] == 0:
                    q.append(nextCourse)
                    seen.add(nextCourse)

        return len(seen) == numCourses

```

### Undirected Graph

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

Sample Problem: [valid-tree](https://neetcode.io/problems/valid-tree)

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