import Template from '~/components/template'
import './index.scss'
import { useEffect } from 'react';
import { ObjComic, Status } from '~/types';
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
    statusComic: Status
    setStatusComic: React.Dispatch<React.SetStateAction<Status>>
}

const ComicStatus = (props: Data) => {

    useEffect(() => {
        document.title = props.title
    }, [props.title])

    const handleChangePage: PaginationProps['onChange'] = (page) => {
        props.setCurrent(page);
    };

    const handleChangeStatus = (status: Status) => {
        props.setStatusComic(status)
    }

    return (
        <Template>
            <div className="comic-page">
                <div className="comic-page__content">
                    <Title title={props.title} />
                    <Center>
                        <div className="comic-page__choose">
                            <button
                                className={
                                    "comic-page__btn" +
                                    (props.statusComic === 'all' ? ' active' : '')
                                }
                                onClick={() => handleChangeStatus('all')}
                            >
                                Tất cả
                            </button>
                            <button
                                className={
                                    "comic-page__btn" +
                                    (props.statusComic === 'completed' ? ' active' : '')
                                }
                                onClick={() => handleChangeStatus('completed')}
                            >
                                Hoàn thành
                            </button>
                            <button
                                className={
                                    "comic-page__btn" +
                                    (props.statusComic === 'updating' ? ' active' : '')
                                }
                                onClick={() => handleChangeStatus('updating')}
                            >
                                Đang tiến hành
                            </button>
                        </div>
                    </Center>
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

export default ComicStatus

