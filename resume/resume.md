---
lang: en-US
css: resume.css
---

# Katie Janzen
Senior Software Engineer (Full-Stack)

______________________________________________________________________

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: {.columns}
::: {.column}
## Qualifications

- **Languages:** Rust, JavaScript / TypeScript, Python, Java
- **Frameworks:** React, Redux, MUI, Node.js, Express, ViteJS, Webpack
- **Databases:** PostgreSQL, MongoDB / Mongoose
- **Testing:** Playwright, JUnit, Jest, Puppeteer, Supertest
- **Web:** RESTful APIs, WebSockets
- Infrastructure: Nix, GitHub Actions, Terraform
:::
::: {.column}

## Contact Info

- **Phone:** +1 (806) 654-6933
- **Email:** katiejanzen@347online.me
- **Website:** https://347online.me
- **LinkedIn:** https://www.linkedin.com/in/katie-janzen/
- **GitHub:** https://github.com/347Online
:::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

______________________________________________________________________

## Summary

In one way or another, I've been developing software for just about as long as I can remember.
I’ve built full-stack web applications, video games and game modifications, a command line interface for running a secret santa event, I can do it all.
I'm a hard worker so if you need something done right, I'm your new developer.

## Experience                                                       [2011 - Present]{.end}

#### Senior Software Engineer (Response Interpretation Engine), Amplify Education                    [2025 - Present]{.end}

Education Company producing Curricula & Learning Materials for Students and Reporting & Analysis Tooling for Teachers

- Built recognition systems called Feature Extractors to identify and represent nuanced aspects of a student's individual response in order to recognize Ways of Thinking and determine how student arrived at given answer
- Spearheaded two-team initiative to implement in-house Domain-Specific Language facilitating more thorough analysis of student responses to more complex questions such as those involving digital manipulatives within Desmos Graphing Calculator
- Defined work for the team at the Project-Level Scope, creating and revising new Work Tickets as well as Leading Refinement Ceremonies
- Continually enhanced Linter & Formatter configuration across both my team's product and the organization's shared monorepo to catch more issues and prevent distractions during Code Review
- Organized Lessons on TypeScript for my team detailing more complex features such as Subtypes & Supertypes, Complex Generic Type Constraints, Pseudo-Nominal types, etc.

#### Front-End Developer (HRA Hub), Take Command Health Insurance Agency Inc. [2022 - 2024]{.end}

SaaS Company offering Web Platform for Employers to manage a Health Reimbursement Arrangement for their Employees

- Built authorization architecture enforced on both backend event handler and front-end user interface to gate functionality unavailable based on user’s permissions
- Automated synchronization of defined backend permissions to frontend removing the need to redundantly modify defined permissions manually
- Developed custom Django quick action to repair damaged company records quickly and accurately
- Built backend rest API for Managing Company Records of Employees deployed to AWS Lambda
- Migrated product team’s selected design system build pipeline away from Create React App (deprecated shortly thereafter) to ViteJS delivering superior performance and greatly improved developer experience and iteration time

### Open Source                                                     [2022 - Present]{.end}

#### Author, KClip 📋                                               [2025 - Present]{.end}

Command Line Interface written in Rust to access the system clipboard on Windows, Mac, or Linux systems

- Shared interface between each supported Operating System provides user a consistent experience regardless of available hardware

#### Contributor, Nix Ecosystem                                     [2024 - Present]{.end}

Purely functional package manager, package repository, and software packaging toolset for fully declarative package management and configuration

- Shared system configuration spanning personal workstations, laptops, home servers, and portable Neovim setup
- Assisted in development of support for Thunderbird Mail Rules in Nix Home-Manager
- Contributed package definition to nixpkgs for tsc.nvim Neovim Plugin by dmmulroy
- Contributed declarative module to NixVim for vim-be-good Neovim Plugin by ThePrimeagen

#### Author, Umpteen                                                [2023 - Present]{.end}

Turing-complete Custom Programming Language preferring data immutability bootstrapped from Rust

- Implemented language featureset including conditional and looping control flow, lexically-scoped variables, and first-class functions
- Developed fully-functional Brainf\*ck interpreter in the newly implemented language as sample program

______________________________________________________________________

### Independent Video Games                                         [2011 - Present]{.end}

<!-- TODO: "These are the games I've made" or smth -->

#### Coldlight                                                      [2020 - 2022]{.end}

Arcade Action Game where players destroy enemy spacecraft to claim high scores

- Orchestrated a system for a dynamic soundtrack with different tracks being played depending on the game state
- Integrated Juju Adams and Alynne Keith’s Input library for seamless control across a wide variety of controller hardware
- Created a complex underlying weapons system shared across the player and enemy objects alike, enabling rapid prototyping of new weapons

#### A.C.E. - A Chromatic Experience                                [2016]{.end}

Puzzle Platformer where players use color to collect keys and traverse various gates to solve puzzles

- Designed level creation suite with intuitive user interface to enable creating new levels quickly, and allow players to create their own
- Implemented a robust control system for keyboard and controller, delivering players the freedom to change controls to fit their needs

#### Trapfall                                                       [2014]{.end}

One on One Competitive Online Multiplayer Experience

- Built Host / Client architecture enabling players to have multiplayer matches over LAN / internet

#### FutureShock                                                    [2011]{.end}

Vertical-Scrolling Arcade Shooter

- Integrated Pointed Games web portal API for uploading player high scores to earn 'pointed points’

______________________________________________________________________

### Public Presentations

#### Straight from the SRC: How a Compiler Works                    [2022]{.end}

Talk presented as part of SingleSprout's Speaker Series

- Outlined how source code written by developers is converted into functional machine instructions
- Detailed the transformations code goes through in a compiler toolchain from tokens to abstract syntax tree to bytecode/native instructions
