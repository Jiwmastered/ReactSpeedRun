import '../index.css'

export default function TextAlert({title, message, options}) {
    /*
    option : {
        "choice A" : callback
        "choice B" : callback
        "choice C" : callback
    }
    */
    return (
    <div className="box" style={{
        position:'fixed', 
        bottom: "60px", 
        left:"50%",
        translate:"-50% -50%", 
        maxWidth:"50vw", minWidth:"50vw",
        flexDirection:'column',
        transition: "width 0.3s ease, height 0.3s ease"}}>
    
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="list">
            {Object.entries(options).map(([k , val]) => {
                return (
                    <button className='choice' onClick={val}>{k}</button>
                )
            })}
        </div>
    </div>
    );
}