import urlFor from '../../utils/urlFor'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { AiOutlineWarning } from 'react-icons/ai'
import { HiOutlineBookOpen, HiOutlineLink } from 'react-icons/hi'
import CustomImage from '../CustomImage'

export function BlogList({
  posts,
  viewBtn = false,
}: {
  posts: Post[]
  viewBtn?: boolean
}) {
  const { t } = useTranslation(['blog', 'common'])
  const locale = useRouter().locale

  return (
    <div className='max-w-[90rem] mx-auto my-16'>
      <div className='grid grid-cols sm:grid-cols-2 xl:grid-cols-3 gap-5 gap-y-16 pb-24 '>
        {posts.map((post) => {
          const language =
            post.title.ar === undefined || post.description.ar === undefined
              ? 'en'
              : locale
          const title =
            post.title && post.title[language] ? post.title[language] : ''
          const desc =
            post.description && post.description[language]
              ? post.description[language]
              : ''
          const readingTime =
            locale === 'ar' ? post.readingTimeAR : post.readingTimeEN
          return (
            <Link key={post._id} href={`/blog/${post?.slug?.current}`}>
              <div className='group cursor-pointer flex rounded-lg'>
                <div className='relative w-full aspect-video shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out motion-reduce:duration-75 overflow-hidden'>
                  <CustomImage
                    className='rounded-lg scale-[0.994]'
                    src={
                      post.mainImage !== null &&
                      urlFor(post.mainImage).fit('max').url()
                    }
                    alt={
                      post.author && post.author.name
                        ? post.author.name
                        : 'Anonymous'
                    }
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className='absolute inset-0 bg-primary-white/90 dark:bg-primary-dark/90 text-primary-black dark:text-primary-white p-5 flex justify-between items-center isolate rounded-lg'>
                    <div>
                      {locale === 'ar' && language !== 'ar' ? (
                        <div className='absolute top-0 bg-orange-600 dark:bg-orange-600 text-primary-white p-2 flex justify-center items-center gap-2 text-sm'>
                          <span>الترجمة العربية غير متوفرة</span>
                          <AiOutlineWarning className='w-5 h-5' />
                        </div>
                      ) : (
                        ''
                      )}
                      {title ? (
                        <p
                          title={title}
                          className='text-primary-400 text-sm sm:text-base md:text-lg font-bold mb-1 line-clamp-2'
                        >
                          {title}
                        </p>
                      ) : (
                        <p className='text-red-400 text-sm sm:text-base md:text-lg font-bold mb-1 line-clamp-2 uppercase'>
                          Title not found
                        </p>
                      )}
                      {readingTime > 0 && (
                        <p className='flex items-center gap-2 text-xs md:text-sm font-bold opacity-90'>
                          <HiOutlineBookOpen className='w-4 h-4 md:w-5 md:h-5' />{' '}
                          <span>
                            {readingTime}{' '}
                            {locale === 'ar' ? 'دقائق للقراءة' : 'min read'}
                          </span>
                        </p>
                      )}

                      <div className='mt-3 flex-1'>
                        {desc ? (
                          <p className='opacity-90 text-xs sm:text-sm font-bold line-clamp-2'>
                            {post.description && desc}
                          </p>
                        ) : (
                          <p className='text-red-400 text-xs sm:text-sm line-clamp-2 uppercase'>
                            Description not found
                          </p>
                        )}
                      </div>
                      <div className='mt-2 gap-2'>
                        {post.publishedAt && (
                          <p className='text-xs border-black'>
                            {new Date(post.publishedAt).toLocaleDateString(
                              'en-US',
                              {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }
                            )}
                          </p>
                        )}
                        {post.categories && (
                          <div className='flex mt-2 gap-2'>
                            {post.categories.map((category) => (
                              <div
                                key={category.title}
                                className='bg-primary-400 text-center px-1 rounded-full text-[0.7rem] text-white'
                              >
                                {category.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      {viewBtn && (
        <Link
          href='/blog'
          className='flex mb-12 items-center justify-center rounded-lg w-56 mx-auto py-2 px-8 gap-2 bg-primary-400/80 hover:bg-primary-400 shadow-lg dark:shadow-primary-white/10 text-primary-white font-bold text-lg transition-colors'
        >
          {t('allPosts', { ns: 'common' })}
          <HiOutlineLink className='w-5 h-5' />
        </Link>
      )}
    </div>
  )
}
