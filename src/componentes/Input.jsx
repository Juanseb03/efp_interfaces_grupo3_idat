import "../estilos/Input.css"

const Input = ({ plano = false, label = null, type, value, onChange, disabled = false, required = false}) => { /*PROPS RECIBIDOS USANDO DESESTRUCTURACION*/
  return (<div className={plano && 'plano'}>
    {label && <h3 className='label'>{label}</h3>}
    <input className="input"
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
    />
  </div>);
}

export default Input;