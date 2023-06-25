interface Props {
    title: string
}
const Label: React.FC<Props> = ({ title }) => {
    const colors = {
        main: '',
        side: ''
    }
    switch (title) {
        case 'Adoption':
            colors.main = 'var(--adoption-color)'
            colors.side = 'var(--adoption-side-color)'
            break
        case 'Discuss':
            colors.main = 'var(--discuss-color)'
            colors.side = 'var(--discuss-side-color)'
            break
        case 'Sell':
            colors.main = 'var(--sell-color)'
            colors.side = 'var(--sell-side-color)'
            break
        case 'Help':
            colors.main = 'var(--help-color)'
            colors.side = 'var(--help-side-color)'
            break
        default:
            colors.main = 'white'
            colors.side = 'white'
    }
    return (
        <div className='label' style={{ backgroundColor: colors.main }}>
            <div className='top-label' style={{ backgroundColor: colors.side }}></div>
            <p className='label-content' >{title}</p>
            <div className='down-label' style={{ backgroundColor: colors.side }}></div>
        </div>
    )
}
export default Label