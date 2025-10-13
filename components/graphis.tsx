"use client";

import { RadialBarChart, RadialBar, PolarGrid, PolarRadiusAxis, Label } from "recharts";

interface ProgressCircleProps {
  value: number;
  max: number;
  size?: number;
  color?: string;
}

export default function ProgressCircle({
  value,
  max,
  size = 250,
  color = "#00bcd4",
}: ProgressCircleProps) {
  const percent = (value / max) * 100;

  const chartData = [
    { name: "progress", value: percent, fill: color },
  ];

  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="flex justify-center items-center"
    >
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={-270}
        innerRadius="70%"
        outerRadius="100%"
        barSize={15}
      >
        {/* Círculo de fondo */}
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[90, 100]}
        />

        {/* Barra de progreso */}
        <RadialBar
          dataKey="value"
          cornerRadius={15}
          background
          fill={color}
        />

        {/* Texto central */}
        <PolarRadiusAxis
          domain={[0, 100]}
          tick={false}
          tickLine={false}
          axisLine={false}
        >
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
                      className="fill-white text-4xl font-bold"
                    >
                      {value}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-gray-400 text-sm"
                    >
                      de {max}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </div>
  );
}
