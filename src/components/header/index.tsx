import { Modal } from "antd"
import Logo from "../logo"
import './index.scss'
import React, { useState } from "react"
import useAppContext from "~/store/useAppContext"
import { Link, useNavigate } from "react-router-dom"
import Comics from "~/api"
import { Genre } from "~/types"

type headerProps = {
  size?: string
}

type Comic = {
  thumbnail: string
  title: string
  id: string
  genres: Genre[]
}

const Header = (props: headerProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setUser, user } = useAppContext()
  const [search, setSearch] = useState<string>('')
  const [comicData, setComicData] = useState<Array<Comic>>([])
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    setIsModalOpen(false)
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setTimeout(async () => {
      const res = await Comics.searchSuggest(e.target.value)
      if (res) {
        setComicData(res.comics)
      }
    }, 2000)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/search/${search}`)
  }

  return (
    <header className="header">
      <div className="container header-group">
        <Logo size={props.size} />
        <form method="GET" className="search" onSubmit={handleSearch}>
          <input
            type="search"
            className="search-input"
            value={search}
            onChange={handleChangeInput}
            placeholder="Nhập từ khóa tìm kiếm..."
          />
          <button type="submit" className="btn-search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          {
            comicData.length > 0 &&
            <div className="search-result">
              {
                comicData.map((val) => (
                  <Link key={val.id} to={`/detail/${val.id}`} className="search-result__comic">
                    <img src={val.thumbnail} alt={val.title} />
                    <div className="search-result__text">
                      <h4>{val.title}</h4>
                      {val.genres.length > 0 && val.genres.map((el, i) => (
                        <React.Fragment key={el.id + val.id}>
                          <span>{el.name}{i < val.genres.length - 1 && ', '}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </Link>
                ))
              }
            </div>
          }
        </form>
        <div className="group-header">
          {
            !user ?
              (
                <>
                  <Link to="/login" className="header-btn">Đăng Nhập</Link>
                  <Link to="/login" className="header-btn">Đăng Ký</Link>
                </>
              ) :
              <button className="header-btn" onClick={() => setIsModalOpen(true)}>
                Đăng Xuất
              </button>
          }
        </div>
      </div>
      <Modal
        title="Đăng Xuất"
        open={isModalOpen}
        onOk={handleLogout}
        onCancel={() => setIsModalOpen(false)}
        cancelText="Thoát"
      >
        <p>Bạn có chắc muốn đăng xuất?</p>
      </Modal>
    </header>
  )
}

export default Header
