import { IconProps, getIconProps } from "@/helpers/getIconProps";

export const SearchIcon = (props?: Partial<IconProps>) => {
  const { fill, className, height, width } = getIconProps(props);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      className={className}
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.63636 8.51872C1.63636 4.7177 4.7177 1.63636 8.51872 1.63636C12.3197 1.63636 15.4011 4.7177 15.4011 8.51872C15.4011 12.3197 12.3197 15.4011 8.51872 15.4011C4.7177 15.4011 1.63636 12.3197 1.63636 8.51872ZM8.51872 0C3.81396 0 0 3.81396 0 8.51872C0 13.2235 3.81396 17.0374 8.51872 17.0374C10.5765 17.0374 12.4638 16.3078 13.9361 15.0932L16.6033 17.7604C16.9228 18.0799 17.4408 18.0799 17.7604 17.7604C18.0799 17.4408 18.0799 16.9228 17.7604 16.6033L15.0932 13.9361C16.3078 12.4638 17.0374 10.5765 17.0374 8.51872C17.0374 3.81396 13.2235 0 8.51872 0Z"
        fill={fill}
      />
    </svg>
  );
};
