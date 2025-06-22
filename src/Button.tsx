export const Button = ({title, onClick, className}: { title: string, onClick?: () => void, className?: string }) => {
    return <button className={className} onClick={onClick}>{title}</button>
}