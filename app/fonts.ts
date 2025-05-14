import localFont from 'next/font/local'

// Primary font for headings and display text
export const degular = localFont({
  src: [
    {
      path: '../public/fonts/DegularVariable.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/DegularVariable.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/DegularVariable.ttf',
      weight: '600',
      style: 'normal',
    }
  ],
  variable: '--font-degular',
})

// Secondary font for body text
export const timesNewRoman = localFont({
  src: [
    {
      path: '../public/fonts/Times New Roman.ttf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-times',
}) 