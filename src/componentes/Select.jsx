import '../estilos/Input.css'

const Select = ({ plano = false, label = null, opciones, value, onChange, disabled = false }) => {
    return (
        <div className={plano && 'plano'}>
            {label && <h3 className='label'>{label}</h3>}
            <select value={value} onChange={onChange} className='input' disabled={disabled}>
                {opciones.map(opcion =>
                    <option key={opcion} value={opcion}>
                        {opcion}
                    </option>
                )}
            </select>
        </div>
    )
}

export default Select