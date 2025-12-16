export type StrapiImage = {
  id: number
  url: string
  alternativeText: string | null
}

export type Homepage = {
  id: number
  heroTitle: string
  heroSubtitle: string
  projectsSectionTitle: string
  skillsSectionTitle: string
  linkedinButtonLabel: string
  linkedinUrl: string
  Links: {
    id: number
    label: string
    url: string
    newTab: boolean
  }[]
  heroImage: {
    id: number
    url: string
    alternativeText: string | null
  } | null
  services?: Service[]
}

export type Skill = {
  id: number
  name: string
  order: number
  icon: StrapiImage | null
  role: string
}

export type Project = {
  id: number
  title: string
  slug: string
  shortDescription: string
  description: string
  projectUrl: string | null
  projectUrlBefore: string | null
  role: string
  order: number
  skills?: Skill[] 
  thumbnail: StrapiImage | null
}

export type Service = {
  id: number
  documentId: string
  icon: StrapiImage | null
  title: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  order: number
}