import axios from "axios";
import { Status, Top, Type } from "~/types";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

class ComicsAPI {

    private async callAPI(url: string) {
        try {
            const res = await axios.get(url)
            return res.status === 200 && res.data
        } catch (e) {
            console.log(e)
        }
    }

    // lỗi - 27/7/2023
    public async trending(page: number = 1) {
        return await this.callAPI(`/trending?page=${page}`)
    }

    public async genres() {
        return await this.callAPI('/genres')
    }

    public async comicByGenres(genre_id: string) {
        return await this.callAPI(`/genres/${genre_id}`)
    }

    public async search(page: number = 1, query: string) {
        return await this.callAPI(`/search?q=${query}&page=${page}`)
    }

    public async searchSuggest(query: string) {
        return await this.callAPI(`/search?q=${query}`)
    }

    public async recommendComics(type: Type = 'hot') {
        return await this.callAPI(`/recommend-comics?type=${type}`)
    }

    public async newComics(page: number = 1, status: Status = 'all') {
        return await this.callAPI(`/new-comics?page=${page}&status=${status}`)
    }

    public async boyComics(page: number = 1) {
        return await this.callAPI(`/boy-comics?page=${page}`)
    }

    public async girlComics(page: number = 1) {
        return await this.callAPI(`/girl-comics?page=${page}`)
    }

    public async completedComics(page: number = 1) {
        return await this.callAPI(`/completed-comics?page=${page}`)
    }

    public async recentUpdateComics(page: number = 1) {
        return await this.callAPI(`/recent-update-comics?page=${page}`)
    }

    public async comicDetail(comic_id: string) {
        return await this.callAPI(`/comics/${comic_id}`)
    }

    public async comicChapters(comic_id: string) {
        return await this.callAPI(`/comics/${comic_id}/chapters`)
    }

    public async comicByAuthor(author_name: string) {
        return await this.callAPI(`/comics/authors/${author_name}`)
    }

    public async singleChapter(comic_id: string, chapter_id: number) {
        return await this.callAPI(`/comics/${comic_id}/chapters/${chapter_id}`)
    }

    public async comments(page: number = 1, comic_id: string, chapter_id: number) {
        return await this.callAPI(`/comics/${comic_id}/comments?page=${page}&chapter=${chapter_id}`)
    }

    public async topComics(type: Top = 'all', page: number = 1, status: Status = 'all') {
        if (type === 'new') {
            return await this.newComics(page, status)
        }

        if (type === 'update') {
            return await this.recentUpdateComics(page)
        }

        let url = '/top'
        if (type !== 'all') {
            url += `/${type}`
        }
        url += `?page=${page}&status=${status}`
        return await this.callAPI(url)
    }
}

const Comics = new ComicsAPI()

export default Comics
