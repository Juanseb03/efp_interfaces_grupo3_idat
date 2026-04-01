import '../estilos/TarjetaConteo.css'

const TarjetaConteo = ({ conteo, texto, color }) => {
    return (
        <div className={`tarjeta-conteo ${color}`}>
            <h2>{conteo}</h2>
            <p>{texto}</p>
        </div>
    )
}

export default TarjetaConteo