import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Switch } from './ui/switch'

export function ThemeToggleButton() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Carregar o tema inicial do `localStorage`
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (storedTheme) {
      setTheme(storedTheme)
      document.body.classList.toggle('dark', storedTheme === 'dark')
    }
  }, [])

  // Função para alternar o tema
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.body.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Sun className="w-4 h-4 text-yellow-500" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
        className="bg-accent-foreground"
      />
      <Moon className="w-4 h-4 text-blue-500" />
    </div>
  )
}
