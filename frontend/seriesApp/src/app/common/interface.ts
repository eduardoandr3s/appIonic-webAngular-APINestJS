
export interface ApiResponseSeries {
  status: string
  data: Serie[]
}

export interface ApiResponseSerie {
  status: string
  data: Serie
}

export interface ApiResponseCategories {
  status: string
  data: Category[]
}

export interface ApiResponseMessage {
  status: string
  message: string
}

export interface Serie {
  _id: string
  title: string
  images: string[]
  categories: Category[]
  numberOfEpisodes: number
  releaseDate: Date
  synopsis: string
  punctuation?: Punctuation[]
}

export interface Category {
  category: string
  image: string
  _id: string
}

export interface Punctuation {
  email: string
  punctuationNumber: number
}
