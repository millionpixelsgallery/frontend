import { CSSProperties, memo, useEffect, useState } from 'react'
import { TimerSC, TimerSCProps } from './styled'
import { DateTime, Duration } from 'luxon'
import Area from 'components/ui/Area'
import Text from 'components/ui/Text'
import theme from 'lib/theme'

const timeLeftToEnd = (end: DateTime) => {
  const diff = end.diff(DateTime.utc())
  const isEndOccurred = diff.milliseconds <= 0
  return !isEndOccurred
    ? end.diffNow(['years', 'months', 'days', 'hours', 'minutes', 'seconds'])
    : Duration.fromObject({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })
}

const getTimeLeftString = (duration: Duration) => {
  return duration.toFormat('dd:hh:mm:ss')
}

export interface TimerProps extends TimerSCProps {
  name: string
  end: DateTime
  nameColor?: string
  color?: string
  borderColor?: string
  className?: string
  style?: CSSProperties
}

function Timer({
  name,
  end,
  nameColor,
  color,
  borderColor,
  className,
  style,
  ...rest
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeLeftToEnd(end))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeLeftToEnd(end))
    }, 1000)
    if (end.diffNow().milliseconds <= 0) clearInterval(interval)
    return () => clearInterval(interval)
  })

  return (
    <TimerSC className={className} style={style} {...rest}>
      <Area
        name={
          <Text type='S' color={nameColor ?? color ?? theme.color.timer.name}>
            {name}
          </Text>
        }
      >
        <Text
          color={color ?? theme.color.timer.name}
          size={22}
          lineHeight={32}
          letterSpacing={0.44}
          weight={600}
        >
          {getTimeLeftString(timeLeft)}
        </Text>
      </Area>
    </TimerSC>
  )
}

export default memo(Timer)
