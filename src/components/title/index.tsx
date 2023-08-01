import './index.scss'

type Title = {
    title: string
}

const Title = (props: Title) => {

    return (
        <h1 className='title'>
            <span>{props.title}</span>
        </h1>
    )
}

export default Title
