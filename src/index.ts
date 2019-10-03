import { gaTracker } from './ga-tracker/GaTracker';

// @ts-ignore
if(process.env.NODE_ENV === "development") {
  // @ts-ignore
  window.umaFrontEndUtilities = {
    // @ts-ignore
    gaTracker: gaTracker
  };
}

export * from './shortcode-parser/ShortcodeParser';
export * from './container/Container';
export * from './ga-tracker/GaTracker';
export * from './footnotes/Footnotes';