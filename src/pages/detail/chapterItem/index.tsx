import { Link } from 'react-router-dom'
import './index.scss'
import { Chapter } from '~/types'

type ListChapter = {
    chapters: Array<Chapter>
    comic_id: string
}

const ChapterItem = (props: ListChapter) => {

    return (
        <ul className='chapter-item'>
            {
                props.chapters && props.chapters.map((el) => (
                    <Link className="chapter-item__list" to={`/detail/${props.comic_id}/chapter/${el.id}`} key={el.id}>
                        <span>{el.name}</span>
                        <div className="chapter-item__icon">
                            <span>
                                <i className="fa-solid fa-eye"></i> ai biết
                            </span>
                            <span>
                                <i className="fa-solid fa-clock-rotate-left"></i> {el.updated_at || 'đoán xem'}
                            </span>
                        </div>
                    </Link>
                ))
            }
        </ul>
    )
}

export default ChapterItem
