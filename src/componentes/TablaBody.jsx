import { useState } from "react";
import TarjetaEmergente from "./TarjetaEmergente";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

const TablaBody = ({ datosEnTabla, datos, setDatos, children }) => {
    const [ventanaAbierta, setVentanaAbierta] = useState(false);

    const [idRegistro, setIDRegistro] = useState(null)
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [motivo, setMotivo] = useState("AIRBNB")
    const [departamento, setDepartamento] = useState("")
    const [observaciones, setObservaciones] = useState("")
    const [entrada, setEntrada] = useState("")
    const [salida, setSalida] = useState("")

    const llenarCampos = (dato) => {
        setIDRegistro(dato.idRegistro)
        setNombre(dato.nombre);
        setApellido(dato.apellido);
        setMotivo(dato.motivo);
        setDepartamento(dato.departamento);
        setObservaciones(dato.observaciones);
        setEntrada(dato.entrada);
        setSalida(dato.salida);
    }

    const actualizarDatos = () => {
        setDatos(() => {
            const datosActualizados = datos.map(dato => (
                idRegistro === dato.idRegistro
            ) ? {...dato, entrada, salida} : dato);
            return datosActualizados
        })
    }

    return (
        <tbody>
            <tr>
                {children}
            </tr>
            {datosEnTabla.map((dato) => (<>
            <tr key={dato.idRegistro} onClick={() => {setVentanaAbierta(() => {llenarCampos(dato); return true})}}>
                <td>{dato.nombre}</td>
                <td>{dato.apellido}</td>
                <td>{dato.motivo}</td>
                <td>{dato.departamento}</td>
                <td>{dato.entrada.replace('T', ' ')}</td>
                <td>{dato.salida.replace('T', ' ')}</td>
                <td>{dato.observaciones}</td>
            </tr>

            <TarjetaEmergente abierto={ventanaAbierta} cerrar={() => setVentanaAbierta(false)}
            titulo="Información de visitantes">
                <form onSubmit={actualizarDatos}>
                    <Input label="Nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
                    plano={true} disabled
                    />
                    <Input label="Apellido" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)}
                    plano={true} disabled
                    />
                    <Select label="Motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} 
                    plano={true} disabled 
                    opciones={['AIRBNB', 'Delivery', 'Visitas', 'Proveedores', 'Otros']}
                    />
                    <Input label="Departamento" type="text" value={departamento} 
                    onChange={(e) => setDepartamento(e.target.value)} plano={true} disabled
                    />
                    <Input label="Observaciones" type="text" value={observaciones} 
                    onChange={(e) => setObservaciones(e.target.value)} plano={true} disabled
                    />
                    <Input label="Entrada" type="datetime-local" value={entrada} 
                    onChange={(e) => setEntrada(e.target.value)} plano={true} required
                    />
                    <Input label="Salida" type="datetime-local" value={salida}
                    onChange={(e) => setSalida(e.target.value)} plano={true}
                    />

                    <Button type="submit" estilo="verde" texto="Guardar" pequeno/>
                    <Button type="button" estilo="rojo" texto="Cerrar" 
                    onClick={() => setVentanaAbierta(false)} pequeno/>
                </form>
            </TarjetaEmergente>
            </>))}
        </tbody>
    )
}

export default TablaBody