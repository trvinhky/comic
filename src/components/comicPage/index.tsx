import Template from '~/components/template'
import './index.scss'
import { useEffect } from 'react';
import { ObjComic } from '~/types';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import Center from './../../components/center/index';
import Title from '~/components/title';
import ListCard from '~/components/listCard';

type Data = {
    data: ObjComic
    title: string
    current: number
    setCurrent: React.Dispatch<React.SetStateAction<number>>
    description?: string
}

const ComicPage = (props: Data) => {

    useEffect(() => {
        document.title = props.title
    }, [props.title])

    const handleChangePage: PaginationProps['onChange'] = (page) => {
        props.setCurrent(page);
    };

    return (
        <Template>
            <div className="comic-page">
                <div className="comic-page__content">
                    <Title title={props.title} />
                    {props.description &&
                        <p className="comic-page__desc">{props.description}</p>
                    }
                    {
                        props.data.comics &&
                        <ListCard data={props.data.comics} />
                    }
                </div>
                <Center>
                    <Pagination
                        defaultCurrent={1}
                        current={props.current}
                        total={props.data.total_pages && props.data.total_pages * 10}
                        onChange={handleChangePage}
                        simple
                    />
                </Center>
            </div>
        </Template>
    )
}

export default ComicPage

