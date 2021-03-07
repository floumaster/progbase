import React, {useState} from 'react';
import Navbar from './elements/navbar'
import Container from './elements/container'

function App() {
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Some data',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,0,0,0.4)',
        borderColor: 'rgba(255,0,0,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,0,0,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,0,0,1)',
        pointHoverBorderColor: 'rgba(255,0,0,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  });
  const [data, setData] = useState([]);
  let new_data = [
    {id: 1, title: "Иван Петрович Крылов", age: 18},
    {id: 2, title: "Иван Петрович Крылов", age: 18},
    {id: 3, title: "Иван Петрович Крылов", age: 18},
    {id: 4, title: "Иван Петрович Крылов", age: 18},
    {id: 5, title: "Иван Петрович Крылов", age: 18},
    {id: 6, title: "Иван Петрович Крылов", age: 18},
    {id: 7, title: "Иван Петрович Крылов", age: 18},
    {id: 8, title: "Иван Петрович Крылов", age: 18},
    {id: 9, title: "Иван Петрович Крылов", age: 18},
    {id: 10, title: "Иван Петрович Крылов", age: 18},
    {id: 11, title: "Иван Петрович Крылов", age: 18},
    {id: 12, title: "Иван Петрович Крылов", age: 18},
    {id: 13, title: "Иван Петрович Крылов", age: 18},
    {id: 14, title: "Иван Петрович Крылов", age: 18},
    {id: 15, title: "Иван Петрович Крылов", age: 18},
    {id: 16, title: "Иван Петрович Крылов", age: 18},
    {id: 17, title: "Иван Петрович Крылов", age: 18},
    {id: 18, title: "Иван Петрович Крылов", age: 18},
    {id: 19, title: "Иван Петрович Крылов", age: 18},
    {id: 20, title: "Иван Петрович Крылов", age: 18},
    {id: 21, title: "Иван Петрович Крылов", age: 18}
  ]
  function read() {
    fetch('chart.txt').then(response => response.text()).then(text => console.log(text));
  }
  const onpage=9;
  const [currentPage, setCurrPage] = useState(1);
  function getPaginatedData(){
    return data.slice((currentPage-1)*onpage, currentPage*onpage);
  }
  function getPageCout(){
    return Math.ceil(data.length/onpage);
  }
  function goNext(){
    if(currentPage + 1 <= getPageCout())
      setCurrPage(currentPage + 1)
  }
  function goPrev(){
    if(currentPage - 1 >= 1)
      setCurrPage(currentPage - 1)
  }
  function _setData(count){
    setData(new_data.slice(0,count));
  }
  function random(){
    const values = [];
    for(let i = 0; i<7; i++){
      values.push(Math.floor(Math.random() * 10))
    }
    let newData = chartData
    newData.datasets[0].data=values
    setChartData(newData);

  }
  return (
    <div>
      <Navbar/>
      <Container read={read} data={data} random={random} getPaginatedData={getPaginatedData} goNext={goNext} goPrev={goPrev} currentPage={currentPage} getPageCout={getPageCout} onCreate={_setData} chartData={chartData}/>
    </div>
  );
}

export default App;
