# BuilderClan AISAT design system

All visual values live in `src/styles/values.css`. Components use role names from that file; they do not contain raw colours, sizes, spacing, radii, shadows, or timings.

## Design direction

- Dark, quiet surfaces with one accent: BuilderClan lime.
- Left-aligned reading edges for content sections; centred treatment is reserved for the Join call-to-action and profile-card content.
- Restrained borders and shadows. Cards do not grow, lift, glow, or use animated borders.
- Movement is short and subtle, with an immediate no-motion version for visitors who request reduced motion.

## Colours

- Brand lime: `#caff33`.
- Lime hover: `#dcff73`.
- Lime pressed: `#a4cf27`.
- Page background: `#0d0f0c`.
- Recessed surface: `#11130f`.
- Navigation surface: `#151812`.
- Raised card and scrolled-navigation surface: `#181b16`.
- Interactive surface: `#20241d`.
- Standard border: `#2b3026`.
- Stronger hover border: `#3c4534`.
- Main text: `#f4f7ee`.
- Supporting text: `#d4dacd`.
- Body text: `#aeb6a5`.
- Quiet footer text: `#87917e`.
- Shadows use black with controlled opacity; no coloured card glow is used.
- The hidden reward and game use these same neutral surfaces and lime accent instead of a separate blue, cyan, or magenta palette.

## Type

- Page, controls, and game: self-hosted variable Lexend.
- Hero paragraph only: self-hosted Doto at weight `700`, with `"ROND" 0`.
- Hero title: `40px` on phones, `56px` from `640px`, and `68px` from `1024px`; weight `800`; line-height `1.08`.
- Main section heading: `32px` on phones, `40px` from `640px`, and `44px` from `768px`; weight `700`.
- Subsection heading: `24px` on phones and `30px` from `640px`; weight `700`.
- Body copy: `16px` on phones and `17px` from `640px`; line-height `1.65`.
- Card copy and button labels: `14px`.
- Heading letter spacing: `-0.035em`.

## Width and alignment

- Maximum content width: `1120px`.
- Page gutters: `20px` on phones, `32px` from `640px`, and `48px` from `1024px`.
- Standard reading line: maximum `640px`.
- Mission reading line: maximum `576px`.
- Main content sections share the same left edge.

## Section rhythm

Phone top and bottom padding:

- About: `80px / 56px`.
- Mission: `56px / 56px`.
- Vision: `56px / 72px`.
- Team types: `72px / 72px`.
- Hall of Fame: `72px / 80px`.
- Community: `80px / 56px`.
- FAQ: `56px / 80px`.
- Join: `80px / 80px`.

From `640px`:

- About: `112px / 72px`.
- Mission: `72px / 72px`.
- Vision: `72px / 96px`.
- Team types: `96px / 96px`.
- Hall of Fame: `96px / 112px`.
- Community: `112px / 72px`.
- FAQ: `72px / 112px`.
- Join: `104px / 104px`.

## Cards

Team-type, member, and FAQ cards share one treatment:

- Surface: `#181b16`.
- Border: `1px solid #2b3026`.
- Corner radius: `12px`.
- Padding: `20px` on phones and `24px` from `640px`.
- Gap: `16px` on phones and `20px` from `640px`.
- Shadow: one quiet black `1px / 2px` shadow.
- Hover: slightly raised surface colour, stronger neutral border, and a restrained black shadow; no movement or coloured bloom.

## Buttons

- Minimum tap target: `44px`.
- Padding: `12px` vertically and `20px` horizontally; the Join button uses `24px` horizontally.
- Corner radius: `10px`.
- Primary: lime surface with page-dark text.
- Secondary: raised dark surface, neutral border, and main text.
- Hover changes colour and shadow only; controls do not grow or jump.

## Navigation

- Phone and tablet pill: content-sized and centred, with `5px` vertical padding, `10px` phone horizontal padding, a `44px` menu control, and a fully rounded outer shape.
- The measured phone pill is `219px × 56px` at a `390px` viewport.
- Desktop pill: maximum `1120px`, centred, `20px` from the top, with `10px` vertical and `20px` horizontal padding.
- Surface is opaque rather than frosted: `#151812`, changing to `#181b16` after scrolling.
- Phone menu: an opaque `288px` panel anchored below the pill; each link is `48px` high.
- The menu moves down and fades over `180ms`. The two-line menu icon becomes a lime close state, and the menu closes from a link, Escape, an outside click, or a left swipe.

## Movement

- Section reveal: `14px` over `380ms`.
- Card reveal: `16px` over `320ms`, staggered by `50ms`.
- FAQ reveal: `280ms`, staggered by `35ms`.
- Button and card hover: `160ms`.
- Phone menu: `180ms`.
- Hero logo entrance: `450ms` after an `80ms` delay.
- The rocket keeps its existing `2s` flight because that movement communicates the feature.
- Reduced-motion mode removes all animations and transitions.

## Surfaces and effects

- The page and hero use flat backgrounds. The removed one-sided hero glow had no balancing visual purpose.
- The Join section uses a flat recessed surface with a restrained border and a static lime button.
- The Hall of Fame keeps its neutral edge fade because it communicates horizontal scrolling.
- The reward popup keeps one strong shadow because it must separate from its modal backdrop.

## Breakpoints

- `640px`: larger type, wider gutters, desktop section rhythm, and larger card padding.
- `768px`: main headings reach `44px`.
- `1024px`: desktop navigation links appear; Hero and Mission become side-by-side layouts.
- `800px` remains specific to the hidden game sizing.
