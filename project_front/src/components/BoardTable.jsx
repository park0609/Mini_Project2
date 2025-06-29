const BoardTable = ({ posts }) => {
    return (
        <table border="1" width="100%">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>날짜</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post, idx) => (
                    <tr key={post._id}>
                        <td>{idx + 1}</td>
                        <td>{post.title}</td>
                        <td>{post.author}</td>
                        <td>{post.date}</td>
                        <td>{post.views}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BoardTable;
