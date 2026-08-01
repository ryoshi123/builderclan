# BuilderClan shared style values

`src/styles/values.css` is the single source of truth for these values. The names describe each value's job so later section styles can use them without writing raw colours or sizes.

## Colours

There are exactly **62** maintained colour values, represented by **70** role names. Four drawing-only fills were removed from this file. The remaining values are split into 41 flat page colours and 21 transparent surfaces, shadows, and glows.

Four pairs were merged using CIEDE2000. The cutoff was strictly below `1.0`: differences at or above `1.0` were not merged. Both role names remain when two jobs now share one value.

### Flat page colours

| Name | Exact value |
|---|---|
| Main brand | `#caff33` |
| Popup title | `#caff33` — points to Main brand |
| Keyboard focus ring | `#caff33` — points to Main brand |
| Secondary brand action | `#a6d71f` |
| FAQ action background | `#9fce1d` |
| FAQ action hover | `#b6e533` |
| Join gradient middle | `#81a718` |
| Join gradient end | `#acda2c` |
| Join hover glow | `#93ba27` |
| Team icon gradient start | `#b5ed1b` |
| Team icon gradient end | `#3d5105` |
| Rocket idle | `#76a100` |
| Rocket hover | `#a0da00` |
| Popup title glow | `#aee31d` |
| Popup edge glow | `#35ff3c` |
| Text on dark backgrounds | `#ffffff` |
| Hero title gradient end | `#e1e1e1` |
| FAQ body text | `#e1e1e1` — points to Hero title gradient end |
| Inverted section text | `#e5e7eb` |
| Section body text | `#e6e6e6` |
| Game status text | `#b8c6dc` |
| Footer text | `#858585` |
| Popup background | `#0a0a0a` |
| Hero background end | `#0f0f0f` |
| Default page text | `#111827` |
| Card gradient start | `#151515` |
| Hero background start | `#151515` — points to Card gradient start |
| Page background | `#1a1a1a` |
| Join action text | `#1a1a1a` — points to Page background |
| Content surface gradient start | `#1e1e1e` |
| Footer background | `#1e1e1e` — points to Content surface gradient start |
| Join background base | `#1e1f29` |
| Hall card background | `#201e20` |
| Game board background | `#212837` |
| Card gradient end | `#242424` |
| Hero background middle | `#242424` — points to Card gradient end |
| FAQ card background | `#252529` |
| FAQ card secondary glow | `#25254c` |
| Game frame background | `#293447` |
| Content surface gradient end | `#2a2a2a` |
| Page gradient middle | `#2a2a2a` — points to Content surface gradient end |
| Join background alternate | `#312e2e` |
| FAQ card primary glow | `#38384e` |
| Popup action accent | `#00fff0` |
| Snake head | `#60cbff` |
| Popup secondary glow | `#ff62f5` |
| Hall social hover | `#ff0000` |
| Hall member name | `#ff3030` |
| Snake food | `#ff003d` |

### Transparent surfaces, shadows, and glows

| Name | Exact value |
|---|---|
| Hero subtitle shadow | `#bbff00fb` |
| Clear surface | `transparent` |
| Subtle shadow tail | `rgba(0, 0, 0, .04)` |
| Subtle shadow lead | `rgba(0, 0, 0, .06)` |
| Medium shadow | `rgba(0, 0, 0, .12)` |
| Hero logo panel | `rgba(0, 0, 0, 0.05)` |
| Card shadow and hero vignette | `rgba(0, 0, 0, 0.2)` |
| Inset section shadow | `rgba(0, 0, 0, 0.25)` |
| Elevated shadow | `rgba(0, 0, 0, 0.35)` |
| Popup backdrop | `rgba(0, 0, 0, 0.7)` |
| Mobile navigation backdrop | `rgba(0, 0, 0, 0.95)` |
| Popup action hover fill | `rgba(0, 255, 240, 0.1)` |
| Popup action glow | `rgba(0, 255, 240, 0.7)` |
| Hero brand glow | `rgba(202, 255, 51, 0.2)` |
| Interactive card brand glow | `rgba(202, 255, 51, 0.25)` |
| Hall highlight glow | `rgba(253, 249, 35, 0.712)` |
| Hero highlight glow | `rgba(255, 241, 51, 0.2)` |
| FAQ border | `rgba(255, 255, 255, 0.1)` |
| Hero light glow | `rgba(255, 255, 255, 0.15)` |
| Hall warning glow | `rgba(255, 66, 36, 0.603)` |
| Game frame shadow | `rgba(52, 87, 220, 0.2)` |

### Imperceptible merges

Usage counts are effective colour occurrences in the old page's HTML and CSS. Unused and overridden rules are not counted.

