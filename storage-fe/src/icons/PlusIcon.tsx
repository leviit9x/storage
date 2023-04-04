import { IconProps, getIconProps } from "@/helpers/getIconProps";

export const PlusIcon = (props: IconProps) => {
  const { fill, className, height, width } = getIconProps(props);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15 15"
      className={className}
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.25 6.75H15V8.25H8.25V15H6.75V8.25H0V6.75H6.75V0H8.25V6.75Z"
        fill={fill}
      />
    </svg>
  );
};
