# BuilderClan design system

The site's design values live in `src/styles/values.css`. Component styles use role names from that file instead of writing colours, text sizes, spacing, radii, shadows, or timings directly.

## Colours

### Parent organisation palette used by the page

- Main brand and focus: `#caff33`
- Brand hover: `#bce62e`
- Ambient olive glow: `#a5cc29`
- Page background: `#141414`
- Recessed surface: `#161616`
- Scrolled navigation surface: `#181818`
- Raised card surface: `#1c1c1c`
- Interactive surface: `#222222`
- Standard border: `#262626`
- Input and hover surface: `#282828`
- Strong borders: `#333333`, `#383838`, and `#444444`
- Main text: `#ffffff`
- Supporting text: `#d4d4d8`
- Faded text: `#a1a1aa`
- Low-emphasis text: `#71717a`
- Placeholder text: `#52525b`
- Legacy light text available for parent parity: `#e4e4e7`

### Chapter accessibility adjustment

- Footer text: `#7d7d86`; this is the first equal-channel lightening step from the parent `#71717a` that passes `4.5:1` against `#141414`.

### Feature colours kept because the parent has no equivalent

- Reward edge: `#35ff3c`
- Reward action: `#00fff0`
- Reward secondary glow: `#ff62f5`
- Game board: `#212837`
- Game frame: `#293447`
- Game status: `#b8c6dc`
- Snake head: `#60cbff`
- Snake food: `#ff003d`
- Hall member names: `#ff3030`

Transparent navigation surfaces, shadows, borders, and lime glows are kept in a separate labelled group in the values file.

## Type

- Page and game: self-hosted variable `Lexend`, weights `100-900`; normal page text uses `400`.
- Hero paragraph: self-hosted `Doto` at `700`, with `"ROND" 0`.
- Monospace fallback for number-like details: the system monospace stack.
- Hero title: `36px` on phones, `48px` from `640px`, and `60px` from `1024px`; weight `800`, line-height `1.15`.
- Main section heading: `30px` on phones, `36px` from `640px`, and `48px` from `768px`; weight `800`.
- Subsection heading: `24px` on phones and `30px` from `640px`.
- Body copy: `16px` on phones and `18px` from `640px`; line-height `1.625`.
- Card copy and button labels: `14px`.
- Heading letter spacing: `-0.025em`.

## Spacing and width

- Section padding above and below: `96px` at every width.
- Page gutter: `16px`.
- Maximum content width: `1350px`.
- Card gap: `24px` on phones and `32px` from `640px`.
- Card padding: `24px`.
- Footer: `64px` above and `32px` below.
- Primary button padding: `14px` vertically and `28px` horizontally.
- Secondary button horizontal padding: `24px`.
- Minimum control size: `44px`.
- Jump offset: `112px` at every width.

## Corners

- Cards: `16px`.
- Navigation: fully rounded with `9999px`.
- Large image and logo surfaces: `24px`.
- Buttons: fully rounded with `9999px`.
- Circular photos, icons, and controls: `50%`.
- Hidden game frame: `8px`.

## Cards

Team type, Hall of Fame, and FAQ cards all use the same treatment:

- Background: raised surface `#1c1c1c`.
- Border: `1px solid #262626`.
- Radius: `16px`.
- Padding: `24px`.
- Default shadow: two-layer soft black shadow.
- Hover: move up `4px`, use a half-opacity lime border, and add a soft lime shadow over a deeper black shadow.
- Hover duration: `300ms` with the parent ease-out curve.

## Buttons

- Primary: lime background, page-dark text, fully rounded, `14px x 28px` padding.
- Primary hover: `#bce62e`, move up `2px`, and scale to `1.02`.
- Secondary: `#1c1c1c` background, `#262626` border, white text, fully rounded.
- Secondary hover: `#222222` background and `#383838` border.
- The Join button keeps its existing moving lime gradient, mapped to the parent limes and parent pill shape.

## Navigation

- Floats `16px` from the top on phones and `24px` from `640px`.
- Maximum width: `1350px`, with `16px` page gutters.
- Background: `rgba(28, 28, 28, 0.85)`; after `20px` of scrolling it becomes `rgba(24, 24, 24, 0.95)`.
- Border: `#262626`; scrolled border: `#333333`.
- Blur: `24px`; radius: `9999px`; shadow: `0 10px 30px rgba(0, 0, 0, 0.5)`.
- Desktop links appear from `1024px`.
- The phone menu is a blurred `#1c1c1c` dropdown under the navigation, not a full-screen sheet.

## Movement

- Section reveal: move up `20px` over `600ms`.
- Card entry: move up `24px` over `500ms`, staggered by `120ms`.
- FAQ card entry: `300ms`, staggered by `40ms`.
- Hero logo: scale from `0.8` over `800ms` after a `200ms` delay.
- Navigation state change: `300ms`.
- Phone menu: `200ms`.
- Reduced-motion mode removes all animation and shows every reveal immediately.

## Screen sizes

- `640px`: larger type, desktop section rhythm, larger card gaps, and wider navigation inset.
- `768px`: main section headings reach their largest size.
- `1024px`: desktop navigation links appear, Mission and the Hero use side-by-side layouts, and the Hero title reaches `60px`.
- `800px` remains only for the hidden game's existing viewport-specific sizing.
