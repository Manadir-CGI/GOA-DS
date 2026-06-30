// Ambient JSX typing for the Ionicons custom element, used directly by several
// GoA components (e.g. GoabButton's leading/trailing icon slots). Consumers
// load the Ionicons web component from CDN per the README; this only types it.
import type * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          size?: string;
          color?: string;
          src?: string;
          // Several GoA components pass a literal `class` attribute (not
          // `className`) to this custom element — valid JSX, and how the
          // original canvas source is written; typed here rather than
          // "fixed" so the port stays behavior-for-behavior faithful.
          class?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
