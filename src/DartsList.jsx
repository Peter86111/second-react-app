import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const DartsList = () => {
    const [dartes,setDarts] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setPending(true);
            try {
                const valasz = await axios.get("https://darts.sulla.hu/darts/");
                setDarts(valasz.data);
            }
            catch(error) {
                console.log("Hiba a lekérésben:", error);
            }
            finally {
                setPending(false);
            };
        };
        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Játékosok</h2>
            {isPending ? (
                <div className="spinner-border text-danger"></div>
            ) : (

            <div className="row row-cols-1 row-cols-md-3 g-2">
                {dartes.map((darts, index) => (
                    <div className="col" key={index}>
                    <div className="card h-100">
                        <div className="text-dark text-center"><b>Játékos neve:
                            <br /> {darts.name}</b></div>
                        <div className="text-danger text-center">Születési év: {darts.birth_date}</div>
                        <div className="text-danger text-center">Megnyert világbajnokságai: {darts.world_ch_won}</div>
                        <div className="card-body d-flex flex-column align-items-center">
                            <Link to={darts.profile_url} className="fs-6 btn btn-success" target="_blank">Profil link</Link><br />
                            <Link to={"/darts/" + darts.id}>
                            <img src={darts.image_url ? darts.image_url : "https://via.placeholder.com/400x800"} 
                             style={{ width: "200px" }} className="img-fluid" alt={darts.name} /></Link>
                        </div>
                        <div className="text-center">
                        <Link to={"/darts/" + darts.id}><i className="bi bi-text-paragraph btn btn-primary"></i></Link>&nbsp;&nbsp;&nbsp;
                        <Link to={"/darts-mod/" + darts.id}><i className="bi bi-pencil-square btn btn-warning"></i></Link>&nbsp;&nbsp;&nbsp;
                        <Link to={"/darts-del/" + darts.id}><i className="bi bi-trash3 btn btn-danger"></i></Link>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}
        </div>);
}