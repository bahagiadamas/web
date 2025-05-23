export default function Overlay({className = "", onClick}) {
  return <div id="overlay" className={className} onClick={onClick}></div>;
}
