const path = require('path')
const fs = require('fs').promises
const { execSync } = require('child_process')

module.exports = async function ({ template, output, root }) {
  const segments = output.split('/')
  const name = segments[segments.length - 1]
  let currentRoot = path.resolve(process.cwd(), root)

  const availableTemplates = (await fs.readdir(__dirname)).filter(
    (filename) => filename !== 'index.js'
  )
  if (!availableTemplates.includes(template)) throw new Error('unknown template ' + template)

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    const pathDir = path.resolve(currentRoot, './', segment)
    try {
      const files = await fs.readdir(pathDir)
      if (i + 1 === segments.length && files.length) {
        throw new Error(`${pathDir} already exists`)
      }
    } catch (e) {
      switch (e.code) {
        case 'ENOENT':
          await fs.mkdir(pathDir)
          break
        default:
          throw e
      }
    }

    currentRoot = pathDir
  }

  const files = await fs.readdir(path.resolve(__dirname, './', template))

  for (const filename of files) {
    const file = await fs.readFile(path.resolve(__dirname, './', template, filename), 'utf8')
    const outputPath = path.resolve(currentRoot, './', filename.replace(/__NAME__/g, name))
    await fs.writeFile(outputPath, file.replace(/__NAME__/g, name), 'utf8')
    console.info('* ', outputPath, ' created')
  }

  execSync(`git add ${currentRoot}/*`)
}
