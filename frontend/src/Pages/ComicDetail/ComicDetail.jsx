import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getComicBySlug } from '../../services/comic.service';
import styles from './ComicDetail.module.scss'; // Import the CSS module

const ComicDetail = () => {
    const { slug } = useParams();
    const [comic, setComic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComicDetail = async () => {
            try {
                const data = await getComicBySlug(slug);
                setComic(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchComicDetail();
    }, [slug]);

    if (loading) {
        return <div className={styles.loading}>Loading comic details...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error.message}</div>;
    }

    if (!comic) {
        return <div className={styles.notFound}>Comic not found.</div>;
    }

    return (
        <div className={styles.comicDetailContainer}>
            

            <div className={styles.comicHeader}>
                <img src={comic.thumbnail} alt={comic.name} className={styles.comicThumbnail} />
                <div className={styles.comicInfo}>
                    <h1 className={styles.comicName}>{comic.name}</h1>
                    {/* Genres display removed as per user's request */}
                </div>
            </div>

            <h2>Chapters:</h2>
            <ul className={styles.chapterList}>
                {comic.chapters && comic.chapters.length > 0 ? (
                    comic.chapters.map((chapter) => (
                        <li key={chapter.id} className={styles.chapterItem}>
                            <Link to={`/truyen-tranh/${comic.slug}/${chapter.slug}`}>
                                <div className={styles.chapterTitle}>{chapter.title}</div>
                                <div className={styles.chapterNumber}>Chapter {chapter.number}</div>
                            </Link>
                        </li>
                    ))
                ) : (
                    <li>No chapters found.</li>
                )}
            </ul>
        </div>
    );
};

export default ComicDetail;