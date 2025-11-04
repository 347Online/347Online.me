---
layout: layout/text-post.njk
title: Introducing KClip 📋
date: 2025-10-09
---

KClip is a cross-platform commandline utility I wrote for copying to and pasting from the system clipboard, similar to pbcopy/pbpaste on macOS.

You can install it now via cargo

```sh
cargo install kclip-cli
kclip install # installs symlink aliases for kccopy/kcpaste
```

More info: [github.com/347Online/kclip-cli](https://github.com/347Online/kclip-cli)

---

I've long been annoyed by not having a consistent commandline interface to the clipboard across macOS and Linux. I had long ago had the idea to use a shell script to abstract over the different tools available across the different platforms, but this idea wasn't particularly satisfying and I never ended up moving on it.

Recently however, I was browsing 1Password's GitHub repositories (as one does) and I noticed they maintain a library called [Arboard](https://github.com/1Password/arboard). This library is fantastic. As I was reading the documentation I suddenly had the realization that I could use this to solve my issue!

I've been using KClip myself for about a week now and I'm already really happy with it. It's feature-complete in terms of my initial vision for a minimum viable product, but I already have some fun new ideas I'm playing with.

If this sounds like a tool you could use, I'd be so happy if you gave it a look.

Watch this space for updates as KClip evolves
