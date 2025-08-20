import { useState, useEffect } from "react";
import { getAllComics } from "../../services/comic.service";
import styles from "./Home.module.scss"; // Using SCSS modules

const Home = () => {
  const [comics, setComics] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 36; // Comics per page

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllComics(page, limit);
        console.log("data: ", data);
        
        setComics(data.items || []);
        setTotal(data.total || 0);
      } catch (err) {
        setError("Failed to fetch comics. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, [page]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) =>
      prevPage * limit < total ? prevPage + 1 : prevPage
    );
  };

  const totalPages = Math.ceil(total / limit);

  const getLatestChapters = (chapters) => {
    if (!chapters || chapters.length === 0) return [];
    return [...chapters]
      .sort((a, b) => b.number - a.number)
      .slice(0, 3);
  };

  if (loading) {
    return <div className={styles.statusMessage}>Loading comics...</div>;
  }

  if (error) {
    return <div className={`${styles.statusMessage} ${styles.error}`}>{error}</div>;
  }

  return (
    <div className={styles.homeContainer}>
      <h1>Comic Releases</h1>
      <div className={styles.comicsGrid}>
        {comics.map((comic) => (
          <div key={comic.id} className={styles.comicCard}>
            <div className={styles.comicImageContainer}>
              <img
                src={comic.thumbnail}
                alt={comic.name}
                className={styles.comicThumbnail}
              />
              <div className={styles.comicChaptersOverlay}>
                <ul>
                  {getLatestChapters(comic.chapters).map((chapter) => (
                    <li key={chapter.id}>
                      <a href={chapter.url} target="_blank" rel="noopener noreferrer">
                        Chapter {chapter.number}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h3 className={styles.comicName}>{comic.name}</h3>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={page <= 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;