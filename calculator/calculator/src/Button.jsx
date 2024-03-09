
const Button = (props) => {
    const{label,onClick,id} = props;
  return <button   onClick={onClick} id={id}>{label}</button>
}
export default Button
