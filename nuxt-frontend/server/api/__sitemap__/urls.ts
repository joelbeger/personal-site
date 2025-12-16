export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  
  try {
    const { data } = await $fetch<{ data: any[] }>(`${config.public.strapiUrl}/api/projects`)
    
    return data.map((project) => ({
      loc: `/projects/${project.slug}`,
      lastmod: project.updatedAt,
    }))
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
    return []
  }
})