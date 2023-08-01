import type { MenuProps } from 'antd';
import { EyeOutlined, HeartOutlined, HistoryOutlined, ToTopOutlined } from '@ant-design/icons';
import React from 'react';
import { Top } from '~/types';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

type TopComic = {
    id: number
    name: string
    icon: React.ReactNode
    key: Top
}

export const TOPCOMIC: TopComic[] = [
    {
        id: 0,
        name: 'Top all',
        icon: <EyeOutlined />,
        key: 'all'
    },
    {
        id: 1,
        name: 'Top tháng',
        icon: <EyeOutlined />,
        key: 'monthly'
    },
    {
        id: 2,
        name: 'Top tuần',
        icon: <EyeOutlined />,
        key: 'weekly'
    },
    {
        id: 3,
        name: 'Top ngày',
        icon: <EyeOutlined />,
        key: 'daily'
    },
    {
        id: 4,
        name: 'Truyện mới',
        icon: <ToTopOutlined />,
        key: 'new'
    },
    {
        id: 5,
        name: 'Mới cập nhật',
        icon: <HistoryOutlined />,
        key: 'update'
    },
    {
        id: 6,
        name: 'Top yêu thích',
        icon: <HeartOutlined />,
        key: 'follow'
    }
]

export const getTop = (): MenuItem[] => TOPCOMIC.map((el) => getItem(el.name, el.id, el.icon))
