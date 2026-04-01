import '../estilos/Banner.css'

const Banner = ({ texto }) => {
    return (
        <div className="contenedor-imagen">
            <div className="frase">
                <h2>{texto}</h2>
            </div>
        </div>
    )
}

export default Banner