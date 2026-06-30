import * as React from "react";
import icons from "./icon-data";

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, "name"> {
  /** Icon entry name, e.g. "AirplaneVariantOutline", "GoaMenuVariantBasic", "LogoGoogle". */
  name: string;
  /** Pixel (or any CSS length) size applied to both width and height. */
  size?: number | string;
}

/**
 * GoA icon set — 845 entries (GoA core, Extended Ionicons outline/filled, brand logos)
 * rendered from inline path data so they work outside the Ionicons web component
 * (e.g. static exports). Recolour via the CSS `color` property.
 */
export function Icon({ name, size, ...rest }: IconProps) {
  const entry = icons[name];
  if (!entry) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox={entry.viewBox}
      fill="none"
      // body strings are emitter-controlled <path> markup — geometry,
      // numeric fills and transforms only; no untrusted text reaches them.
      dangerouslySetInnerHTML={{ __html: entry.body }}
      {...rest}
    />
  );
}

export default Icon;
