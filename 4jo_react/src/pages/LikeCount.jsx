import { useEffect, useState } from 'react';
import axios from 'axios';


// postId를 못받는 다른 페이지에 좋아요 갯수를 가져오는 페이지
const LikeCount = ({ postId }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!postId) return;
        axios.get(`/like/count/${postId}`)
            .then(res => setCount(res.data))
            .catch(err => console.log("좋아요 수 실패", err));
    }, [postId]);

    return <span>{count}</span>;
};

export default LikeCount;