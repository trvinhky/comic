import Template from '~/components/template'
import './index.scss'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Comment from '~/components/comment';
import ChapterContent from './chapterContent';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Chapter } from '~/types';
import useAppContext from '~/store/useAppContext';
import { useEffect } from 'react';
import Comics from '~/api';

const Chapter = () => {
    const params = useParams()
    const [nextChapter, setNextChapter] = useState<Chapter>()
    const [prevChapter, setPrevChapter] = useState<Chapter>()
    const [follow, setFollow] = useState<boolean>(false)
    const { setIsLoading } = useAppContext()

    const onChange = (key: string) => {
        console.log(key);
    };

    const handleFollow = () => {
        setFollow(!follow)
    }

    useEffect(() => {
        setIsLoading(true)

        const getListChapters = async () => {
            if (params.comic_id) {
                const res: Array<Chapter> = await Comics.comicChapters(params.comic_id)
                const len = res.length
                if (len > 0 && params.chapter_id) {
                    const chapter_id = +(params.chapter_id)
                    const cur = res.findIndex((el) => el.id === chapter_id)
                    if (cur >= 0) {
                        const next = cur - 1
                        const prev = cur + 1
                        if (next >= 0) setNextChapter(res[next])
                        if (prev < len) setPrevChapter(res[prev])
                        setIsLoading(false)
                    }
                }
            }
        }

        getListChapters()
    }, [params.comic_id, params.chapter_id])

    const tabs: TabsProps['items'] = [
        {
            key: '1',
            label: `Chương 1`,
            children: <ChapterContent comic_id={params.comic_id ? params.comic_id : ''} chapter_id={params.chapter_id ? +params.chapter_id : 0} />,
        },
        {
            key: '2',
            label: `Bình Luận`,
            children: <Comment />,
        }
    ];

    return (
        <Template>
            <div className="chapter">
                <Tabs defaultActiveKey="1" items={tabs} onChange={onChange} />
            </div>
            <div className="chapter-navbar">
                {
                    prevChapter &&

                    <Link to={`/detail/${params.comic_id}/chapter/${prevChapter.id}`} className="chapter-navbar__btn">
                        <i className="fa-solid fa-caret-left"></i>
                    </Link>
                }
                <button
                    className="chapter-navbar__btn"
                    onClick={handleFollow}
                >
                    {
                        follow ?
                            <i className="fa-solid fa-heart"></i> :
                            <i className="fa-regular fa-heart"></i>
                    }
                </button>
                {
                    nextChapter &&
                    <Link to={`/detail/${params.comic_id}/chapter/${nextChapter.id}`} className="chapter-navbar__btn">
                        <i className="fa-solid fa-caret-right"></i>
                    </Link>
                }
            </div>
        </Template>
    )
}

export default Chapter
