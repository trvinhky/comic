import { Tooltip, Typography } from 'antd'
import './index.scss'
import { Link } from 'react-router-dom'
import { DataComic } from '~/types'

const { Paragraph } = Typography

const Card = (props: DataComic) => {

    return (
        <div className='card'>
            <div className="card-top">
                <img src={props.thumbnail} alt={props.title} />
                {/* <span className="card-top__icon">
                    <i className="fa-solid fa-fire"></i>
                </span> */}
            </div>
            <div className="card-bottom">
                <Paragraph
                    ellipsis={{ rows: 1, expandable: false }}
                    className="card-bottom__title"
                    style={{ marginBottom: '8px' }}
                >
                    {props.title}
                </Paragraph>
            </div>
            <Tooltip title={props.short_description}>
                <Link className='card-link' to={`/detail/${props.id}`}></Link>
            </Tooltip>
        </div>
    )
}

export default Card
