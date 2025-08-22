import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllComics } from "../../services/comic.service";
import styles from "./Home.module.scss";

const Home = () => {
  const [comics, setComics] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = 36;
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllComics(page, limit);
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
    window.scrollTo(0, 0);
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: newPage });
    }
  };

  const getLatestChapters = (chapters) => {
    if (!chapters || chapters.length === 0) return [];
    return [...chapters]
      .sort((a, b) => parseInt(b.number) - parseInt(a.number)) // ép số bỏ .00
      .slice(0, 3)
      .map(chap => ({
        ...chap,
        number: parseInt(chap.number) // luôn lưu thành 209 thay vì 209.00
      }));
  };
  

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null;
    }

    const pageNumbers = [];
    const visiblePages = 8;
    let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (totalPages - endPage < Math.floor(visiblePages / 2)) {
        startPage = Math.max(1, totalPages - visiblePages + 1);
    }
    
    // Prev button
    pageNumbers.push(
        <button key="prev" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Prev
        </button>
    );

    // First page
    if (startPage > 1) {
        pageNumbers.push(
            <button key={1} onClick={() => handlePageChange(1)}>
                1
            </button>
        );
        if (startPage > 2) {
            pageNumbers.push(<span key="start-ellipsis">...</span>);
        }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
            <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={page === i ? styles.active : ""}
            >
                {i}
            </button>
        );
    }

    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbers.push(<span key="end-ellipsis">...</span>);
        }
        pageNumbers.push(
            <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
                {totalPages}
            </button>
        );
    }
    
    // Next button
    pageNumbers.push(
        <button key="next" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            Next
        </button>
    );

    return <div className={styles.pagination}>{pageNumbers}</div>;
  }

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
            <Link to={`/truyen-tranh/${comic.slug}`}> {/* Added Link here */}
              <div className={styles.comicImageContainer}>
                <img
                  src={comic.thumbnail}
                  alt={comic.name}
                  className={styles.comicThumbnail}
                />
              </div>
              <h3 className={styles.comicName}>{comic.name}</h3>
            </Link> {/* Closed Link here */}
            <div className={styles.comicChapters}>
              <ul>
                {getLatestChapters(comic.chapters).map((chapter) => (
                  <li key={chapter.id}>
                    {/* Removed <a> tag, as chapter links are handled on ComicDetail page */}
                    Chapter {chapter.number}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {renderPagination()}
    </div>
  );
};

export default Home;