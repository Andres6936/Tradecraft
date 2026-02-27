import { getByCategory } from "~/server";

const FactoryInspectTransferList = getByCategory("Transfer");

type FactoryType = (typeof FactoryInspectTransferList)[number];

const QuestionIsFactoryInspectTransfer = (args: {
  key: string;
  kind: string;
}): [FactoryType, true] | [undefined, false] => {
  const factory = FactoryInspectTransferList.find(
    (factory) =>
      factory.Transfer.Kind === args.kind && factory.Key === args.key,
  );
  // Tuple: [Factory coincidence, Is factory to inspect]
  if (factory) return [factory, true];
  return [undefined, false];
};

export { QuestionIsFactoryInspectTransfer };
