import { IconProps, getIconProps } from "@/helpers/getIconProps";

export const TheeDotIcon = (props?: IconProps) => {
  const { fill, className, height, width } = getIconProps(props);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 4"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM16 0C14.9 0 14 0.9 14 2C14 3.1 14.9 4 16 4C17.1 4 18 3.1 18 2C18 0.9 17.1 0 16 0ZM7 2C7 0.9 7.9 0 9 0C10.1 0 11 0.9 11 2C11 3.1 10.1 4 9 4C7.9 4 7 3.1 7 2Z"
        fill={fill}
      />
    </svg>
  );
};
