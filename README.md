@ping-identity/dvlint - PingOne DaVinci Linter Core and CLI
=========

![example workflow](https://github.com/pingidentity/dvlint/actions/workflows/tests.yml/badge.svg)
=========
## From Ping Identity
### Authors: Cloud Solutions Team

---
## NOTE:

### You only need to clone or fork this repo if your intent is to contribute to, or extend, this project.
---

### Project Details
This JavaScript module lints PingOne DaVinci flows (as exported from DaVinci) against a known set of
rules and return codes.

More information on the PingOne DaVinci Linter can be found in [Ping Library](https://library.pingidentity.com/page/collection-linter).

#### Responsible Disclosure

**Please read the [Contributor Guidelines](https://github.com/pingidentity/dvlint/blob/main/CONTRIBUTING.md) for reporting security issues.**

Before each release, we run the following commands against our project to ensure a clean project.
We make every reasonable effort to resolve category critical and high vulnerabilities.

`npm doctor`
`npx unimported`
`npm outdated`
`npx depcheck`
`npm audit`

Because of the as-is offering and license of this project, it is highly recommended that
users of this project run `npm audit`, or the Javascript SAST tool of your choice,
and evaluate the results and  make changes to meet your internal application security requirements.

### Installation

```bash
npm install -g @ping-identity/dvlint
npm install -g @ping-identity/dvlint-base-rule-pack

dvlint -V     # Returns version
dvlint -r     # Prints out rules from default rule pack
```

### Features

- Set of flows to check for errors, best-practices, syntax, security, ... issues with PingOne DaVinci flows.
- `dvlint` CLI tool to run the linter utilities
  - `dvlint -f FLOW` to lint a flow stored in the FLOW file
  - `dvlint -r` to get all the available rules
  - `dvlint -c` to get all the available codes
  - Both JSON and table formats

### Rules List
To get a list of rules for a rule pack(s), run the `dvlint` utility to print a table or JSON object of all rules.
```bash
./dvlint -r    # Prints a table of rules
./dvlint -r -j # Prints a JSON object of rules
```

### Codes List
To get a list of codes for a rule pack(s), run the `dvlint` utility to print a table or JSON object of all codes.
```bash
./dvlint -c    # Prints a table of codes
./dvlint -c -j # Prints a JSON object of codes
```

### Including/Excluding/Ignoring Rules in DaVinci Flow
Rules may be either include or excluded when a flow is run through linter.  Additionally, a rule may be ingnored.  Ignoring a rule will run the rule, providing results from the execution, but ignoring it if it does not pass.

This is accomplished by adding variables into a single DaVinci Variables node at the start of your flow.  The node **MUST** be called `_dvlint_`.

* Including Rule(s) - Add a field called `include-rules` into the rule with a value containing rules names.  This should be a csv format if multiple rules are listed.
* Excluding Rule(s) - Add a field called `exclude-rules` into the rule with a value containing rules names.  This should be a csv format if multiple rules are listed.
* Ignoring Rule(s) - Add a field called `ignore-rules` into the rule with a value containing rules names.  This should be a csv format if multiple rules are listed.

Note that an error will be emitted if both include and exclude fields are found.

### Disclaimer

THIS ENTIRE PROJECT AND ALL ITS ASSETS IS PROVIDED "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL PING IDENTITY OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) SUSTAINED BY YOU OR A THIRD PARTY, HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT ARISING IN ANY WAY OUT OF THE USE OF THIS PROJECT CODE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.