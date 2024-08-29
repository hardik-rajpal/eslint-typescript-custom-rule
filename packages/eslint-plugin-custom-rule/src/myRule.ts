import { TSESLint } from "@typescript-eslint/utils";

type MessageIds = "functionUnused" | "messageIdForSomeOtherFailure";

const myRule: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "suggestion",
    messages: {
      functionUnused: "This function Ain't used",
      messageIdForSomeOtherFailure: "Error message for some other failure",
    },
    schema: [], // no options
  },
  create: (context) => ({
    FunctionDeclaration(node) {
      let name = node.id?.name;
      if (!name) {
        return;
      }
      if (name.startsWith("local")) {
        let parent: typeof node.parent = node;
        while (parent.parent) {
          parent = parent.parent;
        }
        let count = 0;
        const lines = context.getSourceCode().getLines();
        lines.forEach((element) => {
          if (element.includes(name as string)) {
            count += 1;
          }
        });
        if (count === 1) {
          context.report({
            messageId: "functionUnused",
            node: node,
          });
        }
      }
    },
  }),
};

export default myRule;
