const sprintf = (str, ...argv) =>
  !argv.length
    ? str
    : sprintf(str.replace(sprintf.token || "%", argv.shift()), ...argv);

/**
 * LintResult
 *
 * Holds the results from all the rules captured and errors.
 */

class LintResult {
  constructor(ruleId, ruleDescription) {
    this.ruleId = ruleId;
    this.ruleDescription = ruleDescription;
    this.pass = true;
    this.errorCount = 0;
    this.errors = [];
  }

  setFlowId(flowId) {
    this.flowId = flowId;
  }

  /**
   * Get the Message Object based on the lintCodes table.  Also, substitutes the
   * message and recommendation arguments into the message and recommendation
   * strings based on the percent (%) character.
   */
  #getMessageObj(code, messageArgs, recommendationArgs, nodeId, flowId) {
    const messageObj = {
      code: code.code,
      message: sprintf(code?.message, ...messageArgs),
      type: code?.type || "unknown-type",
      recommendation: sprintf(code?.recommendation, ...recommendationArgs),
      flowId: flowId || this.flowId,
    };
    if (nodeId) {
      messageObj.nodeId = nodeId;
    }
    return messageObj;
  }

  addError(code, props = {}) {
    if (code) {
      this.errors.push(
        this.#getMessageObj(
          code,
          props.messageArgs || [],
          props.recommendationArgs || [],
          props.nodeId,
          props.flowId,
        ),
      );
    } else {
      this.errors.push(
        this.#getMessageObj(
          {
            code: `ruleId-${this.ruleId}`,
            message: `Unknown Error [ruleId:${this.ruleId}]: %`,
            type: "internal-error",
            recommendation:
              "Resolve error, exclude or ignore this rule for the flow.",
            flowId: this.flowId,
          },
          props.messageArgs || [],
          [],
        ),
      );
    }

    this.errorCount++;
    this.pass = false;
  }

  addUnknownCodeError(codeId) {
    this.errors.push({
      code: `ruleId-${this.ruleId}-unknown-code`,
      message: `Unknown Error Code [ruleId:${this.ruleId}]: ${codeId}`,
      type: "internal-error",
      recommendation: "Correct rule to include valid code.",
      flowId: this.flowId,
    });

    this.errorCount++;
    this.pass = false;
  }

  addClean(message) {
    this.clean = true;
    if (!this.cleanMessages) {
      this.cleanMessages = [];
    }
    this.cleanMessages.push(message);
  }
}

module.exports = LintResult;
