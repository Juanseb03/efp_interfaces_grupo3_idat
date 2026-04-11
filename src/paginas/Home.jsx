import { useState, useEffect } from 'react';

/* COMPONENTES */
import Navbar from '../componentes/Navbar';
import Tarjeta from '../componentes/Tarjeta';
import Input from '../componentes/Input';
import TarjetaConteo from '../componentes/TarjetaConteo';
import Select from '../componentes/Select';
import Tabla from '../componentes/Tabla';
import Button from '../componentes/Button';
import Banner from '../componentes/Banner';
import TablaBody from '../componentes/TablaBody';

import '../index.css';

const Home = () => {
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [motivo, setMotivo] = useState("AIRBNB")
    const [departamento, setDepartamento] = useState("")
    const [observaciones, setObservaciones] = useState("")
    const [entrada, setEntrada] = useState("")
    const [salida, setSalida] = useState("")

    const [filtroNombre, setFNombre] = useState("")
    const [filtroApellido, setFApellido] = useState("")
    const [filtroMotivo, setFMotivo] = useState("")
    const [filtroDepartamento, setFDepartamento] = useState("")
    const [filtroObservaciones, setFObservaciones] = useState("")
    const [filtroEntrada, setFEntrada] = useState("")
    const [filtroSalida, setFSalida] = useState("")

    const [datosVisitas, setDatosVisitas] = useState(() => {
        const datos = localStorage.getItem("visitas")
        return datos ? JSON.parse(datos) : []
    })

    const [datosEnTabla, setDatosEnTabla] = useState(datosVisitas)

    const [visitasHoy, setVisitasHoy] = useState(datosVisitas.length)
    const [entradasHoy, setEntradasHoy] = useState(datosVisitas.length)
    const [salidasHoy, setSalidasHoy] = useState(() => {
        const cantidadSalidas = datosVisitas.filter(dato => dato.salida != '')
        return cantidadSalidas.length
    })

    const [filtroActivo, setFiltroActivo] = useState(false)
    
    /* GUARDAR VISITAS */
    useEffect(() => {
        localStorage.setItem("visitas", JSON.stringify(datosVisitas));
    }, [datosVisitas]); 

    const borrarCampos = () => {
        setNombre("")
        setApellido("")
        setMotivo("AIRBNB")
        setDepartamento("")
        setObservaciones("")
        setEntrada("")
    }

    const generarID = () => {
        let nuevoID = datosVisitas.length + 1
        let unico = false

        while (!unico) {
            unico = true
            for (let dato of datosVisitas) {
                if (nuevoID === dato.idRegistro) {
                    nuevoID++
                    unico = false
                    break
                }
            }
        }

        return nuevoID
    }

    const registrarVisita = (e) => {
        e.preventDefault()

        const nuevoID = generarID()

        const nuevoRegistro = {
            idRegistro: nuevoID,
            nombre,
            apellido,
            motivo,
            departamento,
            observaciones,
            entrada,
            salida: ''
        }

        setDatosVisitas(prev => {
            const datosActualizados = [...prev, nuevoRegistro]
            setDatosEnTabla(datosActualizados)
            setVisitasHoy(datosActualizados.length)
            setEntradasHoy(datosActualizados.length)

            return datosActualizados
        })

        borrarCampos()
    }

    const filtrarVisita = () => {
        if (!filtroActivo) {
            const resultados = datosVisitas.filter(dato => {
                return (filtroNombre && dato.nombre === filtroNombre) ||
                (filtroApellido && dato.apellido === filtroApellido) ||
                (filtroMotivo && dato.motivo === filtroMotivo) ||
                (filtroDepartamento && dato.departamento === filtroDepartamento) ||
                (filtroEntrada && dato.entrada === filtroEntrada) ||
                (filtroSalida && dato.salida === filtroSalida) ||
                (filtroObservaciones && dato.observaciones === filtroObservaciones)
            })
            setDatosEnTabla(resultados)
            setFiltroActivo(true)
            return
        }
        setDatosEnTabla(datosVisitas)
        setFiltroActivo(false)
    }

    return (
        <div>
            <Navbar />
            <Banner texto="Registra, actualiza y retira visitantes de forma sencilla en EntryLog."/>
            <div className="section">
                <div>
                    <TarjetaConteo
                        conteo={visitasHoy}
                        texto="VISITANTES ACTUALES DE HOY"
                        color="azul"
                    />
                    <TarjetaConteo
                        conteo={entradasHoy}
                        texto="VISITANTES QUE ENTRARON HOY"
                        color="verde-claro"
                    />
                    <TarjetaConteo
                        conteo={salidasHoy}
                        texto="VISITANTES QUE SALIERON HOY"
                        color="purpura"
                    />
                </div>
                <Tarjeta id="registro-visitas" titulo="Registrar visitas">
                    <form onSubmit={registrarVisita}>
                        <Input label="Nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
                        plano={true}
                        />
                        <Input label="Apellido" type="text" value={apellido} 
                        onChange={(e) => setApellido(e.target.value)} plano={true}
                        />
                        <Select label="Motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)}
                        plano={true} opciones={[
                            'AIRBNB', 'Delivery', 'Visitas', 'Proveedores', 'Otros'
                        ]}
                        />
                        <Input label="Departamento" type="text" value={departamento} 
                        onChange={(e) => setDepartamento(e.target.value)} plano={true}
                        />
                        <Input label="Observaciones" type="text" value={observaciones} 
                        onChange={(e) => setObservaciones(e.target.value)}plano={true}
                        />
                        <Input label="Entrada" type="datetime-local" value={entrada}
                        onChange={(e) => setEntrada(e.target.value)} plano={true}
                        />
                        <Button type="submit" estilo="verde" texto="Registrar" pequeno/>
                    </form>
                </Tarjeta>
            </div>
            <hr/>
            <div className='section'>
                <Tarjeta id="tabla-visitas" amplia={true} titulo="Registro de visitas">
                    <div className='section border'>
                        <div>
                            <Button estilo='anaranjado' texto="Filtrar" onClick={filtrarVisita}/>
                            <Button estilo='azul' texto="Visitas de hoy" onClick={() => setIsModalOpen(true)}/>
                            <Button estilo='azul' texto="Visitas sin salida"/>
                        </div>
                        <Tabla encabezados={[
                            'Nombre', 'Apellido', 'Motivo', 'Departamento', 'Ingreso', 'Salida', 'Observaciones'
                        ]}>
                            <TablaBody datosEnTabla={datosEnTabla} datos={datosVisitas} setDatos={setDatosVisitas}>
                                <td>
                                    <Input type="text" value={filtroNombre} 
                                    onChange={(e) => setFNombre(e.target.value)}/>
                                </td>
                                <td>
                                    <Input type="text" value={filtroApellido} 
                                    onChange={(e) => setFApellido(e.target.value)}/>
                                </td>
                                <td>
                                    <Input type="text" value={filtroMotivo} 
                                    onChange={(e) => setFMotivo(e.target.value)}/>
                                </td>
                                <td>
                                    <Input type="text" value={filtroDepartamento} 
                                    onChange={(e) => setFDepartamento(e.target.value)}/>
                                </td>
                                <td>
                                    <Input type="datetime-local" value={filtroEntrada} 
                                    onChange={(e) => setFEntrada(e.target.value)}/>
                                </td>
                                <td>
                                    <Input type="datetime-local" value={filtroSalida} 
                                    onChange={(e) => setFSalida(e.target.value)}/>
                                </td>
                                <td>
                                    <Input type="text" value={filtroObservaciones} 
                                    onChange={(e) => setFObservaciones(e.target.value)}/>
                                </td>
                            </TablaBody>
                        </Tabla>
                    </div>
                </Tarjeta>
            </div>
        </div>
  );
}

export default Home;