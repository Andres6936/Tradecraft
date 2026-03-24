const Flex = (props: React.PropsWithChildren<{}>) => (
  <div className="flex items-center justify-between" {...props} />
);

const FlexEnd = (props: React.PropsWithChildren<{}>) => (
  <div className="flex items-center justify-end" {...props} />
);

const Row = (props: React.PropsWithChildren<{}>) => (
  <div className="flex flex-row items-center gap-2" {...props} />
);

export {Flex, FlexEnd, Row}
