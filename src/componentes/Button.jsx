import '../estilos/Button.css'

const Button = ({ estilo, pequeno = false, type, texto, onClick, icono }) => {
    return (
        <button type={type} className={`boton ${estilo} ${pequeno && 'pequeno'}`} onClick={onClick}>
            {icono}{texto}
        </button>
    )
}

export default Button