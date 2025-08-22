import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChapterDetail } from '../../services/comic.service';

const ChapterDetail = () => {
    const { comicSlug, chapterSlug } = useParams();
    console.log("comicSlug: ", comicSlug);
    console.log("chapterSlug: ", chapterSlug);
    
    const [chapter, setChapter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChapterDetail = async () => {
            try {
                const data = await getChapterDetail(comicSlug, chapterSlug);
                console.log("data: ", data);
                
                setChapter(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchChapterDetail();
    }, [comicSlug, chapterSlug]);

    if (loading) {
        return <div>Loading chapter details...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!chapter) {
        return <div>Chapter not found.</div>;
}

    return (
        <div>
            <h1>{chapter.title}</h1>
            <h2>Chapter {chapter.number}</h2>
            <div>
                {chapter.content && chapter.content.length > 0 ? (
                    chapter.content.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`Page ${index + 1}`}
                            style={{ maxWidth: '100%', display: 'block', marginBottom: '10px' }}
                        />
                    ))
                ) : (
                    <p>No images found for this chapter.</p>
                )}
            </div>
        </div>
    );
};

export default ChapterDetail;