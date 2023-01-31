import ProjectCard from '../components/Home/ProjectCard'
import { motion } from 'framer-motion'
import { IoTimerOutline } from 'react-icons/io5'
import Link from 'next/link'
import { loadTranslations } from 'ni18n'
import { ni18nConfig } from '../ni18n.config'
import { useTranslation } from 'react-i18next'
import { client } from '../sanity/sanity.client'
import { ALL_PROJECTS_QUERY } from '../sanity/queries/projects'

type ProjectType = {
  title: { en: string; ar: string }
  desc: { en: string; ar: string }
  mainImgURL: string
  images: string[]
  skills: { name: string; icon: string }[]
  github: string
  preview: string
}

export default function Projects({ projects }) {
  const { t } = useTranslation('projects')
  return (
    <motion.section
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className='md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-10 mx-auto min-h-screen flex flex-col md:flex-row items-center justify-around py-24'
      aria-labelledby='not-found'
    >
      <div className='flex flex-col items-center gap-5 xl:gap-10 max-w-xs xl:max-w-md'>
        <h1
          id='not-found'
          className='text-4xl lg:text-5xl xl:text-6xl text-center md:text-left text-primary-400 dark:text-primary-400'
        >
          Page is not available yet <IoTimerOutline className='inline' />
        </h1>
        <Link href='/'>
          <a className='md:self-start md:ar:self-end py-2 px-5 rounded-md border border-primary-400 text-primary-400 dark:text-primary-400 hover:bg-primary-400 hover:text-primary-white transition-colors xl:text-lg font-pattaya'>
            Back to Home Page
          </a>
        </Link>
      </div>
      <div>
        <img
          className='max-w-xs xl:max-w-sm'
          src='/images/InProgress.png'
          alt='Not Found Illustration'
        />
      </div>
      {/* {Object.entries(projects).map((project: [string, ProjectType]) => {
        const id = project[0]
        const info = project[1]
        return (
          <div>
            <h1>{id}</h1>
            <p>{t(`${id}.title`)}</p>
          </div>
        )
      })} */}
    </motion.section>
  )
}

const allProjectsVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.4,
    },
  },
}

export const getStaticProps = async ({ locale }) => {
  const projects = await client.fetch(ALL_PROJECTS_QUERY)
  return {
    props: {
      ...(await loadTranslations(ni18nConfig, locale, ['projects'])),
      projects,
    },
  }
}
