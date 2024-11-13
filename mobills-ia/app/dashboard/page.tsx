import {
  ArrowDownIcon,
  ArrowUpIcon,
  BitcoinIcon,
  BuildingIcon,
  DollarSignIcon,
  GraduationCapIcon,
  HomeIcon,
  LayersIcon,
  WalletIcon,
} from 'lucide-react'
import { Card } from '../_components/ui/card'
import { Progress } from '../_components/ui/progress'

export default function Component() {
  return (
    <div className="dark p-6 bg-background min-h-screen">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg">
              Relatório IA
            </button>
            <select className="bg-background border rounded-lg px-4 py-2">
              <option>Novembro</option>
            </select>
          </div>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <WalletIcon className="w-4 h-4" />
                Saldo
              </div>
              <div className="text-3xl font-bold">R$ 2.700</div>
            </div>
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
              Adicionar Transação
            </button>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <LayersIcon className="w-4 h-4" />
                Investido
              </div>
              <div className="text-2xl font-bold">R$ 3.500</div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
                Receita
              </div>
              <div className="text-2xl font-bold">R$ 8.150</div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <ArrowDownIcon className="w-4 h-4 text-red-500" />
                Despesas
              </div>
              <div className="text-2xl font-bold">R$ 2.950</div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Distribuição</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Ganhos</span>
                </div>
                <span>60%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Gastos</span>
                </div>
                <span>22%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Investimentos</span>
                </div>
                <span>18%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold mb-4">Gastos por categoria</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Moradia</span>
                  <span>R$ 2.500</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Alimentação</span>
                  <span>R$ 1.200</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Saúde</span>
                  <span>R$ 320,00</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Transporte</span>
                  <span>R$ 150,00</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold">Transações</h2>
            <button className="text-sm text-primary">Ver mais</button>
          </div>
          <div className="space-y-4">
            {[
              {
                icon: DollarSignIcon,
                name: 'Salário',
                date: '15 Nov, 2024',
                amount: '+R$ 3.900',
                positive: true,
              },
              {
                icon: BitcoinIcon,
                name: 'Bitcoin',
                date: '15 Nov, 2024',
                amount: '-R$ 2.500',
                positive: false,
              },
              {
                icon: GraduationCapIcon,
                name: 'Academia',
                date: '15 Nov, 2024',
                amount: '-R$ 120,90',
                positive: false,
              },
              {
                icon: HomeIcon,
                name: 'Aluguel',
                date: '15 Nov, 2024',
                amount: '-R$ 297,90',
                positive: false,
              },
              {
                icon: BuildingIcon,
                name: 'Freelancing',
                date: '15 Nov, 2024',
                amount: '+R$ 1.750',
                positive: true,
              },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <transaction.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">{transaction.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.date}
                    </div>
                  </div>
                </div>
                <div
                  className={
                    transaction.positive ? 'text-green-500' : 'text-red-500'
                  }
                >
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
