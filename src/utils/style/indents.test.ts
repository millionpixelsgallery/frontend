import { margin } from 'utils/style/indents'

describe('indents helper', () => {
  test('memo', () => {
    const style1 = margin(10)
    const style2 = margin(10)

    expect(style1 === style2).toBeTruthy()
  })

  test('all by top', () => {
    const style = margin(10)
    expect(style).toMatchObject({
      margin: '10px',
    })
  })

  test('topBottom, rightLeft', () => {
    const style = margin(10, 20)
    expect(style).toMatchObject({
      margin: '10px 20px',
    })
  })

  test('top, rightLeft, bottom', () => {
    const style = margin(10, 20, 30)
    expect(style).toMatchObject({
      margin: '10px 20px 30px',
    })
  })

  test('top, right, bottom, left', () => {
    const style = margin(10, 20, 30, 40)
    expect(style).toMatchObject({
      margin: '10px 20px 30px 40px',
    })
  })

  test('top only', () => {
    const style = margin(10, undefined)
    expect(style).toMatchObject({
      marginTop: '10px',
    })
  })

  test('right only', () => {
    const style = margin(undefined, 10)
    expect(style).toMatchObject({
      marginRight: '10px',
    })
  })

  test('bottom only', () => {
    const style = margin(undefined, undefined, 10)
    expect(style).toMatchObject({
      marginBottom: '10px',
    })
  })

  test('left only', () => {
    const style = margin(undefined, undefined, undefined, 10)
    expect(style).toMatchObject({
      marginLeft: '10px',
    })
  })
})
