import { HTMLProps, memo } from 'react'

export interface CanvasProps
  extends Pick<HTMLProps<HTMLCanvasElement>, 'id' | 'className' | 'width' | 'height' | 'style'> {}

function Canvas({ ...canvasProps }: CanvasProps) {
  return <canvas {...canvasProps} />
}

export default memo(Canvas)
