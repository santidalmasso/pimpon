type SiteConfig = {
  name: string
  description: string
  url: string
  // ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'PimPon',
  description: 'Una aplicación para registrar tus partidos de ping pong',
  url: 'https://pimpon.vercel.app/',
  // ogImage: 'https://pimpon.vercel.app/og.jpg',
  links: {
    twitter: 'https://twitter.com/santidalmasso',
    github: 'https://github.com/santidalmasso/pimpon',
  },
}
