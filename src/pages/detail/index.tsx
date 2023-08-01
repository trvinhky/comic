import Template from '~/components/template'
import './index.scss'
import { Link, useParams } from 'react-router-dom'
import { Typography, Tabs, Rate } from 'antd';
import type { TabsProps } from 'antd';
import ChapterItem from './chapterItem';
import Comment from '~/components/comment';
import React, { useEffect, useState } from 'react';
import Comics from '~/api';
import { Chapter, Genre } from '~/types';
import useAppContext from '~/store/useAppContext';

const { Paragraph } = Typography;

type Detail = {
    thumbnail: string
    title: string
    id: string
    description: string
    other_names: Array<string>
    status: string
    genres: Array<Genre>
    chapters: Array<Chapter>
    followers: number
    total_views: number
    authors: string
    is_adult: boolean
    rating_count: number
    average: number
}

const Detail = () => {
    const { comic_id } = useParams()
    const [comicDetail, setComicDetail] = useState<Detail>()
    const { setIsLoading } = useAppContext()

    useEffect(() => {
        setIsLoading(true)
        const getDetailComic = async () => {
            if (comic_id) {
                const res: Detail = await Comics.comicDetail(comic_id)
                document.title = res && res.title
                setComicDetail(res)
                setIsLoading(false)
            }
        }

        getDetailComic()
    }, [comic_id])

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Danh Sách Chương`,
            children: <ChapterItem chapters={comicDetail ? comicDetail.chapters : []} comic_id={comic_id ? comic_id : ''} />,
        },
        {
            key: '2',
            label: `Bình Luận`,
            children: <Comment />,
        }
    ];

    return (
        <Template>
            {comicDetail &&
                <div className="detail">
                    <div className="detail-top">
                        <div className="detail-top__img">
                            <img src={comicDetail.thumbnail} alt={comicDetail.title} />
                            {comicDetail.is_adult && <span>18+</span>}
                        </div>
                        <div className="detail-top__info">
                            <h3 className="detail-title">{comicDetail.title}</h3>
                            {comicDetail.other_names.length > 0 &&
                                <h5 className="detail-title detail-title--sub">"{comicDetail.other_names.join(' - ')}"</h5>
                            }
                            <div className="detail-star">
                                <Rate allowHalf disabled defaultValue={comicDetail.average} /> <span className='detail-star__count'>{comicDetail.rating_count.toLocaleString('vi')} lượt đánh giá</span>
                            </div>
                            <div className="detail-group">
                                <span className="detail-group__intro">
                                    <i className="fa-solid fa-eye"></i>{comicDetail.total_views.toLocaleString('vi')} lượt xem
                                </span>
                                <span className="detail-group__intro">
                                    <i className="fa-solid fa-heart"></i>{comicDetail.followers.toLocaleString('vi')} lượt thích
                                </span>
                                <span className="detail-group__intro">
                                    <i className="fa-solid fa-book-open"></i>{comicDetail.chapters.length.toLocaleString('vi')} chương
                                </span>
                            </div>
                            <div className="detail-text">
                                <span>Tác giả: </span>{comicDetail.authors.toLowerCase() === 'updating' ? 'Đang cập nhật' : comicDetail.authors}
                            </div>
                            <div className="detail-text">
                                <span>Tình trạng: </span>{comicDetail.status}
                            </div>
                            <div className="detail-text">
                                <span>Thể loại: </span>
                                {comicDetail.genres.map((el, i) => (
                                    i === 0 ? <Link to="/" key={el.id}>{el.name}</Link>
                                        : (
                                            <React.Fragment key={el.id}> - <Link to="/">{el.name}</Link></React.Fragment>
                                        )
                                ))}
                            </div>
                            <div className="detail-wrapper">
                                <button className="detail-btn detail-btn--watch">
                                    Đọc ngay
                                </button>
                                <button className="detail-btn">
                                    Đoc tiếp
                                </button>
                                <button className="detail-btn">
                                    Chương mới nhất
                                </button>
                                <button className="detail-btn detail-btn--follow">
                                    <i className="fa-solid fa-heart"></i>Theo dõi
                                </button>
                            </div>
                            <Paragraph
                                ellipsis={{ rows: 5, expandable: true, symbol: 'Xem Thêm' }}
                                className='detail-desc'
                            >
                                <span className='detail-desc__title'>Mô tả: </span>{comicDetail.description}
                            </Paragraph>
                        </div>
                    </div>
                    <Tabs className='detail-bottom' defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
            }
        </Template>
    )
}

export default Detail
