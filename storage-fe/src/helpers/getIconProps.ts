export type IconProps = {
  fill?: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  [key: string]: any;
};

const ICON_PROPS: IconProps = {
  fill: "currentColor",
  className: "",
  height: 24,
  size: 24,
  width: 24,
};

export function getIconProps(props?: Partial<IconProps>): IconProps {
  return {
    ...ICON_PROPS,
    ...props,
    width: props?.size || props?.width || ICON_PROPS.width,
    height: props?.size || props?.height || ICON_PROPS.height,
  };
}
