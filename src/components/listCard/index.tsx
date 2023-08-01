import { Col, Row } from 'antd'
import Card from '../card'
import './index.scss'
import { DataComic } from '~/types'

type Data = {
    data: Array<DataComic>
}

const ListCard = (props: Data) => {

    return (
        <div className='list'>
            <Row gutter={[16, 16]}>
                {
                    props.data && props.data.map((el) => (
                        <Col span={4} key={el.id}>
                            <Card id={el.id} thumbnail={el.thumbnail} title={el.title} short_description={el.short_description} />
                        </Col>
                    ))
                }

            </Row>
        </div>
    )
}

export default ListCard
