import { useEffect, useState } from 'react';
import Comics from '~/api';
import useAppContext from '~/store/useAppContext';
import { ObjComic } from '~/types';
import ComicPage from '~/components/comicPage';

const Girl = () => {
    const [current, setCurrent] = useState<number>(1);
    const [dataComic, setDataComic] = useState<ObjComic>()
    const { setIsLoading } = useAppContext()
    const TITLE = 'Con Gái'

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const data: ObjComic = await Comics.girlComics(current)
            if (data) {
                setDataComic(data)
                setIsLoading(false)
            }
        })()
    }, [current])

    return (
        <>
            {
                dataComic &&
                <ComicPage data={dataComic} current={current} setCurrent={setCurrent} title={TITLE} />
            }
        </>
    )
}

export default Girl
