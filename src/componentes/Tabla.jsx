import '../estilos/Tabla.css'

const Tabla = ({ encabezados, children }) => {
    return (
        <table>
            <thead>
                <tr>
                    {encabezados.map(encabezado => 
                    <th key={encabezado}>
                        {encabezado}
                    </th>
                    )}
                </tr>
            </thead>
            {children}
        </table>
    )
}

export default Tabla