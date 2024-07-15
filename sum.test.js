import { sum } from "./sum";

jest.mock('./sum')

describe('oui', () =>{
  test('adds test', () => {
    sum.mockReturnValue(2)
    expect(sum(1,1)).toBe(2)
  })
  
  test('adds test', () => {
    sum.mockReturnValue(3)
    expect(sum(1,1)).toBe(3)
  })
})
