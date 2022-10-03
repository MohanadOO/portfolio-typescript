import Header from './Header'
import AboutMe from './AboutMe'
import Skills from './Skills'
import Projects from './Projects'

import { useRouter } from 'next/router'

export default function HomeLayout() {
  const router = useRouter()
  const locale = router.locale
  return (
    <main>
      <div className='md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-10'>
        <Header />
        <AboutMe locale={locale} />
        <Skills />
      </div>
      <Projects locale={locale} />
    </main>
  )
}
