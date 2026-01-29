---
layout: layout/text-post.njk
title: tkAlways Rebase Never Merge
date: 2026-01-28
---

When I first tried to use the `git rebase` command, I was initially put off. I was attempting to rebase with around 30 commits, and having to repeatedly resolve the exact same conflicts over and over again.
This felt extremely error-prone and tedious. For years I never touched rebase again, but about [two years ago](tk-link-to-emilazy-thread) I was making a contribution to an open source project (nix-darwin). This was my first experience with a repository for which the maintainers actually cared about the readability of its `git log`, so rebasing was a requirement.
I don't know about you, but at all the shops I've worked at, nobody gave a damn about the git history.[^this-is-fine] All I'd ever known was constantly merging in `main` into our feature branches. Pure chaos, in retrospect.
But someone had shown me a better way so I was determined to learn to rebase properly. I believe I eventually found [this video](tk-rerere-vid) on git rerere. This was when things finally started to fall into place. No more repeated conflicts. (Foreshadowing...?) Once I'd dealt with them once, they'd basically be taken care of for the duration. The rerere feature takes snapshots of your code before and after resolving conflicts in a file. The resolution is tracked, thus when encountering the same or very similar(citation needed) in successive commits, it can automatically re-apply your fixes.
This has **completely** changed the way I use git.

I am usually not too precious about git history in my feature branches (tk sounds like a contradiction of caring about the history. make it clearer that what I'm not precious about is preserving the history _as it was originally created_). If your mental model of git is an immutable record of every single step of every single change that came before, to tinker with that history may sound like anathema. Personally, if hasn't hit main yet, all bets are off in my opinion, so I think there's a better model.

In my work, I often find myself working on the formatting/linting config for projects that I work on[^linters-and-formatters-in-code-review]. If you've ever made changes to a pre-existing lint config, you're likely aware of just how easy it is for small changes to suddenly result in huge diffs across hundreds of files when the command is re-run. If only we could separate the changes to the config from applying them to every file in our codebase. 🤔
We could tackle them in two separate PRs, but that's risky. THe two PRs need to land at _exactly the same time_ lest we risk someone working on unrelated changes having their diff explode when they least expect it.
You could use a shared feature branch, but these are difficult to keep in sync with main at the best of times, nevermind when dealing with changes in hundreds of files.
This is a tricky situation and I often see these configurations calcify, with most contributors afraid to touch the file for fear of blowing up everyone's diffs.
Rebase gives us superpowers.

Instead of separating the config from the re-application with logical branches/PRs, we can use logical _commits_. First, we can make all of our changes to our config and commit them. Next, we can re-apply our newly reconfigured formatter and commit the result. If we need to sync up with main, we can run `git pull --rebase=interactive`[^alias]. In the list of our commits, we can either `edit` our formatting commit, re-run the formatter, and `git amend`, or simply `drop` the commit, re-run the formatter, and author a fresh commit. I tend to prefer the latter, as this is often easier to deal with if large batches of conflicts are an issue. We lose nothing by doing this, as the sole contents of the commit were merely the output of a command and can thus be trivially recreated. Sometimes I'll batch lots of these changes into one PR, by repeatedly amending my first commit and dropping and re-authoring the second. I'll also often include a third logical commit for manual fixups of problems the command couldn't fix for us, but now emit errors/warnings.



[^this-is-fine]: This is fine by the way! There's no law stating whether or not one must care about the git history. I think keeping it well-tended has some underrated upsides, but decreased mental friction from never having to think about it is an equally valid tradeoff.

[^linters-and-formatters-in-code-review]: If you find you or your team are frequently having conversations about code style during code review, especially if the same issues keep coming up often, taking a look at what rules your formatter and linter make available to you can potentially save you a lot of time. More importantly, it will create space in your review process for more substantive comments about the _logic_ of the code, rather than the _style_. 
Perhaps one of these days I'll write a full-length post on this subject.

[^alias]: I've [aliased](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases) this command to `git pr` in my git config
