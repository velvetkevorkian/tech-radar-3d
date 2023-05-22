import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

export const SelectedContext = createContext({
  selected: '',
  // TODO: can this be typed properly?
  setSelected: (() => undefined) as Dispatch<SetStateAction<string>>,
})

export function SelectedProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState('')

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  )
}
