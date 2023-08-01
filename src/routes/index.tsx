
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './router'
import useAppContext from '~/store/useAppContext';

const RouteApp = () => {
    const { user } = useAppContext();

    if (!user) {
        return (
            <Routes>
                {
                    publicRoutes.map((value, i) => (
                        <Route key={i} path={value.path} element={value.component} />
                    ))
                }
            </Routes>
        )
    }

    return (
        <Routes>
            {
                privateRoutes.map((value, i) => (
                    <Route key={i} path={value.path} element={value.component} />
                ))
            }
        </Routes>
    )
}

export default RouteApp