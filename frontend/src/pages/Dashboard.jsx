import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery, useCreateMovieMutation, useUpdateMovieMutation, useDeleteMovieMutation } from '../store/apis/movieApi';
import { useGetShowtimesQuery, useCreateShowtimeMutation, useUpdateShowtimeMutation, useDeleteShowtimeMutation } from '../store/apis/showtimeApi';
import Header from '../components/Header';
import Spinner from '../components/Spinner';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const [showMovieForm, setShowMovieForm] = useState(false);
    const [showShowtimeForm, setShowShowtimeForm] = useState(false);
    const [editingMovieId, setEditingMovieId] = useState(null);
    const [editingShowtimeId, setEditingShowtimeId] = useState(null);
    const [movieForm, setMovieForm] = useState({ title: '', description: '', genre: '', duration: '' });
    const [showtimeForm, setShowtimeForm] = useState({ movie: '', hall: '', date: '', price: '' });
    const [posterFile, setPosterFile] = useState(null);

    const { data: movies = [], isLoading: moviesLoading } = useGetMoviesQuery();
    const { data: showtimes = [], isLoading: showtimesLoading } = useGetShowtimesQuery();
    const [createMovie] = useCreateMovieMutation();
    const [updateMovie] = useUpdateMovieMutation();
    const [deleteMovie] = useDeleteMovieMutation();
    const [createShowtime] = useCreateShowtimeMutation();
    const [updateShowtime] = useUpdateShowtimeMutation();
    const [deleteShowtime] = useDeleteShowtimeMutation();

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    const handleCreateMovie = async (e) => {
        e.preventDefault();
        if (editingMovieId) {
            await updateMovie({ id: editingMovieId, ...movieForm });
        } else {
            const formData = new FormData();
            formData.append('title', movieForm.title);
            formData.append('description', movieForm.description);
            formData.append('genre', movieForm.genre);
            formData.append('duration', movieForm.duration);
            if (posterFile) formData.append('poster', posterFile);
            await createMovie(formData);
        }
        resetMovieForm();
    };

    const handleCreateShowtime = async (e) => {
        e.preventDefault();
        if (editingShowtimeId) {
            await updateShowtime({ id: editingShowtimeId, ...showtimeForm });
        } else {
            await createShowtime(showtimeForm);
        }
        resetShowtimeForm();
    };

    const resetMovieForm = () => {
        setMovieForm({ title: '', description: '', genre: '', duration: '' });
        setPosterFile(null);
        setEditingMovieId(null);
        setShowMovieForm(false);
    };

    const resetShowtimeForm = () => {
        setShowtimeForm({ movie: '', hall: '', date: '', price: '' });
        setEditingShowtimeId(null);
        setShowShowtimeForm(false);
    };

    const toDateTimeLocalValue = (date) => {
        const localDate = new Date(date);
        const offsetDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
        return offsetDate.toISOString().slice(0, 16);
    };

    const handleEditMovie = (movie) => {
        setMovieForm({
            title: movie.title || '',
            description: movie.description || '',
            genre: movie.genre || '',
            duration: movie.duration || '',
        });
        setPosterFile(null);
        setEditingMovieId(movie._id);
        setShowMovieForm(true);
    };

    const handleEditShowtime = (showtime) => {
        setShowtimeForm({
            movie: showtime.movie?._id || showtime.movie || '',
            hall: showtime.hall || '',
            date: showtime.date ? toDateTimeLocalValue(showtime.date) : '',
            price: showtime.price || '',
        });
        setEditingShowtimeId(showtime._id);
        setShowShowtimeForm(true);
    };

    if (moviesLoading || showtimesLoading) return <Spinner />;

    return (
        <>
            <Header />
            <div className='container'>
                {/* MOVIES SECTION */}
                <div className='section-header'>
                    <h2>🎬 Filmat</h2>
                    <button onClick={() => showMovieForm ? resetMovieForm() : setShowMovieForm(true)}>
                        {showMovieForm ? 'Mbyll' : '+ Shto Film'}
                    </button>
                </div>

                {showMovieForm && (
                    <form className='form' onSubmit={handleCreateMovie}>
                        <input
                            type='text'
                            placeholder='Titulli'
                            value={movieForm.title}
                            onChange={(e) => setMovieForm({ ...movieForm, title: e.target.value })}
                        />
                        <input
                            type='text'
                            placeholder='Pershkrimi'
                            value={movieForm.description}
                            onChange={(e) => setMovieForm({ ...movieForm, description: e.target.value })}
                        />
                        <input
                            type='text'
                            placeholder='Zhanri (p.sh. Action, Drama)'
                            value={movieForm.genre}
                            onChange={(e) => setMovieForm({ ...movieForm, genre: e.target.value })}
                        />
                        <input
                            type='number'
                            placeholder='Kohezgjatja (minuta)'
                            value={movieForm.duration}
                            onChange={(e) => setMovieForm({ ...movieForm, duration: e.target.value })}
                        />
                        {!editingMovieId && (
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) => setPosterFile(e.target.files[0])}
                            />
                        )}
                        <button type='submit'>{editingMovieId ? 'Ruaj Ndryshimet' : 'Shto Film'}</button>
                    </form>
                )}

                <div className='movies-grid'>
                    {movies.length > 0 ? movies.map((movie) => (
                        <div key={movie._id} className='movie-card'>
                            {movie.poster && (
                                <img
                                    src={`http://localhost:8000${movie.poster}`}
                                    alt={movie.title}
                                />
                            )}
                            <div className='movie-info'>
                                <h3>{movie.title}</h3>
                                <span className='genre'>{movie.genre}</span>
                                <p>{movie.description}</p>
                                <p>⏱ {movie.duration} min</p>
                                <button onClick={() => handleEditMovie(movie)}>
                                    Ndrysho
                                </button>
                                <button
                                    className='delete-btn'
                                    onClick={() => deleteMovie(movie._id)}
                                >
                                    Fshi
                                </button>
                            </div>
                        </div>
                    )) : <p>Nuk ka filma ende.</p>}
                </div>

                {/* SHOWTIMES SECTION */}
                <div className='section-header'>
                    <h2> Oraret e Projektimit</h2>
                    <button onClick={() => showShowtimeForm ? resetShowtimeForm() : setShowShowtimeForm(true)}>
                        {showShowtimeForm ? 'Mbyll' : '+ Shto Orar'}
                    </button>
                </div>

                {showShowtimeForm && (
                    <form className='form' onSubmit={handleCreateShowtime}>
                        <select
                            value={showtimeForm.movie}
                            onChange={(e) => setShowtimeForm({ ...showtimeForm, movie: e.target.value })}
                        >
                            <option value=''>Zgjidh Filmin</option>
                            {movies.map((movie) => (
                                <option key={movie._id} value={movie._id}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                        <input
                            type='text'
                            placeholder='Salla (p.sh. Salla 1)'
                            value={showtimeForm.hall}
                            onChange={(e) => setShowtimeForm({ ...showtimeForm, hall: e.target.value })}
                        />
                        <input
                            type='datetime-local'
                            value={showtimeForm.date}
                            onChange={(e) => setShowtimeForm({ ...showtimeForm, date: e.target.value })}
                        />
                        <input
                            type='number'
                            placeholder='Cmimi (Leke)'
                            value={showtimeForm.price}
                            onChange={(e) => setShowtimeForm({ ...showtimeForm, price: e.target.value })}
                        />
                        <button type='submit'>{editingShowtimeId ? 'Ruaj Ndryshimet' : 'Shto Orar'}</button>
                    </form>
                )}

                <div className='showtimes-list'>
                    {showtimes.length > 0 ? showtimes.map((showtime) => (
                        <div key={showtime._id} className='showtime-card'>
                            <div className='showtime-info'>
                                <h3> {showtime.movie?.title || 'Film i fshire'}</h3>
                                <p> {showtime.hall}</p>
                                <p> {new Date(showtime.date).toLocaleString()}</p>
                                <p> {showtime.price} Leke</p>
                            </div>
                            <button onClick={() => handleEditShowtime(showtime)}>
                                Ndrysho
                            </button>
                            <button
                                className='delete-btn'
                                onClick={() => deleteShowtime(showtime._id)}
                            >
                                Fshi
                            </button>
                        </div>
                    )) : <p>Nuk ka orare ende.</p>}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
