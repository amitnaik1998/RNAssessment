# RNAssessment

React Native (TypeScript) take-home. 3 bottom tabs (Home, Settings, Profile). Home renders a FlatList of accordion items.

## Setup

Need: Node 22+, Bun, Watchman, JDK 17 or 21, Ruby 3.x + bundler (iOS), Xcode 16+ (iOS), Android Studio with SDK 36 (Android).

```sh
bun install

# iOS only
bundle install
cd ios && bundle exec pod install && cd ..
```

## Run

```sh
bunx react-native run-android
bunx react-native run-ios
bun run test
bunx jest Accordion        # single test
```

## Structure

```
App.tsx                          providers + navigation
__tests__/                       jest
src/components/Accordion.tsx
src/constants/colors.ts
src/data/notes.ts
src/navigation/TabNavigator.tsx
src/screens/                     Home, Settings, Profile
src/types/                       TS shim for vector-icons (no .d.ts ships with v10.3)
```

## Notes

A few things that aren't obvious from the code:

- `react-native-safe-area-context` instead of RN's built-in `SafeAreaView`. The built-in is deprecated and ignores Android cutouts. Each screen uses `edges={['top','left','right']}` (bottom would gap above the tab bar).
- `headerShown: false` per tab so each screen owns its own top safe area.
- `React.memo(Accordion)` + `useCallback` on `renderItem`/`keyExtractor` so toggling one row doesn't re-render the rest.
- `RootTabParamList` + global module augmentation so `useNavigation()` is typed everywhere without re-importing.
- Icon names are a local literal union, not `keyof typeof Ionicons.glyphMap`. The package's `glyphMap` is `Record<string, number>`, so `keyof typeof` collapses to `string` and gives you nothing.
- `LayoutAnimation` for the accordion. Reanimated would be smoother on Android but not worth the dep for one animation. Android needs `setLayoutAnimationEnabledExperimental(true)`.
- Custom `tabBarButton` with `android_ripple={null}` because the default Material ripple bleeds outside the tab bounds.

## Tests

`__tests__/Accordion.test.tsx` covers: title renders, body hidden by default, body shows on press. Each test was verified by mutation — broke the implementation in three ways, confirmed each test caught the right one, reverted.

`jest.config.js` extends `transformIgnorePatterns` for `@react-navigation` and `react-native-vector-icons` (both ship as ESM).

## TODO

- `useNotes()` hook + persistence (AsyncStorage / mmkv) — once notes are editable.
- Theming via `useColorScheme()` over the existing `COLORS` palette.
