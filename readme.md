# Website

## Requirements

**macOS:** A computer running macOS is needed for this website because the video converter script uses the `avconvert` tool that converts transparent videos into Apple ProRes 4444 temporarily so that they can be converted into transparent videos that are supported on both Safari and Chrome.

**DaVinci Resolve Studio:** The animations are made with DaVinci Resolve Studio, and the Studio version is needed because I leverage DaVinci's Fusion Scripts that automate exporting projects into transparent videos.

- **Python 3.6.x:** Fusion scripts require a Python 3.6 version installed on the system.

## Flow

The animated effects are stored in DaVinci Resolve Project Files which are synced to the website via a script (TODO: set up a script in DaVinci that autosaves the file to the `website` repository).

The videos in the project files should be exported from DaVinci Resolve into the website's `public/videos` folder. (TODO: see if there's a way to export to Apple ProRes 4444 directly from DaVinci to save time instead of converting the videos to the intermediary format).

## Stats

**RescueTime:** Top 5 visited sites at the end of the day + Productivity Pulse

**GitHub:** Contribution Graph

**WakaTime:** Programming Languages Pie Chart & Project Time Dashboard Graph

## DaVinci Flow

1. All Fusion compositions are stored in one project.
2. When the compositions are updated,
3.
