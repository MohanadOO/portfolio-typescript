// @ts-nocheck
import { useParams } from 'react-router-dom'
import projects from '../data/projects.json'
import { AiFillGithub } from 'react-icons/ai'
import { HiExternalLink } from 'react-icons/hi'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

type SkillType = {
  name: string
  icon: string
}

export default function ProjectDetails() {
  const param = useParams()

  if (projects[param.id] === undefined) {
    return (
      <div className='h-screen mt-32 mx-5 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 px-10'>
        Project Dose not exist
      </div>
    )
  }

  const { title, mainImgURL, desc, images, skills, github, preview } =
    projects[param.id]

  const { i18n } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage

  const allSkills = skills.map((skill: SkillType) => {
    return (
      <li
        className='cursor-pointer'
        title={skill.name}
        key={`${skill.name}_key`}
      >
        <span className='text-xs sm:text-sm'>{skill.name}</span>
        <img
          className='w-4 h-4 lg:w-6 lg:h-6 bg-transparent'
          src={skill.icon}
          alt={`${skill.name}_icon`}
        />
      </li>
    )
  })

  return (
    <motion.section
      variants={sectionVariant}
      initial='initial'
      animate='animate'
      id='project'
      className='min-h-screen flex'
    >
      <div className='flex flex-col lg:flex-row md:gap-10 lg:gap-20 mx-5 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 md:px-10  lg:items-center lg:justify-between mt-28 lg:mt-0 child:flex-1'>
        <div>
          <picture>
            <source srcSet={`${mainImgURL}.webp`} type='image/webp' />
            <img
              className='aspect-video rounded-md object-cover object-top ring ring-primary-400 shadow-lg'
              src={`${mainImgURL}.png`}
              alt={`${currentLanguage === 'ar' ? title.ar : title.en}_Image`}
            />
          </picture>
          <div className='flex justify-between mt-5 gap-3'>
            {images.map((image: string, index: number) => {
              return (
                <picture key={index}>
                  <source srcSet={`${image}.webp`} type='image/webp' />
                  <img
                    className='aspect-[2/1] rounded-md object-cover object-top ring-2 ring-primary-400/40'
                    alt={index.toString()}
                    src={`${image}.png`}
                  />
                </picture>
              )
            })}
          </div>
        </div>
        <div className='flex flex-col flex-initial gap-5'>
          <h1 className='font-pattaya text-4xl lg:text-5xl xl:text-6xl text-primary-400 mt-10 lg:mt-0'>
            {currentLanguage === 'ar' ? title.ar : title.en}
          </h1>
          <ul className='w-full mb-2 flex flex-wrap gap-2 child:flex child:gap-2 child:py-1 child:px-3 child:items-center child:rounded-md child:bg-primary-black child:text-primary-white'>
            {allSkills}
          </ul>
          <p className='mt-3 text-sm md:text-base xl:text-lg leading-6 max-w-xl'>
            {currentLanguage === 'ar' ? desc.ar : desc.en}
          </p>
          <div className='flex mb-32 lg:mb-0 gap-5'>
            <a
              className='flex items-center gap-1 py-1 px-4 border-2 border-primary-400 text-primary-400 rounded-md shadow-md text-sm'
              href={github}
              target='_blank'
            >
              <span>Github</span>
              <AiFillGithub className='w-5 h-5' />
            </a>
            <a
              className='flex items-center gap-1 py-1 px-4 bg-primary-400 text-primary-white rounded-md shadow-md text-sm'
              href={preview}
              target='_blank'
            >
              <span>Preview</span>
              <HiExternalLink className='w-5 h-5' />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

const sectionVariant = {
  initial: {
    scale: 0.5,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
}
