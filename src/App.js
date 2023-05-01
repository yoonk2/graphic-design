import { useEffect, useState, useRef } from "react"
import logo from './logo.svg';
import './App.css';
import Algorithm from './components/Algorithm';
import csvFile from './components/data.csv';
import data from "./components/data.json"
import algorithms from "./components/algorithms.json"

function App() {
  const topContRef = useRef()  
  const bottomContRef = useRef()
  const containerRef = useRef()
  const imgRef = useRef()
  const cursorImgRef = useRef()
  const [cursorImg, setCursorImg] = useState()


const [slide, setSlide] = useState(true);

const onWheel = (e) => {
  const { deltaY } = e;
  const el = containerRef.current;
  if (!el) return;

  if (deltaY > 0 && slide === true) {
    setSlide(false);
    el.scrollTo({
      left: el.scrollLeft + deltaY * 5,
      behavior: "smooth",
    });
    setSlide(true);
  }
  if (deltaY < 0 && slide === true) {
    setSlide(false);
    el.scrollTo({
      left: el.scrollLeft + deltaY * 5,
      behavior: "smooth",
    });
    setSlide(true);
  }
};
  

  const algoArray = []
  algorithms.map((item, i) => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16)
    item.color = randomColor
    algoArray.push(item)
  })


  const arrayItems = algoArray.map(algo => {
    const typeID = "#" + algo.type
    return (<a href={typeID}><li key={algo.id} className={algo.id}><div style={{backgroundColor: algo.color}}></div>{algo.title}</li></a>)
  }
  )
  
  const topItems = algoArray.slice(0, algoArray.length/2).map((algo) => {
    let i = 0;
    return(
  <div className="sort-unit" id={algo.type} >
      <div className="color-bar" style={{backgroundColor:algo.color}}></div>
      <h3>{algo.title}<div>{algo.kor_title}</div></h3>
      {algo.img!=""?(<img className="hover-img" ref={imgRef} src={algo.img}/>):null}
      <div className="sort-img">
      {data.map((item) => 
        <>
        {algo.type == item.type?<Algorithm algo={algo} item={item} index={i++}/>:null}</>
      )}
      </div>
    </div>
    )
    })

    const bottomItems = algoArray.slice(algoArray.length/2).map((algo) => {
      let i = 0;
      return(
      <div className="sort-unit" id={algo.type}>
        <div className="color-bar" style={{backgroundColor:algo.color}}></div>
        <h3>{algo.title}<div>{algo.kor_title}</div></h3>
        {algo.img!=""?(<img className="hover-img" ref={imgRef} src={algo.img}/>):null}
      <div className="sort-img">
      {data.map((item) => 
        <>
        {algo.type == item.type?<Algorithm algo={algo} item={item} index={i++}/>:null}</>
      )}
        </div>
      </div>
      )
      })

    const moveImage = () => {
    const image = cursorImgRef.current
    if (image) {
      document.addEventListener("mousemove", (e) => {
        image.style.left = e.pageX + 10 + "px"
        image.style.top = e.pageY + 10 + "px"
      })
    }
    }

  useEffect(() => {
    topContRef.current.addEventListener('wheel', (e) => {
      e.preventDefault();
      topContRef.current.scrollLeft += e.deltaY;

  });
    bottomContRef.current.addEventListener('wheel', (e) => {
      e.preventDefault();
      bottomContRef.current.scrollLeft += e.deltaY;
  });

    moveImage()
  setCursorImg("https://cdn.shopify.com/s/files/1/1061/1924/products/Happy_Emoji_Icon_5c9b7b25-b215-4457-922d-fef519a08b06_large.png?v=1571606090")

  })
  
  return (
    <div className="App">
      <nav>
        <h2>Sorting Algorithms<div>정렬 알고리즘</div></h2>
        
        <ul>
          {arrayItems}
        </ul>
      </nav>
      {/* <img ref={cursorImgRef} src={cursorImg} style={{position:"absolute", zIndex:"10", height:"100px"}}/> */}
      <main>
      <div className="top-container" ref={topContRef} onWheel={(e) => onWheel(e)}> 
        {topItems}
      </div>
      <div className="bottom-container" ref={bottomContRef} onWheel={(e) => onWheel(e)}> 
        {bottomItems}
      </div>
      </main>
      
    </div>
  );
}

export default App;
