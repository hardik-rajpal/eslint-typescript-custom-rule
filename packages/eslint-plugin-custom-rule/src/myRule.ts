import { TSESLint } from "@typescript-eslint/utils";

type MessageIds = "functionUnused" | "localNoExport";

const myRule: TSESLint.RuleModule<MessageIds> = {
  defaultOptions: [],
  meta: {
    type: "suggestion",
    messages: {
      functionUnused: "This function Ain't used",
      localNoExport: "Don't export local- functions",
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
        const lines = context.getSourceCode().getLines();
        const line = lines[node.loc.start.line - 1];
        if (line?.includes("export")) {
          context.report({
            messageId: "localNoExport",
            node: node,
          });
        }
      }
    },
  }),
};

export default myRule;
