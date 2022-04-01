import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { print } from 'sh-syntax'

const _dirname =
  typeof __dirname === 'undefined'
    ? path.dirname(fileURLToPath(import.meta.url))
    : __dirname

describe('parser and printer', () => {
  it('should format all fixtures', async () => {
    const fixtures = path.resolve(_dirname, 'fixtures')
    for (const filepath of await fs.promises.readdir(fixtures)) {
      const input = fs.readFileSync(path.resolve(fixtures, filepath), 'utf8')

      const output = await print(input, {
        filepath,
      })

      expect(output).toMatchSnapshot(filepath)
    }
  })
})
