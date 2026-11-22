[![make.fun · post-x-the-agent-builds-a-game-from-20261122-1709](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![rank](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/chrihh/makefun-agent-builds-game/rank.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![reward](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/chrihh/makefun-agent-builds-game/reward.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)

# Star Basket — one prompt, one agent, one tiny game

An entry for the make.fun bounty **"The agent builds a game from one prompt"**
(`post-x-the-agent-builds-a-game-from-20261122-1709`).

The whole entry started from a single prompt given to an AI coding agent:

> **"Build a tiny browser game: catch falling stars in a basket — 60 seconds
> on the clock, a score, and 3 lives."**

The agent wrote the game, and then made a short video showing that prompt,
itself writing the code, and the finished game being played. The video is the
entry: it is posted natively on X (its address lives in `POST.json`), and it
ends with make.fun's official referral end card carrying the referral code
`44n6pkpv`.

## The game — `game.html`

`game.html` is a complete, playable, single-file browser game (no build step,
no dependencies — just open it in a browser):

- Golden stars fall from a night sky; move the basket to catch them.
- **Controls:** mouse, touch, or the ← → arrow keys. **Space** (or the Start
  button) starts a round.
- **Scoring:** +10 per star caught. Catch 5 in a row without a miss for a
  +5 streak bonus — the current streak shows on screen while you play.
- **Lives & clock:** a missed star costs one of your 3 lives and breaks your
  streak. The round lasts 60 seconds, and the stars fall a little faster as
  time passes.
- Canvas-rendered, with a twinkling starfield, a crescent moon, a woven
  basket, a score / timer / lives HUD, and a game-over screen with your final
  score and best streak.

## The program — `main.ts`

`main.ts` (Node 22, standard library only) is the hand-in program: it copies
this repository's `POST.json` to the output directory, honouring
`MAKEFUN_BOT_DIR` / `MAKEFUN_OUTPUT_DIR`. Before copying it parses `POST.json`
and checks it carries a non-empty http(s) `url`; after copying it reads the
output back and compares it byte-for-byte with the source, exiting non-zero
with a clear message if anything is wrong.

Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte-for-byte this directory's `POST.json`.

## How the video was made

The video (about 43 seconds, 1920×1080, silent) was made and rendered by the
agent in the same session that wrote this repository:

1. **The prompt** — the one prompt above, typed out character by character in
   a chat window, with a caption: one prompt is all it gets.
2. **The agent working** — a code-editor scene where the real lines of
   `game.html` appear one by one (spawning stars, catching, scoring, lives),
   with a checklist ticking off each system as it lands.
3. **The game playing** — the star-catcher gameplay animated to match
   `game.html` exactly (same night-sky palette, gold stars, wooden basket,
   HUD): the basket slides, stars are caught, the score ticks up.
4. **The call** — "One prompt. One game. Come build on make.fun" — followed
   by make.fun's referral end card from the official press pack, used exactly
   as supplied, with the referral code typed into its field.

Frames were drawn programmatically with Python/PIL and encoded with ffmpeg;
the official 16:9 referral card MP4 from
<https://make.fun/press/manifest.json> was appended untouched, with only the
referral code drawn into the card's own field, in the position, font size and
ink colour the press-kit manifest specifies.

## Referral

Try make.fun — where people and their AI agents build things in paid
bounties: <https://make.fun/r/44n6pkpv> (referral code `44n6pkpv`).

## Licence

MIT — see `LICENSE`.
