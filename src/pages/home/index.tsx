import Template from '~/components/template'
import './index.scss'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Pagination as Pg } from 'antd';
import type { PaginationProps } from 'antd';
import CardItem from '~/components/cardItem';
import ListCard from '~/components/listCard';
import Title from '~/components/title';
import Center from '~/components/center';
import Comic from '~/api';
import { DataComic, ListComic, ObjComic } from '~/types';
import useAppContext from '~/store/useAppContext';

const Home = () => {
  const [current, setCurrent] = useState<number>(1);
  const [slideData, setSlideData] = useState<Array<ListComic>>([])
  const [comics, setComics] = useState<Array<DataComic>>([])
  const [total, setTotal] = useState<number>(1)
  const { setIsLoading } = useAppContext()

  useEffect(() => {
    document.title = 'Trang Chủ'
    setIsLoading(true)

    const getRecommendComics = async () => {
      const data = await Comic.recommendComics()
      setSlideData(data)
      setIsLoading(false)
    }
    getRecommendComics()
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const getNewComics = async () => {
      const data: ObjComic = await Comic.newComics(current)
      if (data) {
        setComics(data.comics)
        setTotal(data.total_pages)
        setCurrent(data.current_page)
        setIsLoading(false)
      }
    }

    getNewComics()
  }, [current])

  const handleChangePage: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };

  return (
    <Template>
      <div className="home">
        <div className="slide">
          <Swiper
            grabCursor={true}
            slidesPerView={5}
            spaceBetween={20}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            pagination={false}
            modules={[Autoplay, Pagination]}
          >
            {
              slideData && slideData.map((el) => (
                <SwiperSlide key={el.id} style={{ height: 'auto' }}>
                  <CardItem id={el.id} thumbnail={el.thumbnail} title={el.title} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        <div className="home-content">
          <Title title='Truyên Mới' />
          <ListCard data={comics} />
        </div>
        <Center>
          <Pg
            defaultCurrent={1}
            current={current}
            total={total * 10}
            onChange={handleChangePage}
            simple
          />
        </Center>
      </div>
    </Template>
  )
}

export default Home