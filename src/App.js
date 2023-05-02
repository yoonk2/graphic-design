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

  const scrollToAlgo = (type) => {
    console.log(type)
    const element = document.getElementById(type);
    element?.scrollIntoView()
  }


  const arrayItems = algoArray.map(algo => {
    return (<li onClick={scrollToAlgo(algo.type)} key={algo.id} className={algo.id}><div style={{backgroundColor: algo.color}}></div>{algo.title}</li>)
  }
  )
  const algoRef = useRef([])
  
  const topItems = algoArray.slice(0, algoArray.length/2).map((algo, index) => {
    let i = 0;
    return(
  <div className="sort-unit" id={algo.type} ref={el => (algoRef.current[index] = el)} >
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

    const bottomItems = algoArray.slice(algoArray.length/2).map((algo, index) => {
      let i = 0;
      return(
      <div className="sort-unit" id={algo.type} ref={el => (algoRef.current[index + algoArray.length/2] = el)}>
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
        <h2>Sorting Algorithms
          <button>정렬 알고리즘</button>
          <p className="project-info">정렬 알고리즘이 시각화된 이미지를 아카이빙했습니다. 정렬 알고리즘은 컴퓨터공학에서 중요하게 다루어지는 주제 중 하나입니다. 본 웹사이트의 제작자또한 정렬 알고리즘 공부를 시도했지만, 알고리즘 자체보다 알고리즘의 '움짤'에 더 관심이 가 이미지들을 수집하고 높이순으로 재배치하여 웹사이트를 제작했습니다. 알고리즘 공부에 도움이 되지는 않겠지만, 아름다운 이미지들을 구경하며 즐겨보세요. 이 웹사이트 제작에 영감이 된 <a href="https://youtu.be/vr5dCRHAgb0">유튜브 영상</a>을 함께 보며 둘러보셔도 좋습니다.<button>X</button></p>
        </h2>
        
        <ul>
          {algoArray.map((algo, i) => <li onClick={() => {
            algoRef.current[i].scrollIntoView({behavior:"smooth"})
          }} key={algo.id} className={algo.id}><div style={{backgroundColor: algo.color}}></div>{algo.title}</li>)}
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
