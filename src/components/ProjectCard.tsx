// @ts-nocheck
import projects from '../data/projects.json'
import { useI18n } from '../i18n/Internationalization'
import { AiFillGithub } from 'react-icons/ai'
import { HiEye } from 'react-icons/hi'

type ProjectCardType = {
  link: string
}

type ProjectType = any

export default function ProjectCard({ link }: ProjectCardType) {
  const { translate } = useI18n()
  const { checkProject } = translate('projects')
  const { title, desc, mainImgURL, skills, preview, github } = projects[link]
  const { locale } = useI18n()

  return (
    <div>
      <div className='bg-white border-[1px] border-primary-black shadow-[7px_7px_0px_black] max-w-sm mx-auto pb-5 h-full flex flex-col'>
        <div className='overflow-hidden relative [&_a]:hover:opacity-100 [&_picture_img]:hover:scale-100 [&_picture_img]:hover:brightness-75 h-full'>
          <picture>
            <source srcSet={`${mainImgURL}.webp`} type='image/webp' />
            <img
              className='max-w-sm w-full aspect-[16/11] object-cover object-top saturate-[1.3] scale-105 transition-transform duration-300'
              src={`${mainImgURL}.png`}
              alt={`${locale === 'ar-SA' ? title.ar : title.en}_preview`}
            />
          </picture>
          <a
            href={preview}
            target='_blank'
            title={locale === 'ar-SA' ? 'عرض الصفحة' : 'Project Preview'}
            className='opacity-0 absolute top-[50%] translate-y-[-50%] left-[60%] translate-x-[-60%] z-20 bg-primary-400 p-2 rounded-full transition-opacity duration-200 cursor-pointer'
          >
            <HiEye className='w-6 h-6 fill-primary-white' />
          </a>
          <a
            href={github}
            target='_blank'
            title={locale === 'ar-SA' ? 'ملفات المشروع' : 'GitHub Repo'}
            className='opacity-0 absolute top-[50%] translate-y-[-50%] left-[40%] translate-x-[-40%] z-20 bg-primary-400 p-2 rounded-full transition-opacity duration-200 cursor-pointer'
          >
            <AiFillGithub className='w-6 h-6 fill-primary-white' />
          </a>
        </div>
        <div className='p-5 h-full'>
          <ul className='w-full flex flex-wrap mb-7 gap-3 child:flex child:gap-2 child:py-1 child:px-3  child:items-center child:rounded-md child:bg-primary-black child:text-primary-white'>
            <li>
              <span className='text-xs lg:text-sm'>{skills[0].name}</span>
              <img
                className='w-4 h-4 bg-transparent'
                src={skills[0].icon}
                alt={`${skills[0].name}_icon`}
              />
            </li>
            {skills[1] !== undefined && (
              <li>
                <span className='text-xs lg:text-sm'>{skills[1].name}</span>
                <img
                  className='w-4 h-4 bg-transparent'
                  src={skills[1].icon}
                  alt={`${skills[1].name}_icon`}
                />
              </li>
            )}
            {skills[2] !== undefined && (
              <li>
                <span className='text-xs lg:text-sm'>{skills[2].name}</span>
                <img
                  className='w-4 h-4 bg-transparent'
                  src={skills[2].icon}
                  alt={`${skills[2].name}_icon`}
                />
              </li>
            )}
          </ul>
          <h1 className='font-pattaya text-4xl mt-4 text-primary-400'>
            {locale === 'ar-SA' ? title.ar : title.en}
          </h1>
          <p className='max-w-xs w-full text-sm leading-6 mt-3 text-primary-black/80 my-10 h-24  overflow-hidden'>
            {locale === 'ar-SA' ? desc.ar : desc.en}
          </p>
          <a className='py-3 px-6 text-primary-400 rounded-md font-bold border border-primary-400 hover:bg-primary-400 hover:text-primary-white transition-colors en:hover:shadow-[-4px_4px_0_black] ar:hover:shadow-[4px_4px_0_black] active:-translate-x-4 active:translate-y-4'>
            {checkProject}
          </a>
        </div>
      </div>
    </div>
  )
}
