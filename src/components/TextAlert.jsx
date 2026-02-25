import '../index.css'

export default function TextAlert({title, message}) {
    
    return (
    <div className="box" style={{position:'fixed', bottom: "60px", left:"50%", minWidth:"max-content", translate:"0 -50%", flexDirection:'column'}}>
        <h2>Title</h2>
        <p>Message Message Message Message</p>
    </div>
    );
}