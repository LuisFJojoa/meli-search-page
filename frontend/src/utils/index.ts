export const formattedDecimal = (decimalPart: number) => {
  const formattedDecimal = decimalPart === 0 ? '00' : decimalPart.toString().padStart(2, '0');
  return formattedDecimal;
};

export const formattedNumberWithUnits = (number: number): string => {
  return new Intl.NumberFormat('en-US').format(number);
};

export const moveScrollTo = (toTop: boolean = true) => {
  return new Promise<void>((resolve) => {
    document.body.style.overflow = 'auto'

    const startY = window.scrollY
    const targetY = toTop
      ? parseInt(
        document.body.style.getPropertyValue('--scroll-y') || '0',
        10
      )
      : document.body.scrollHeight - window.innerHeight
    const distance = targetY - startY
    const duration = 500

    let startTime: number | null = null

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime

      const progress = currentTime - startTime
      const easeInOutQuad = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

      window.scrollTo(
        0,
        startY +
        distance * easeInOutQuad(Math.min(1, progress / duration))
      )

      if (progress < duration) {
        window.requestAnimationFrame(animateScroll)
      } else {
        resolve()
      }
    }

    window.requestAnimationFrame(animateScroll)
  })
}