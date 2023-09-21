import { useEffect, useState } from 'react'
import { GameData, getGames } from '../api/games'
import { Difficulty } from '../types.js'
import { cx } from '../utils'
import SVG from './SVG'
import { buildClock } from './Timer'

export function HiScores({ showOrHide, show, animate }: { showOrHide: () => void; show: boolean; animate: number }) {
  const [localScores, setScores] = useState<string[]>()
  const [mode, setMode] = useState<Difficulty>('easy')
  const [localOrGlobal, setLocalOrGlobal] = useState('local')
  useEffect(() => {
    setScores(localStorage.getItem(`${mode}-scores`)?.split(','))
  }, [mode])

  return (
    <>
      <button
        className={cx('opts-button', {
          'shadow-none bg-c-purple': show,
          'animate-intro2': animate
        })}
        onClick={() => {
          showOrHide()
          setScores(localStorage.getItem(`${mode}-scores`)?.split(','))
        }}
      >
        HiScores
      </button>
      {show && (
        <>
          <div className=" text-white absolute top-[200px] w-full  flex flex-col gap-[20px]">
            <div className="z-20 flex gap-[20px]">
              <button
                className={cx('opts-button', {
                  'shadow-none bg-c-purple': localOrGlobal === 'local'
                })}
                onClick={() => setLocalOrGlobal('local')}
              >
                Yours
              </button>
              <button
                className={cx('opts-button', {
                  'shadow-none bg-c-purple': localOrGlobal === 'global'
                })}
                onClick={() => setLocalOrGlobal('global')}
              >
                Global
              </button>
            </div>
            {localOrGlobal === 'local' ? (
              <LocalHiScores setMode={setMode} mode={mode} scores={localScores} />
            ) : (
              <GlobalHiScores setMode={setMode} mode={mode} />
            )}
          </div>
        </>
      )}
    </>
  )
}

function GlobalHiScores({ setMode, mode }: { setMode: (difficulty: Difficulty) => void; mode: Difficulty }) {
  const [scores, setScores] = useState<{
    easy: GameData[]
    medium: GameData[]
    hard: GameData[]
  }>()

  const [error, setError] = useState(false)

  useEffect(() => {
    getGames().then(games => {
      if (!games) {
        setError(true)
        return
      }
      setScores({ easy: games[0], medium: games[1], hard: games[2] })
      setError(false)
    })
  }, [])

  return (
    <div className="grid-rows-2 bg-c-dark4 border-c-purple border rounded-[5px] mb-[10px]">
      <ModeSwitcher setMode={setMode} mode={mode} />
      <div>
        {scores ? (
          scores[mode].map((s, i) => (
            <div
              key={i}
              className={cx('grid grid-cols-2 p-[5px] rounded-[5px]', {
                'bg-c-dark2': i % 2 !== 0
              })}
            >
              <div className="text-left pl-[30px]">
                {i + 1}. {s.user}
              </div>
              <div className="text-right pr-[30px]">{s.time !== 0 ? buildClock(s.time) : '-----'}</div>
            </div>
          ))
        ) : !error ? (
          <div className="flex items-center justify-center p-[20px]">
            <SVG path="spinner" fill="#ffffff" w={60} h={60} className="animate-spin" />
          </div>
        ) : (
          <div>
            There was an error fetching the HiScores. Please check that you're connected to the internet and try again
          </div>
        )}
      </div>
    </div>
  )
}

function LocalHiScores({
  setMode,
  mode,
  scores
}: {
  setMode: (difficulty: Difficulty) => void
  mode: string
  scores?: string[]
}) {
  return (
    <div className="grid-rows-2 bg-c-dark4 border-c-purple border rounded-[5px] mb-[10px]">
      <ModeSwitcher setMode={setMode} mode={mode} />
      {scores && (
        <div className="grid grid-row-3 p-[10px]">
          {scores.map((s, i) => (
            <div
              key={i}
              className={cx('grid grid-cols-2 p-[5px]', {
                'bg-c-dark2': i % 2 === 0
              })}
            >
              <div className="text-center">{i + 1}.</div>
              <div>{+s !== 0 ? buildClock(+s) : '-----'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ModeSwitcher({ setMode, mode }: { setMode: (difficulty: Difficulty) => void; mode: string }) {
  return (
    <div className="grid grid-cols-3 text-center leading-[100%] rounded-[5px] cursor-pointer">
      <div
        onClick={() => setMode('easy')}
        className={cx('rounded-tl-[5px] p-[5px] text-green-700 font-semibold select-none', {
          'bg-c-dark2 border-b border-c-purple': mode !== 'easy',
          'bg-c-dark4': mode === 'easy'
        })}
      >
        Easy
      </div>
      <div
        onClick={() => setMode('medium')}
        className={cx('p-[5px] text-orange-700 font-semibold select-none', {
          'bg-c-dark2 border border-c-purple border-t-0': mode !== 'medium',
          'bg-c-dark4 border-r border-l border-c-purple': mode === 'medium'
        })}
      >
        Medium
      </div>
      <div
        onClick={() => setMode('hard')}
        className={cx('rounded-tr-[5px] p-[5px] text-red-700 font-semibold select-none', {
          'bg-c-dark2 border-b border-c-purple': mode !== 'hard',
          'bg-c-dark4': mode === 'hard'
        })}
      >
        Hard
      </div>
    </div>
  )
}
