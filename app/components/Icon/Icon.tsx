type IconProps = {
  name: string;
  width?: number;
  height?: number;
   className?: string;
};

export function Icon({
  name,
  width = 24,
  height = 24,
  className,
}: IconProps) {
  return (
    <svg className={className} width={width} height={height} aria-hidden="true">
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}