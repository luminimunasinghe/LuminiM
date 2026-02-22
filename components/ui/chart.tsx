'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'
import { cn } from '@/lib/utils'

// THEMES
const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = {
    [key: string]: {
        label?: React.ReactNode
        icon?: React.ComponentType
    } & (
        | { color?: string; theme?: never }
        | { color?: never; theme: Record<keyof typeof THEMES, string> }
        )
}

type ChartContextProps = {
    config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
    const context = React.useContext(ChartContext)
    if (!context) {
        throw new Error('useChart must be used within a <ChartContainer />')
    }
    return context
}

// CHART CONTAINER
const ChartContainer = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'> & {
    config: ChartConfig
    children: React.ReactNode
}
>(({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId()
    const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-chart={chartId}
                ref={ref}
                className={cn(
                    'flex aspect-video justify-center text-xs',
                    className
                )}
                {...props}
            >
                <ChartStyle id={chartId} config={config} />
                <RechartsPrimitive.ResponsiveContainer>
                    {children}
                </RechartsPrimitive.ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    )
})
ChartContainer.displayName = 'ChartContainer'

// CHART STYLE
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
    const colorConfig = Object.entries(config).filter(
        ([_, cfg]) => cfg.theme || cfg.color
    )

    if (!colorConfig.length) return null

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(
                        ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
                            .map(([key, item]) => {
                                const color =
                                    item.theme?.[theme as keyof typeof item.theme] || item.color
                                return color ? `  --color-${key}: ${color};` : null
                            })
                            .filter(Boolean)
                            .join('\n')}
}
`
                    )
                    .join('\n'),
            }}
        />
    )
}

// TOOLTIP
const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
    const { config } = useChart()

    const {
        active,
        payload,
        label,
    } = props as {
        active?: boolean
        payload?: unknown[]
        label?: unknown
    }

    if (!active || !Array.isArray(payload) || !payload.length) {
        return null
    }

    return (
        <div
            ref={ref}
            className={cn(
                'grid min-w-[8rem] gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow',
                className,
            )}
        >
            {label ? (
                <div className="font-medium">
                    {typeof label === 'string' ? label : String(label)}
                </div>
            ) : null}

            <div className="grid gap-1.5">
                {payload.map((entry: any, index: number) => {
                    const item = entry as any
                    const dataKey = item.dataKey || item.name || 'value'
                    const itemConfig = config[dataKey] || {}

                    return (
                        <div key={index} className="flex items-center gap-2">
              <span
                  className="h-2.5 w-2.5 rounded-[2px]"
                  style={{ backgroundColor: item.color || item.payload?.fill }}
              />

                            <div className="flex flex-1 justify-between">
                                <span>{itemConfig.label || item.name}</span>
                                {item.value !== undefined && (
                                    <span className="font-mono">
                    {String(item.value)}
                  </span>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
})

ChartTooltipContent.displayName = 'ChartTooltipContent'

// LEGEND
const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
    const { config } = useChart()

    const payload = (props as any).payload as unknown[]

    if (!Array.isArray(payload) || !payload.length) {
        return null
    }

    return (
        <div
            ref={ref}
            className={cn('flex items-center justify-center gap-4', className)}
        >
            {payload.map((entry: any, index: number) => {
                const item = entry as any
                const itemConfig = config[item.dataKey] || {}

                return (
                    <div key={index} className="flex items-center gap-1.5">
            <span
                className="h-2 w-2 rounded-[2px]"
                style={{ backgroundColor: item.color }}
            />
                        <span>{itemConfig.label || item.value}</span>
                    </div>
                )
            })}
        </div>
    )
})
ChartLegendContent.displayName = 'ChartLegendContent'

// EXPORTS
export {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    ChartStyle,
}
