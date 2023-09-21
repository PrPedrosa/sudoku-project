import { useEffect, useState } from 'react'
import { addVisit } from './api/metrics'
import { CheckSolutionModal } from './components/CheckSolutionModal'
import { GoBackButton } from './components/GoBackButton'
import { SolverModeButton } from './components/SolverModeButton'
import { Timer } from './components/Timer'
import { Board } from './pages/Board'
import { Home } from './pages/Home'
import { SudokuSolver } from './pages/SudokuSolver'
import { generateSudoku } from './scripts/createBoard'
import { handleHiScoreStorage } from './scripts/handleHiScoreStorage'
import { updateSuperPositions } from './scripts/updateSuperPositions'
import { Square } from './types'
import { cx } from './utils'

function App() {
  const [board, setBoard] = useState<Square[]>()
  const [initialSquaresIds, setInitialSquareIds] = useState<number[]>()
  const [solvedBoard, setSolvedBoard] = useState<Square[]>()
  const [playing, setPlaying] = useState(false)
  const [timer, setTimer] = useState<number>(0)
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>()
  const [retry, setRetry] = useState(false)
  const [solution, setSolution] = useState(false)
  const [solverMode, setSolverMode] = useState(false)
  const [mode, setMode] = useState<'easy' | 'medium' | 'hard'>()
  const [introAnimationCounter, setIntroAnimationCounter] = useState(1)
  const [visitCounter, setVisitCounter] = useState(0)

  useEffect(() => {
    if (!visitCounter) {
      addVisit()
      setVisitCounter(1)
    }

    const storage = ['easy-scores', 'medium-scores', 'hard-scores']
    storage.forEach(item => (localStorage.getItem(item) ? undefined : localStorage.setItem(item, '0,0,0')))
  }, [])

  function startPlaying(difficulty: 'easy' | 'medium' | 'hard') {
    if (!difficulty) return
    setMode(difficulty)
    setPlaying(true)

    const { unsolvedBoard, solvedBoard } = generateSudoku(difficulty)
    setBoard(unsolvedBoard)
    setSolvedBoard(solvedBoard)

    const initialSqs = unsolvedBoard.filter(sq => sq.value !== 0).map(sq => sq.id)
    setInitialSquareIds(initialSqs)

    const intId = setInterval(() => {
      setTimer(prev => prev + 1)
    }, 1000)
    setIntervalId(intId)
  }

  function handleInput(squareId: number, value: number) {
    if (!board) return
    const newBoard = board.map(sq => {
      if (squareId === sq.id) return { ...sq, value: value }
      return sq
    })
    setBoard(updateSuperPositions(newBoard))
  }

  const stopTimer = () => {
    clearInterval(intervalId)
    setTimer(0)
    setIntervalId(undefined)
  }

  function handleCheckSolution(time: number) {
    const oldBoard = board
    if (!board) return
    const newBoard: Square[] = board.map(sq => {
      if (
        !board.find(
          squ =>
            squ.value === sq.value &&
            squ.id !== sq.id &&
            (squ.rowId === sq.rowId || squ.colId === sq.colId || squ.boxId === sq.boxId)
        )
      ) {
        return { ...sq, valid: true }
      } else return { ...sq, valid: false }
    })

    if (newBoard.find(sq => sq.valid === false)) {
      setBoard(newBoard)
      setRetry(true)
      setTimeout(() => {
        setBoard(oldBoard)
        setRetry(false)
      }, 1500)
      return
    }
    handleHiScoreStorage(time, mode)
    setBoard(newBoard)
    setRetry(false)
    setSolution(true)
  }

  function handleGoBack() {
    setPlaying(false)
    setBoard(undefined)
    setSolvedBoard(undefined)
    setSolution(false)
    setRetry(false)
    setSolverMode(false)
    stopTimer()
  }

  const isBoardNotCompleted = () => board?.find(sq => sq.value === 0)

  return (
    <div className={cx('h-[100vh] bg-c-dark1 flex w-[100%] items-center justify-center relative overflow-auto')}>
      <GoBackButton playing={playing} solverMode={solverMode} goBack={handleGoBack} />
      <Timer time={timer} playing={playing} />

      {!playing && !solverMode && <SolverModeButton setSolverMode={setSolverMode} />}
      {!playing && solverMode && <SudokuSolver />}
      {!playing && !solverMode && (
        <Home getBoard={startPlaying} animate={[introAnimationCounter, setIntroAnimationCounter]} />
      )}

      {playing && <Board board={board} handleInput={handleInput} initialSquares={initialSquaresIds} />}

      {playing && !isBoardNotCompleted() && (
        <CheckSolutionModal
          solution={solution}
          retry={retry}
          checkSolution={handleCheckSolution}
          time={timer}
          mode={mode}
          goBack={handleGoBack}
        />
      )}
    </div>
  )
}

export default App
