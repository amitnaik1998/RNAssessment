# RNAssessment

A bare React Native (TypeScript) app with bottom-tab navigation, an expandable accordion list on the home screen, and safe-area handling across iOS and Android.

Built to spec: three bottom tabs (Home, Settings, Profile), where the Home tab renders a `FlatList` of accordion items.

---

## Tech stack

| Concern         | Choice                                                       |
| --------------- | ------------------------------------------------------------ |
| Framework       | React Native 0.85 (bare, not Expo)                           |
| Language        | TypeScript                                                   |
| Navigation      | `@react-navigation/native` + `@react-navigation/bottom-tabs` |
| Safe area       | `react-native-safe-area-context`                             |
| Icons           | `react-native-vector-icons` (Ionicons)                       |
| Animation       | `LayoutAnimation` (RN built-in)                              |
| Testing         | Jest + `react-test-renderer`                                 |
| Package manager | Bun                                                          |

---

## Setup

Prerequisites: Node 22+, Bun, Watchman, plus Xcode (iOS) and/or Android Studio (Android).

```sh
# Install JS dependencies
bun install

# iOS only — install CocoaPods dependencies
bundle install
cd ios && bundle exec pod install && cd ..
```

## Run

```sh
# Android
bunx react-native run-android

# iOS
bunx react-native run-ios

# Tests
bun run test

# Run a single test file or pattern
bunx jest Accordion
```

---

## Project structure

```
.
├── App.tsx                      # Root — SafeAreaProvider + NavigationContainer + StatusBar
├── __tests__/
│   ├── App.test.tsx             # Smoke test — full provider tree mounts
│   └── Accordion.test.tsx       # Behavioral tests for the accordion
└── src/
    ├── components/
    │   └── Accordion.tsx        # Memoized expand/collapse component with LayoutAnimation
    ├── constants/
    │   └── colors.ts            # Centralized COLORS tokens
    ├── data/
    │   └── notes.ts             # Static NOTES data + Note type
    ├── hooks/                   # Reserved for custom hooks
    ├── navigation/
    │   └── TabNavigator.tsx     # Bottom tab navigator + RootTabParamList
    ├── screens/
    │   ├── HomeScreen.tsx       # FlatList of Accordion items
    │   ├── ProfileScreen.tsx    # Placeholder
    │   └── SettingsScreen.tsx   # Placeholder
    ├── types/
    │   └── react-native-vector-icons.d.ts  # Ambient TS shim for the icons package
    └── utils/                   # Reserved for pure helpers
```

The `src/` layout is set up to scale — separating screens, reusable components, navigation config, constants, and static data — without prematurely populating folders that don't yet have code.

---

## Architectural decisions

**Safe area: `react-native-safe-area-context` over RN's built-in `SafeAreaView`.** The built-in is deprecated, only handles iOS notches with static padding, and ignores Android cutouts. The community version reads live insets from native and works for iOS Dynamic Island, notches, Android edge-to-edge, and gesture-nav devices. Each screen passes `edges={['top', 'left', 'right']}` — bottom is excluded because the bottom tab bar already handles its own inset; including it produces a visible gap above the bar.

**`headerShown: false` per tab.** Each screen handles its own top safe area, giving more layout flexibility than relying on the navigator's default header. Trade-off: every screen must wrap itself in `SafeAreaView`. Acceptable at this scale.

**Performance: `React.memo(Accordion)` + `useCallback` for `renderItem`/`keyExtractor`.** Without both, every accordion in the `FlatList` re-renders when _any_ sibling toggles. With both, only the toggled row re-renders. The optimization only pays off when used together — `useCallback` keeps props referentially stable so `React.memo`'s shallow comparison can skip unchanged rows.

**Typed navigation: `RootTabParamList` + global module augmentation.** Passing the param list as a generic to `createBottomTabNavigator` makes `navigate('Hone')` (typo) a compile error instead of a runtime crash. The `declare global { namespace ReactNavigation { ... } }` block means any consumer of `useNavigation()` gets fully-typed routes without re-importing the param list.

**Type-safe icons: a local `IconName` literal union.** Typed `iconName` as `'home-outline' | 'settings-outline' | 'person-outline' | 'ellipse-outline'` rather than the more obvious `keyof typeof Ionicons.glyphMap`. The package generates `glyphMap` dynamically and (after the type shim, see below) types it as `Record<string, number>`, so `keyof typeof` collapses to plain `string` and delivers no real safety. A local union of just the icons the app actually uses is tighter and self-documenting — typos become compile errors and the set of valid names is right there in the source.

**TypeScript shim for `react-native-vector-icons`.** v10.3.0 ships Flow types but no `.d.ts` files, so a raw `import Ionicons from 'react-native-vector-icons/Ionicons'` would otherwise have no types. Added a minimal ambient declaration at `src/types/react-native-vector-icons.d.ts` rather than installing `@types/react-native-vector-icons` (the community package is stuck on v6 and wouldn't match this version).

**Animation: `LayoutAnimation` over `react-native-reanimated`.** The expand/collapse is a single height transition with no gestures or interrupted animations. `LayoutAnimation.configureNext(...)` is one line and runs natively; Reanimated would add a native dependency and ~30 lines of setup for no perceptible visual gain. Android requires `UIManager.setLayoutAnimationEnabledExperimental(true)` — opted in once at the top of the component.

**Centralized `COLORS` token.** Single source of truth for theme values. Currently feeds one (light) palette, but defining the vocabulary up front (`primary`, `surface`, `textPrimary`, `border`, `tabActive`, etc.) means future theming is a substitution, not a refactor.

**Typed static data.** `NOTES: Note[]` separates content from presentation. Swapping to an API later means changing the source of `NOTES`, not its consumers.

---

## Testing

`__tests__/Accordion.test.tsx` covers the component's behavioral contract:

1. Renders the title.
2. Hides content by default.
3. Reveals content when the header is pressed.

Each test was verified by **mutation testing** — the implementation was deliberately broken in three different ways (removing the title, always rendering the body, removing `setExpanded`), and each test was confirmed to fail for _its_ corresponding bug only. This proves the tests catch what they claim to catch, not just that they trivially pass.

Placeholder screens (`Settings`, `Profile`) are not covered — they have no behavior to test. `App.test.tsx` (the React Native CLI default) provides a smoke check that the full provider tree mounts.

`jest.config.js` extends the default `transformIgnorePatterns` to allow Babel transformation of `@react-navigation/*` and `react-native-vector-icons`, both of which ship as ESM and aren't in the preset's default allow-list.

---

## What I'd build next

Two things were intentionally left out — each has a clear seam in the existing code where it would slot in:

- **Persistence wrapped in a `useNotes()` hook.** The static `NOTES` array in `src/data/notes.ts` is the only data source today; replacing it with a hook backed by `AsyncStorage` (or `react-native-mmkv`) is the natural seam once notes become editable.
- **Theming context.** The palette is already centralized in `COLORS`; a provider keyed off `useColorScheme()` is the next step toward dark mode without touching any consumer.
