import './index.scss'
import { useEffect } from 'react';
import { useState } from 'react';
import Comics from '~/api';
import useAppContext from '~/store/useAppContext';

type ComicChapter = {
    comic_id: string
    chapter_id: number
}

type Title = {
    title: string
}

type Imge = {
    src: string
    backup_url_1: string
    backup_url_2: string
    page: number
}

type ChapterComic = {
    chapter_name: string
    images: Array<Imge>
}

const ChapterContent = (props: ComicChapter) => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<Array<Imge>>([])
    const [chapterName, setChapterName] = useState<string>('')
    const [serverActive, setServerActive] = useState<number>(0)
    const { setIsLoading } = useAppContext()

    useEffect(() => {
        setIsLoading(true)
        const getComicTitle = async () => {
            if (props.comic_id) {
                const res: Title = await Comics.comicDetail(props.comic_id)
                if (res) {
                    setTitle(res.title)
                    setIsLoading(false)
                }
            }
        }

        const getComicContent = async () => {
            if (props.comic_id && props.chapter_id) {
                const res: ChapterComic = await Comics.singleChapter(props.comic_id, props.chapter_id)
                if (res) {
                    setContent(res.images)
                    setChapterName(res.chapter_name)
                    setIsLoading(false)
                }
            }
        }

        getComicTitle()
        getComicContent()
    }, [props.comic_id, props.chapter_id])

    const handleChangeServer = (serverNumber: number) => {
        setServerActive(serverNumber)
    }

    return (
        <div className='chapter-content'>
            <h3 className="chapter-content__title">
                {title}
            </h3>
            <div className="chapter-content__group">
                <span>{chapterName}</span>
                <span>Cập nhật lúc: ai biết lúc nào</span>
            </div>
            <div className="chapter-content__wrapper">
                <button className={
                    'chapter-content__btn' +
                    (serverActive === 0
                        ? 'chapter-content__btn--active' : '')
                }
                    onClick={() => handleChangeServer(0)}
                >
                    Server 1
                </button>
                <button className={
                    'chapter-content__btn' +
                    (serverActive === 1
                        ? 'chapter-content__btn--active' : '')
                }
                    onClick={() => handleChangeServer(1)}
                >
                    Server 2
                </button>
                <button className={
                    'chapter-content__btn ' +
                    (serverActive === 2
                        ? 'chapter-content__btn--active' : '')
                }
                    onClick={() => handleChangeServer(2)}
                >
                    Server PROMAX
                </button>
            </div>
            <div className="chapter-content__images">
                {
                    content.length > 0 && content.map((el) => (
                        <img src={serverActive === 0 ? el.src : (serverActive === 1 ? el.backup_url_1 : el.backup_url_2)} alt={el.page + ''} key={el.page} />
                    ))
                }
            </div>
        </div>
    )
}

export default ChapterContent
