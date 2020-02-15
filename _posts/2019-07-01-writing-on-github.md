---
title: "Writing on Github"
categories:
  - Programming
tags:
  - Github
  - ReadMe
---

It's a template post presenting different writing styles/features that can be used in github repositories and pages.
Most of the examples are from [Github - Basic Writing and Formatting Syntax][github-link]

# Headings
```
## The second largest heading
###### The smallest heading
```

## The second largest heading
###### The smallest heading


# Styling Text
```
**Bold**
*Italic*
~~Strikethrough~~
```

**Bold**
*Italic*
~~Strikethrough~~


# Quoting Code
The text within the backticks will not be formatted.

Use `git status` to list all new or modified files that haven't yet been committed.

To format code or text into its own distinct block, use triple backticks.
```
git status
git add
git commit
```

Let's put a python code here.
```python
import datetime

print("Current time is:", datetime.datetime.now())
```
Let's also show the output of the code above.
```
Current time is: 2019-07-03 16:05:48.051145
```

# Lists

```
- George Washington
- John Adams
- Thomas Jefferson
```

- George Washington
- John Adams
- Thomas Jefferson

```
1. George Washington
2. John Adams
3. Thomas Jefferson
```

1. George Washington
2. John Adams
3. Thomas Jefferson


# Nested Lists

```
1. First list item
   - First nested list item
     - Second nested list item
```

1. First list item
   - First nested list item
	 - Second nested list item


# Task Lists

```
- [x] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request
```

- [x] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request


# Emoji

```
:+1: :smile: :punch: :satisfied: :clap:
```

:+1: :smile: :punch: :satisfied: :clap:


# Ignoring Markdown Formatting

You can tell GitHub to ignore (or escape) Markdown formatting by using \ before the Markdown character.

```
Let's rename \*our-new-project\* to \*our-old-project\*.
```

Let's rename \*our-new-project\* to \*our-old-project\*.


[github-link]: https://help.github.com/en/articles/basic-writing-and-formatting-syntax
