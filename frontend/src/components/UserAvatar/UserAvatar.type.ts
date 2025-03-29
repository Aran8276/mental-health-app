export interface SizeClasses {
  sm: string;
  md: string;
  lg: string;
}

export interface UserAvatarProps {
  src: string;
  name: string;
  size: "sm" | "md" | "lg";
  sizeClasses: SizeClasses;
}
