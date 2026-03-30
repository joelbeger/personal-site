export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()

  const staticPages = [
    { loc: '/' },
    { loc: '/about' },
    { loc: '/projects' },
    { loc: '/services' },
    { loc: '/contact' },
  ]

  try {
    const { data } = await $fetch<{ data: any[] }>(`${config.public.strapiUrl}/api/projects`)

    const projectPages = data.map((project) => ({
      loc: `/projects/${project.slug}`,
      lastmod: project.updatedAt,
    }))

    return [...staticPages, ...projectPages]
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
    return staticPages
  }
})
