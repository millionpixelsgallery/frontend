const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')
const makeTemplate = require('./template')

const sections = [
  {
    header: 'Code generation tool',
    content: 'Code generation tool',
  },
  {
    header: 'Synopsis',
    content: '$ hhp <command> <options> ',
  },
  {
    header: 'Command List',
    content: [
      {
        name: 'make',
        typeLabel: '{underline ComponentName}',
        summary: 'Creates a component in components folder',
      },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'template',
        alias: 't',
        typeLabel: '{underline name}',
        description: 'Specify template (look hhp/template folder)',
      },
      {
        name: 'root',
        alias: 'r',
        typeLabel: '{underline name}',
        description: 'Specify root folder (default ./components)',
      },
    ],
  },
]

const mainDefinitions = [{ name: 'command', defaultOption: true }]
const { command, _unknown = [] } = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true })

switch (command) {
  case 'make':
    const {
      template = 'default',
      root = './src/components',
      output,
    } = commandLineArgs(
      [
        { name: 'template', alias: 't' },
        { name: 'root', alias: 'r' },
        { name: 'output', defaultOption: true },
      ],
      { argv: _unknown }
    )

    makeTemplate({ template, output, root })
      .then(() => console.log('Done'))
      .catch(console.error)

    break
  case 'help':
  default:
    console.log(commandLineUsage(sections))
}
