import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export const DartsSingle = () => {
    const params = useParams();
    const id = params.dartsId;
    //const {dartsId} = useParams(); új felírás
    const [darts, setDarts] = useState({});
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        ( async () => {
            setPending(true);
            try {
                const res = await axios.get(`https://darts.sulla.hu/darts/`+ id);
                setDarts(res.data);
            }
            catch(error) {
                console.log("Hiba a lekérésben:", error);
            }
            finally {
                setPending(false);
            }
        })(); // () -> IIFE = Immediately Invoked Function Expression hívása
}, [id]);
return (
<div className="container mt-5">
            <h2 className="text-center">Játékos neve: {darts.name}</h2>
            {isPending ? (
                <div className="spinner-border text-danger"></div>
            ) : (
            <div className="row row-cols-1 row-cols-md-1 g-2">
                    <div className="col">
                    <div className="card h-100">
                        <div className="text-danger text-center">Születési év: {darts.birth_date}</div>
                        <div className="text-danger text-center">Megnyert világbajnokságai: {darts.world_ch_won}</div>
                        <div className="card-body d-flex flex-column align-items-center">
                            <Link to={darts.profile_url} className="fs-6 btn btn-success" target="_blank">Profil link</Link><br />
                            <img src={darts.image_url ? darts.image_url : "https://via.placeholder.com/400x800"} 
                             style={{ maxHeight: "200px" }} className="img-fluid" alt={darts.name} />
                        </div>
                        <div className="text-center">
                        <Link to="/"><i className="bi bi-backspace btn btn-primary"></i></Link>&nbsp;&nbsp;&nbsp;
                        <Link to={"/darts-mod/" + darts.id}><i className="bi bi-pencil-square btn btn-warning"></i></Link>&nbsp;&nbsp;&nbsp;
                        <Link to={"/darts-del/" + darts.id}><i className="bi bi-trash3 btn btn-danger"></i></Link>
                        </div>
                    </div>
                    </div>
                </div>
            )}
        </div>);
};