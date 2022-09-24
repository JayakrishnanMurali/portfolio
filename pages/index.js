import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import ProjectList from '@/components/projectlist'
import WritingList from '@/components/writinglist'
import { getAllPostsForHome, getAllProjectsForHome } from '@/lib/api'
import { HOME_OG_IMAGE_URL } from '@/lib/constants'
import Layout from '@/components/layout'
export default function Index({ allPosts, allWork }) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null
  const mailSvgIcon = `https://s2.svgbox.net/hero-solid.svg?ic=mail&color=${
    theme === 'light' ? '000' : 'fff'
  }`

  function darkModeLinkStyleTag(linkText, link) {
    return (
      <a
        className={`cursor-pointer hover:opacity-70 font-medium transition duration-300 ${
          theme === 'dark' ? 'link-styling-dark' : 'link-styling'
        }`}
        href={link}
        rel="noopener"
        target="_blank"
      >
        {linkText}
      </a>
    )
  }
  return (
    <>
      <Layout>
        <Head>
          <meta property="twitter:card" content="summary_large_image"></meta>
          <meta property="twitter:site" content="@jkay_dev"></meta>
          <meta
            property="twitter:title"
            content="Jayakrishnan portfolio"
          ></meta>
          <meta property="twitter:url" content="http://localhost:3000/" />
          {/*  change later*/}
          <meta
            property="twitter:description"
            content="Selected Work and Writings by Jayakrishnan M"
          ></meta>
          <meta property="twitter:image" content={HOME_OG_IMAGE_URL}></meta>
          <meta property="og:image" content={HOME_OG_IMAGE_URL}></meta>
          <meta
            property="og:description"
            content="Selected Work and Writings by Jayakrishnan M"
          ></meta>
          <meta
            name="description"
            content="Selected Work and Writings by Jayakrishnan M"
          ></meta>
          <title>Jayakrishnan M</title>
          <meta property="og:title" content="Jayakrishnan M"></meta>
        </Head>
        <div className="mt-6 mb-12 lg:mt-24">
          <p className="mb-12 text-3xl font-semibold text-left text-black md:text-4xl lg:text-6xl dark:text-white">
            Hey, I'm Jayakrishnan M.
          </p>{' '}
          <p className="mt-8 text-xl font-normal text-left text-black md:text-xl lg:text-xl dark:text-white">
            I'm a software development engineer who loves building tools for
            productivity. Currently working as a full-stack developer at{' '}
            {darkModeLinkStyleTag('NeoITO', 'https://neoito.com/')}.
            <br />
            <br />I spend most of my free time watching movies, tv shows or
            animes. I have a dog, love talking about football, a huge fan of{' '}
            {darkModeLinkStyleTag(
              'Manchester United',
              'https://www.manutd.com/',
            )}{' '}
            and a lifelong stan of the{' '}
            {darkModeLinkStyleTag(
              'Cristiano Ronaldo',
              'https://www.instagram.com/cristiano/?hl=en',
            )}{' '}
            .
          </p>
          <div className="flex mt-2">
            <Link href="/about" passHref={true}>
              <button className="px-4 py-2 mt-4 mr-4 font-normal text-white transition duration-300 transform bg-black border-2 border-black cursor-pointer dark:bg-white dark:border-white dark:text-black rounded-xl hover:opacity-80">
                Know More
              </button>
            </Link>

            <Link href="mailto:jayakrishnan1012@gmail.com" passHref={true}>
              <button className="flex items-center px-4 py-2 mt-4 text-black transition duration-300 transform border-2 border-black cursor-pointer dark:border-white dark:text-white rounded-xl hover:opacity-70">
                <div className="pr-2">
                  <img
                    src={mailSvgIcon}
                    width="22"
                    height="22"
                    alt="twitter logo"
                  />
                </div>
                <div className="font-normal"> Say hello</div>
              </button>
            </Link>
          </div>
        </div>
        <div class="flex flex-col md:flex-row items-center p-4 border-gray-200 dark:border-white border-2 rounded-xl mt-24 md:mt-36 lg:mt-48">
          <div>
            <p class="font-semibold">New extension!</p>
            <p>
              Work in progress. In the meantime please have a look at some of my
              dev blogs.{' '}
            </p>
          </div>
          <div class="mt-4 md:mt-0 md:ml-12 cursor-pointer flex items-center">
            <Link
              title="Install Pie for Pi-hole Raycast Extension"
              href="/writings"
            >
              <Image
                width={256}
                height={64}
                src="/images/install_button@2x.png"
                layout="fixed"
              />
            </Link>
          </div>
        </div>
        <div className="mt-16">
          <div className="home-page-title">Selected works</div>
          <div>
            <a
              target="_blank"
              href="https://glado8.notion.site/Designing-a-Marketplace-for-Notion-8ba5abea314e4620800d282762fcb024"
            >
              <div className="mb-12 group">
                <div className="overflow-hidden duration-500 transform cursor-pointer group-hover:shadow-xl hover:scale-100 rounded-xl">
                  <Image
                    src="/images/notion-marketplace.png"
                    alt="Cover image for playground section"
                    width={1600}
                    height={900}
                    layout="responsive"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="mb-2 text-lg font-semibold leading-snug text-black group-hover:underline lg:text-xl dark:text-white">
                    Designing a Marketplace for Notion
                  </h3>
                  <p className="mb-2 text-base font-normal leading-snug text-black cursor-pointer lg:text-lg dark:text-white">
                    A case study on how would one go about building a
                    marketplace for Notion, made in Notion! Created as part of
                    Atlan's design assignment.
                  </p>
                </div>
              </div>
            </a>
          </div>
          <ProjectList posts={allWork} />
        </div>

        <div className="mt-24 lg:mt-36">
          <div className="home-page-title">Selected Writings</div>
          <WritingList posts={allPosts} />
          <Link href="/writings" passHref={true}>
            <button className="mt-4 text-black underline cursor-pointer dark:text-white">
              Read More
            </button>
          </Link>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview }) {
  // const allPosts = await getAllPostsForHome(preview)
  // const allWork = await getAllProjectsForHome(preview)
  const allPosts = []
  const allWork = []
  return {
    props: { allPosts, allWork },
  }
}
