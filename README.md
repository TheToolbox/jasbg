# Just Another Static Blog Generator

A fun pet project for stretching our legs and generating static sites. Aims to be simpler than other popular solutions and to have good opinionated defaults. Other generators require dozens of dependencies, and JASBG aims to have none, acting as a small, self-contained, zero-config CLI.

## Recommended Organization

Blogs built with JASBG are directory-centric. Below is the recommended structure:
```
    .
    |--compiled/
    |--js/
    |--css/
    |--posts/
        |--__notes.md (ignored)
        |--myFirstPost.md
    |--jasbg.js
```

`posts/` are rendered with a rendering engine (see below)

## Rendering Engines

Currently, only rendering from Github-Flavored Markdown is supported. Feel free to send PRs for additional engines.

## Caching

The implicit assumption made for caching decisions is that visitors likely visit the site infrequently and visit usually ~1 page each time. Thus embedding js/css straight into each page saves on network calls, optimizing for first load at the expense of future page loads (which could benefit from cached js/css). In practice, if your js/css burden is low and compression is enabled, this should be mostly negligible. TODO Individual pages should be cached with incrementing cache ids for each build that touches the file.