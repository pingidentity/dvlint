const LintRule = require("../../../lib/LintRule");

class ExampleRule extends LintRule {
  constructor() {
    super({
      id: "example-rule",
      description: "Example Rule",
      cleans: false,
      reference: "https://example-reference-rule/doc",
    });

    this.addCode("example-error", {
      description: "Example Rule Description",
      message: "Example Rule of flow '%'",
      type: "best-practice",
      recommendation: "We recommend this example.",
    });
  }

  runRule() {
    try {
      const dvFlow = this.mainFlow;
      const someErrorCondition = true;

      // Variation where this rule is ignored in any subflows
      // const { allFlows } = this;
      // if (DVUtils.getAllSubFlows(allFlows).includes(dvFlow.flowId)) {
      //   return;
      // }

      if (someErrorCondition) {
        this.addError("example-error", {
          messageArgs: [dvFlow.flowId],
          nodeId: "n1234",
        });
      }

      // Test an undefined error
      this.addError(undefined, { messageArgs: ["Testing undefined errors"] });
      // Create an unknown code error
      this.addError("unknown-code");
    } catch (err) {
      this.addError(undefined, { messageArgs: [`${err}`] });
    }
  }
}

module.exports = ExampleRule;
