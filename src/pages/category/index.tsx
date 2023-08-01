import { useEffect, useState } from 'react';
import Comics from '~/api';
import useAppContext from '~/store/useAppContext';
import { Category, ObjComic } from '~/types';
import ComicPage from '~/components/comicPage';
import { useParams } from 'react-router';

const CategoryPage = () => {
    const [current, setCurrent] = useState<number>(1);
    const [dataComic, setDataComic] = useState<ObjComic>()
    const { setIsLoading } = useAppContext()
    const { genre_id } = useParams()
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            if (genre_id) {
                const data: ObjComic = await Comics.comicByGenres(genre_id)
                if (data) {
                    setDataComic(data)
                    setIsLoading(false)
                }
            }
        })();
        (async () => {
            const res: Category[] = await Comics.genres()
            if (res.length > 0) {
                const categoryCurrent = res.find((el) => el.id === genre_id)
                if (categoryCurrent) {
                    setTitle('Thể Loại: ' + categoryCurrent.name)
                    setDescription(categoryCurrent.description)
                }
            }
            setIsLoading(false)
        })()
    }, [genre_id])

    return (
        <>
            {
                dataComic &&
                <ComicPage data={dataComic} current={current} setCurrent={setCurrent} title={title} description={description} />
            }
        </>
    )
}

export default CategoryPage
