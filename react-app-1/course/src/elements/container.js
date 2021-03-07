import React from 'react';
import { Line } from 'react-chartjs-2';

function navbar(props){
    return(
        <div className="container fullscreen dark">
            <div className="description-card" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/back.jpg'})` }} id="main">
                <img src={process.env.PUBLIC_URL + '/elephant.png'} alt="elephant" className="elephantLogo"/>
                <div className="background-text">
                    <div className="first">
                    </div>
                    <div className="second">
                        <p>May I have your attention, please
May I have your attention, please
Will the real Slim Shady, please stand up
I repeat, will the real Slim Shady, please stand up
We're gonna have a problem here
Ya'll act like you never seen, a white person before
Jaws all on the floor, like Pam like Tommy just burst in the door
And started whoopin' her ass, worse than before
They first were divorced, throwin' her over furniture (Ahh)</p>
                        <a href="tg://resolve?domain=iDisbaIance"><p>@iDisbaIance</p></a>
                    </div>
                </div>
            </div>
            <div className="generate" id="generate" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/back_2.png'})`, backgroundSize: `100%` }}>
                <p>You can generate some data for: </p>
                <hr className="separator"/>
                <div className="entities" id="entities">
                    <div className="student">
                    <a href="#data-table"><img src={process.env.PUBLIC_URL + '/student.png'} alt="student" className="studentlogo" onClick={()=>{document.getElementById("action-button").value = "Generate students"}}/></a>
                        <p>Students</p>
                    </div>
                    <div className="subject">
                    <a href="#data-table"><img src={process.env.PUBLIC_URL + '/subject.png'} alt="subject" className="subjectlogo" onClick={()=>{document.getElementById("action-button").value = "Generate subjects"}}/></a>
                        <p>Subjects</p>
                    </div>
                    <div className="mark">
                    <a href="#data-table"><img src={process.env.PUBLIC_URL + '/mark.png'} alt="mark" className="marklogo" onClick={()=>{document.getElementById("action-button").value = "Generate marks"}}/></a>
                        <p>Marks</p>
                    </div>
                </div>
            </div>
            <div className="data-table" id="data-table">
                <form className="action-button-wrapper" onSubmit={(event)=>{
                        event.preventDefault();
                        const value = document.getElementById("input").value;
                        props.onCreate(!isNaN(value)?parseInt(value):0)
                    }}>
                    <input className="input" type="text" id="input" name="count"/>
                    <input className="action-button" type="submit" id="action-button" value="Generate students"/>
                </form>
                <div className="paginated-table">
                    <div className="previous">
                    <a href="#lol"><img src={process.env.PUBLIC_URL + '/left_arrow.png'} alt="prev" className="prev_arrow" onClick={()=>{props.goPrev()}}/></a>
                    </div>
                    <table className="generated-data">
                        <tbody>
                        {
                            props.getPaginatedData().map((item) => (
                                <tr key={item.id}>
                                    {Object.values(item).map((val) => (
                                        <td>{val}</td>  
                                    ))}
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <div className="next">
                    <a href="#lol"><img src={process.env.PUBLIC_URL + '/right_arrow.png'} alt="next" className="next_arrow" onClick={()=>{props.goNext()}}/></a>
                    </div>
                </div>
                <p>{props.currentPage}/{props.getPageCout()}</p>
            </div>
            <div className="chart" id="chart">
                <div className="bar">
                    <Line data={props.chartData} />
                </div>
                <form className="action-button-wrapper" onSubmit={(event)=>{
                    event.preventDefault();
                    props.random()
                    props.read();
                    props.onCreate()
                    }}>
                    <input className="action-button" type="submit" id="action-button" value="Randomise data"/>
                </form>
            </div>
            <div className="about" id="about">
                <div className="card">
                    <img src={process.env.PUBLIC_URL + '/me.png'} alt="me"/>
                    <p className="name">Dima Grishaev</p>
                    <p className="job">FRONTEND DEVELOPER</p>
                    <div className="sosial-networks">
                        <img src={process.env.PUBLIC_URL + '/telega.png'} alt="telega" className="telega"/>
                        <img src={process.env.PUBLIC_URL + '/discord.png'} alt="discord" className="discord"/>
                    </div>
                    <div className="sosial-networks">
                        <img src={process.env.PUBLIC_URL + '/git.png'} alt="telega" className="git"/>
                        <img src={process.env.PUBLIC_URL + '/link.png'} alt="link" className="link"/>
                    </div>
                </div>
                <div className="codewars">
                    <img src={process.env.PUBLIC_URL + '/codewars.png'} alt="codewars"/>
                </div>
            </div>
        </div>
    );
}

export default navbar