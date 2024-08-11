import React, { useEffect, useRef } from 'react'
import Lottie from 'react-lottie-player'

interface PaymentAnimationProps {
  onComplete?: () => void
  data?: any // Consider a more specific type based on what your 'data' prop expects.
  play?: boolean
  onLoopComplete?: () => void
  onEnterFrame?: (_frame: any) => void
  onSegmentStart?: () => void
  onLoad?: () => void
  loop?: boolean
}

export default function PaymentAnimation({
  onComplete,
  data,
  play = false,
  onLoopComplete,
  onEnterFrame,
  onSegmentStart,
  onLoad,
  loop = false,
}: PaymentAnimationProps) {
  const lottieRef = useRef(null)
  useEffect(() => {
    if (lottieRef?.current) {
      console.log(lottieRef.current.currentFrame, 'ref')
    }
  }, [])

  return (
    <Lottie
      ref={lottieRef}
      animationData={data}
      play={play}
      rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
      onComplete={onComplete}
      onLoopComplete={onLoopComplete}
      onEnterFrame={onEnterFrame}
      loop={loop}
      autoplay={false}
      onSegmentStart={onSegmentStart}
      onLoad={onLoad}
    />
  )
}
