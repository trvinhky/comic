export type ListComic = {
    thumbnail: string
    title: string
    id: string
}

export type DataComic = {
    thumbnail: string
    title: string
    id: string
    short_description: string
}

export type Genre = {
    id: string
    name: string
}

export type ObjComic = {
    comics: Array<DataComic>
    total_pages: number
    current_page: number
}

export type Chapter = {
    id: number
    name: string
    updated_at: string
}

export type Category = {
    id: string
    name: string
    description: string
}

export type Status = 'all' | 'completed' | 'updating';
export type Type = 'hot' | 'boy' | 'girl'

export type Top = 'all' | 'daily' | 'weekly' | 'monthly' | 'follow' | 'comment' | 'update' | 'new'