import { cn } from "../lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#3d3d5280]", className)}
      {...props}
    />
  )
}

export { Skeleton }
