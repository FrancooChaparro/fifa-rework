"use client"

import {
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarRadiusAxis,
  Label,
} from "recharts"
import { ChartContainer, ChartConfig } from " @/components/ui/chart"

type PenaltyRadialChartProps = {
  penalesJugados: number
  penalesGanados: number
  color?: string // 👉 color opcional del arco
}

export function PenaltyRadialChart({
  penalesJugados,
  penalesGanados,
  color = "#22c55e",
}: PenaltyRadialChartProps) {
  const efectividad =
    penalesJugados > 0 ? (penalesGanados / penalesJugados) * 100 : 0

  // 🔸 Calcular el ángulo dinámico
  const startAngle = 90
  const endAngle = 90 - (360 * efectividad) / 100

  const chartData = [{ name: "efectividad", value: efectividad, fill: color }]

  const chartConfig = {
    efectividad: { label: "Efectividad", color },
  } satisfies ChartConfig

  return (
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-[170px] h-[170px]" // 👈 tamaño fijo para evitar recortes
      >
        <RadialBarChart
          data={chartData}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={70}
          outerRadius={100}
        >
   

          {/* ✅ Arco verde con fondo transparente */}
          <RadialBar
            dataKey="value"
            fill={color}
            cornerRadius={10}
            background={{ fill: "rgba(255,255,255,0.1)" }}
          />

          <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="text-4xl font-bold fill-white"
                      >
                        {Math.round(efectividad)}%
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 22}
                        className="text-sm fill-gray-300"
                      >
                        efectividad
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
  )
}
