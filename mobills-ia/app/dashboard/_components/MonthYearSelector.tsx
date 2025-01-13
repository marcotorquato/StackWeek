import { useState } from 'react'

interface MonthYearSelectorProps {
  onChange: (month: number, year: number) => void
}

export default function MonthYearSelector({
  onChange,
}: MonthYearSelectorProps) {
  // Estado para o mês e o ano selecionados
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1,
  )
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  )

  // Opções de meses e anos
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = Number(e.target.value)
    setSelectedMonth(month)
    onChange(month, selectedYear)
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = Number(e.target.value)
    setSelectedYear(year)
    onChange(selectedMonth, year)
  }

  return (
    <div className="flex items-center gap-4">
      {/* Selector month */}
      <select
        value={selectedMonth}
        onChange={handleMonthChange}
        className="bg-background border rounded-lg px-4 py-2"
      >
        {months.map((month, index) => (
          <option key={index} value={index + 1}>
            {month}
          </option>
        ))}
      </select>

      {/* Selector year */}
      <select
        value={selectedYear}
        onChange={handleYearChange}
        className="bg-background border rounded-lg px-4 py-2"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}
