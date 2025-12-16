export const useSeo = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.siteUrl || 'https://joelbeger.com' // Add your domain

  const setPageSeo = (options: {
    title: string
    description: string
    image?: string
    path?: string
  }) => {
    const { title, description, image, path = '' } = options
    const fullTitle = title.includes('Joel Beger') ? title : `${title} | Joel Beger`
    const url = `${baseUrl}${path}`
    const ogImage = image || `${baseUrl}/og-image.png` // Create a default OG image

    useSeoMeta({
      title: fullTitle,
      description,
      ogTitle: fullTitle,
      ogDescription: description,
      ogImage,
      ogUrl: url,
      twitterCard: 'summary_large_image',
      twitterTitle: fullTitle,
      twitterDescription: description,
      twitterImage: ogImage,
    })

    useHead({
      link: [
        { rel: 'canonical', href: url }
      ]
    })
  }

  return { setPageSeo }
}