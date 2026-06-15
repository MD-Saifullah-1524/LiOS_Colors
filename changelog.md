## 4.0.0 (North Wind)

### What's new

- Brand new UI
- Ability to share a color
- Foundation for future upcoming releases.
  
## Changes

- A lot of refactoring consisting
  - Leveraging new APIs from `LiOS-Open` to gain performance and consistency
  - Home page is now meaningful
  - New but familiar color palette
  - Replaced some bulky action buttons with a button group

## 3.3.1

### Bugfixes

- Fixed alignment issues across the project

## 3.3.0

### New Features

- Palettes Generator: A basic palette generator which utilizes [LiOS Colors Utility](https://github.com/LiOS-Org/LiOS-Colors-Utility) to generate palettes, you can either copy singular shades (hex) or copy the whole formatted CSS (normal and trasnlucent/frosted) shades.
- Now [LiOS Colors Utility](https://github.com/LiOS-Org/LiOS-Colors-Utility) is bundled with the repository, After cloning, run:
  ```bash
  git submodule update --init --recursive
  ```
  after cloning to avoid any missing dependencies.

### Bugfixes

- Fixed padding in `shadeView` and `searchView`.
- Fixed installation method.

### Changes and Improvements

- Removed `installation and usage` page, and now both of the instructions lives inside landing page.

## 3.2.1

## New Features

- Reimplemented Shades filter

### Changes & Improvements

- Fixed the `browse.js` loader and search state issues that could break browsing.
- Removed redundant browse helper files after consolidating the logic.
- Fixed alignment issues on home screen

## 3.2.0

### Changes & Improvements

- Updated `LiOS-Open` to latest version.
- Updated `metadata` to follow the latest metadata schema.
- Simplified rendering
- Temprorily disbaled `about` window

## 3.1.0

- Removed duplicate color.
- Added support for 3 new color spaces (Using ColorJS);
  - sRGB
  - HSL
  - OKLCH
- Now `LiOS-Colors` fetches data directly from `LiOS-Colors-Data` to make sure color data is always up-to-date.

## 3.0.0 (Eastern Desert)


> Design update inspired by warm, mineral desert tones.

### New Features

- UI Overhaul
- landing page

### Changes & Improvements

- Full rewrite
- Removed all types of filter(cause they were inaccurate and will be added later)
- New and more advanced search mechanism
- Copy paste functionality for `hex` and `translucent colors` (sRGBA will be added later)
- More optimized than ever
