import test from 'node:test'
import assert from 'node:assert';
import app from '../../../src/index'

test('truthiness of true', () => {
  assert.strictEqual(true, true)
})