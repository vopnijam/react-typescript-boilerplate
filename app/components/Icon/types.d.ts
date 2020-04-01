interface IIconProps {
  appendage?: string;
  appendageFill?: cssHex;
  className?: string;
  fill?: cssHex;
  height?: number;
  path: string;
  width?: number;
  onClick?(e: MouseEvent): void;
 }
