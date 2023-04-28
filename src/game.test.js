import {
  createInitialBoard,
  createNewState,
  checkGameOver
} from './game.js'

test('new state should be generated when two equal non zero tiles, but no tile to be moved', () => {
  const board = [
    [2,2,0,0],
    [2,4,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]
  
  const expectedNewState = [
    [4,2,0,0],
    [0,4,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]
  const newBoard = createNewState('up', board)[0]
  console.log(newBoard)
  expect(newBoard[0][0]).toStrictEqual(4)
})

test('tile should not merge with alternate tile when having a tile in between', () => {
  const board = [
    [2,2,0,0],
    [4,4,0,0],
    [2,0,0,0],
    [0,0,0,0]
  ]
  const expectedNewState = [
    [2,2,0,0],
    [4,4,0,0],
    [2,0,0,0],
    [0,0,0,0]
  ]
  const newBoard = createNewState('up', board)[0]
  console.log(newBoard)
  expect(newBoard[0][0]).toStrictEqual(2)
})

test('tiles should not be merged on basis of the results calculated in the same operation', () => {
  const board = [
    [2,0,0,0],
    [2,0,0,0],
    [4,0,0,0],
    [0,0,0,0]
  ]

  expect(createNewState('up', board)[0][0][0]).toBe(4)
})

test('gameOver pass test', () => {
  const board = [
    [4,8,2,4],
    [2,4,16,2],
    [4,8,32,16],
    [16,2,4,2]
  ]

  expect(checkGameOver(board)).toBe(true)
})

test('gameOver fail test', () => {
  const board = [
    [2,8,2,4],
    [2,4,16,2],
    [4,8,32,16],
    [16,2,4,2]
  ]

  expect(checkGameOver(board)).toBe(false)
})

test('gameOver fail test with j === n - 1', () => {
  const board = [
    [4,8,64,2],
    [8,16,8,16],
    [32,64,256,16],
    [2,4,16,2]
  ]

  expect(checkGameOver(board)).toBe(false)
})

test('gameOver pass test 2', () => {
  const board = [
    [4,2,16,8],
    [2,8,64,4],
    [128,16,8,2],
    [2,8,32,4]
  ]

  expect(checkGameOver(board)).toBe(true)
})



