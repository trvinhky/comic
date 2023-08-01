import React from 'react'
import Search from '~/components/search'
import Boy from '~/pages/boy'
import CategoryPage from '~/pages/category'
import Chapter from '~/pages/chapter'
import Detail from '~/pages/detail'
import Girl from '~/pages/girl'
import Home from '~/pages/home'
import Login from '~/pages/login'
import Register from '~/pages/register'
import TopComic from '~/pages/topComic'
import User from '~/pages/user'

type arrayType = {
    path: string,
    component: React.ReactNode
}

export const publicRoutes: arrayType[] = [
    {
        path: '/login',
        component: <Login />
    },
    {
        path: '/register',
        component: <Register />
    },
    {
        path: '/',
        component: <Home />
    },
    {
        path: '/detail/:comic_id',
        component: <Detail />
    },
    {
        path: '/detail/:comic_id/chapter/:chapter_id',
        component: <Chapter />
    },
    {
        path: '/boy',
        component: <Boy />
    },
    {
        path: '/girl',
        component: <Girl />
    },
    {
        path: '/category/:genre_id',
        component: <CategoryPage />
    },
    {
        path: '/top/:type_index',
        component: <TopComic />
    },
    {
        path: '/search/:name',
        component: <Search />
    }
]

export const privateRoutes: arrayType[] = [
    {
        path: '/user/:user_id',
        component: <User />
    },
]