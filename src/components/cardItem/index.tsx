import { Typography } from "antd"
import './index.scss'
import { Link } from "react-router-dom"
import { ListComic } from "~/types"

const { Paragraph } = Typography

const CardItem = (props: ListComic) => {

    return (
        <Link className="card-item" to={`/detail/${props.id}`} title={props.title}>
            <img src={props.thumbnail} alt={props.title} />
            <h5 className="card-item__title">
                <Paragraph
                    ellipsis={{ rows: 1, expandable: false }}
                    className="card-item__text"
                    style={{ marginBottom: '6px' }}
                >
                    {props.title}
                </Paragraph>
            </h5>

        </Link>
    )
}

export default CardItem
