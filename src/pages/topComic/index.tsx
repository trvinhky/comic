import { useEffect, useState } from 'react';
import Comics from '~/api';
import useAppContext from '~/store/useAppContext';
import { ObjComic, Status } from '~/types';
import { useParams } from 'react-router';
import { TOPCOMIC } from '~/const';
import ComicStatus from '~/components/comicStatus';

const TopComic = () => {
    const [current, setCurrent] = useState<number>(1);
    const [dataComic, setDataComic] = useState<ObjComic>()
    const { setIsLoading } = useAppContext()
    const { type_index } = useParams()
    const [title, setTitle] = useState<string>('')
    const [statusComic, setStatusComic] = useState<Status>('all')

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            if (type_index) {
                const top = TOPCOMIC.find((val) => val.id === +type_index)
                if (top) {
                    setTitle(top.name)
                    const data: ObjComic = await Comics.topComics(top.key, current, statusComic)
                    if (data) {
                        setDataComic(data)
                        setIsLoading(false)
                    }
                }
            }
        })()
    }, [type_index, statusComic])

    return (
        <>
            {
                dataComic &&
                <ComicStatus
                    statusComic={statusComic}
                    setStatusComic={setStatusComic}
                    data={dataComic}
                    current={current}
                    setCurrent={setCurrent}
                    title={title}
                />
            }
        </>
    )
}

export default TopComic