| Colour A | Uses | Colour B | Uses | CIEDE2000 difference | Surviving colour |
|---|---:|---|---:|---:|---|
| `#e1e1e1` | 1 | `#e0e0e0` | 1 | `0.222719` | `#e1e1e1` — the counts tie, so the hero-title colour wins over FAQ body text |
| `#caff33` | 23 | `#c9ff35` | 2 | `0.234057` | `#caff33` — used in more places |
| `#1e1e1e` | 3 | `#1f1f1f` | 1 | `0.314148` | `#1e1e1e` — used in more places |
| `#292929` | 1 | `#2a2a2a` | 3 | `0.316747` | `#2a2a2a` — used in more places |

No merge reached or crossed the `1.0` visibility cutoff. The closest unmerged pair is `#a6d71f` and `#acda2c` at `1.015694`.

## Text

### Font families

| Name | Exact value |
|---|---|
| Page | `ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"` |
| Hero subtitle | `"Doto", sans-serif` |
| Hidden game | `"Montserrat", sans-serif` |
| Hero subtitle Doto setting | `"ROND" 0` |

### Text sizes

| Name | Exact value |
|---|---|
| Action label | `1rem` |
| Section body | `1.1rem` |
| Feature copy | `1.2rem` |
| Navigation brand | `1.25rem` |
| Social icon | `1.4rem` |
| Navigation toggle | `1.8rem` |
| Subsection heading | `2rem` |
| Vision heading | `2.2rem` |
| Rocket control | `2.5rem` |
| Section heading | `3rem` |
| Hero title | `clamp(2.5rem, 6vw, 4rem)` |
| Popup copy | `small` |
| Browser-default heading sizes | `unknown` |

### Font weights

| Name | Exact value |
|---|---|
| Paragraph | `normal` (normally `400`) |
| Game detail | `500` |
| Page default | `600` |
| Section heading | `700` |
| Hero subtitle | `bold` (the same weight as `700` here) |
| Hero title | `800` |

### Line heights

| Name | Exact value |
|---|---|
| Page and inherited default | `1.6` |
| FAQ copy | `1.5` |
| Feature copy | `1.8` |
| Standalone icon | `1` |

## Spacing

The original units are deliberately preserved. The project does not set a root font size, so exact pixel conversions for the `rem` values are `unknown`.

| Name | Exact value |
|---|---|
| Page reset | `0` |
| Section edge reset | `0rem` |
| Mission image offset | `0.1rem` |
| Compact control gap | `0.5rem` |
| Card title gap | `0.6rem` |
| Section intro offset | `0.75rem` |
| Join control block padding | `0.8rem` |
| Standard button block padding | `0.9rem` |
| Section gutter | `1rem` |
| Popup inset | `1.1rem` |
| Popup control inline padding | `1.2rem` |
| Card inset | `1.5rem` |
| Join control inline padding | `1.6rem` |
| Standard button inline padding | `1.75rem` |
| Content gap | `2rem` |
| Compact section block padding | `3rem` |
| Desktop section block padding | `4rem` |
| Spacious section block padding | `5rem` |
| Current section block padding | `2rem` through `768px`; `3rem` from `769px` |
| Hero button gap | `0.75rem` |
| Navigation brand gap | `8px` |
| Game frame inset | `10px` |
| FAQ control block padding | `12px` |
| Game mobile score block padding | `15px` |
| Game desktop score block padding | `20px` |
| Floating rocket block edge | `20px` |
| Floating rocket inline edge | `0` through `768px`; `20px` from `769px` |
| Game score inline padding | `27px` |
| FAQ control inline padding | `28px` |
| Fixed header offset | `50px` |
| Minimum tap target | `44px` |
| Minimum animated tap target | `49px`, which stays above `44px` while the `0.9` entry scale is running |
| Automatic centring | `auto` |
| Hero scroll offset | `150px` |
| Other section jump offset | `150px` — points to Hero scroll offset |

## Screen sizes

- At `768px` and below, navigation switches to the hamburger layout, the hero buttons stack, the hero glow moves, Mission becomes a centred column, and section block padding is `2rem`.
- At `769px` and above, the wide navigation and hero button row return, and section block padding becomes `3rem`. Compact and wide rules no longer overlap.
- At `800px` and below, the hidden game becomes larger relative to the viewport, its text becomes `1rem`, and its score-row block padding becomes `15px`.
- The declared `700px` rule is omitted because it targets an unused class and causes no visible change.
- Exact viewport widths for flex wrapping and auto-fit grids are `unknown` because the files do not fix them.

## Restored effects and horizontal scrolling

- The Team card transform now takes `0.4s`; its shadow takes `0.3s`.
- The rocket transform and colour now transition over `0.3s`.
- The Hero background is `#151515` at `0%`, `#242424` at `40%`, and `#0f0f0f` at `80%`, running towards the top right.
- Every non-Hero section target uses a `150px` jump offset.
- The Hall of Fame row shows a lime arrow over a dark edge fade while more cards remain, hides it at the end, and snaps each card to the row's padded start edge.
- Scroll reveals move `1rem` over `0.4s`, begin at the viewport edge, and use no transition for content already passed or visible when the page opens.
