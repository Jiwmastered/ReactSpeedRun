import '../index.css'

export default function ActionBar() {
    return (
      <div className='box actionBar' style={{ gap:"5px"}}>
        <button >Fight</button>
        <button >Talk</button>
        <button >Item</button>
        <button >Skill</button>
      </div>  
    );
}