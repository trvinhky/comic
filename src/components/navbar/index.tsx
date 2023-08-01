import './index.scss'
import Center from '../center'
import { AppstoreOutlined, HomeOutlined, FireOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import Comics from '~/api';
import useAppContext from '~/store/useAppContext';
import { getTop } from '~/const';
import { useNavigate } from 'react-router';
import { Category } from '~/types';

type MenuItem = Required<MenuProps>['items'][number];

const Navbar = () => {
    const [categories, setCategories] = useState<MenuItem[]>([])
    const { setIsLoading } = useAppContext()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const res: Category[] = await Comics.genres()
            if (res.length > 0) {
                setCategories(res.map((el) => getItem(el.name, el.id)))
            }
            setIsLoading(false)
        })()
    }, [])

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

    const items: MenuProps['items'] = [
        getItem('Trang Chủ', '/', <HomeOutlined />),
        { type: 'divider' },
        getItem('Thể Loại', 'category', <AppstoreOutlined />, categories),
        { type: 'divider' },
        getItem('Xếp Loại', 'top', <FireOutlined />, getTop()),
        { type: 'divider' },
        getItem('Con Trai', 'boy', <ManOutlined />),
        { type: 'divider' },
        getItem('Con Gái', 'girl', <WomanOutlined />)
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key !== '/') {
            navigate('/' + e.keyPath.reverse().join('/'))
        } else {
            navigate(e.key)
        }
    };

    return (
        <div className='navbar'>
            <Center>
                <Menu
                    onClick={onClick}
                    style={{ width: '100%' }}
                    mode="inline"
                    items={items}
                />
            </Center>
        </div>
    )
}

export default Navbar
