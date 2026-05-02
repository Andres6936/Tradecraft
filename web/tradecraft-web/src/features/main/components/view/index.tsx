import { cn } from "~/lib/utils";

const Flex = ({className, ...props}: React.PropsWithChildren<{className?: string}>) => (
  <div className={cn("flex items-center justify-between", className)} {...props} />
);

const FlexEnd = ({className, ...props}: React.PropsWithChildren<{className?: string}>) => (
  <div className={cn("flex items-center justify-end", className)} {...props} />
);

const Row = ({className, ...props}: React.PropsWithChildren<{className?: string}>) => (
  <div className={cn("flex flex-row items-center gap-2", className)} {...props} />
);

const Col = ({className, ...props}: React.PropsWithChildren<{className?: string}>) => (
  <div className={cn("flex flex-col", className)} {...props} />
);

export {Flex, FlexEnd, Row, Col}
