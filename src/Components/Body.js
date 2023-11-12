// import React, { useEffect, useState, useCallback } from "react";
// import "./Style.css";

// export default function Body() {
//   const [data, setData] = useState(null);
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(8);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Step 1: Use useCallback for fetchNews
//   const fetchNews = useCallback(() => {
//     // Use a different API URL based on the presence of a search query
//     const apiUrl = searchQuery
//       ? `http://localhost:5000/articles?q=${encodeURIComponent(
//           searchQuery
//         )}&page=${page}&pageSize=${pageSize}`
//       : `http://localhost:5000/articles?page=${page}&pageSize=${pageSize}`;

//     fetch(apiUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((news) => setData(news))
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, [searchQuery, page, pageSize]);

//   const handleSearch = useCallback(() => {
//     setPage(1);
//     fetchNews();
//   }, [fetchNews, setPage]);

//   useEffect(() => {
//     fetchNews();
//   }, [fetchNews, page]);

//   const nextPage = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   const prevPage = () => {
//     if (page > 1) {
//       setPage((prevPage) => prevPage - 1);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Enter search query..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{
//             marginBottom: "20px",
//             borderRadius: "20px",
//           }}
//         />
//         <button
//           onClick={handleSearch}
//           style={{
//             marginLeft: "30px",
//             borderRadius: "20px",
//           }}
//         >
//           Search
//         </button>
//       </div>

//       <div className="row">
//         {data ? (
//           data.map((article, index) => (
//             <div className="col-md-3" key={index}>
//               <div className="card">
//                 <img
//                   className="card-img-top"
//                   src={article.urlToImage}
//                   alt={article.title}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">Title: {article.title}</h5>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//       <div className="pagination" style={{ float: "right" }}>
//         <button
//           onClick={prevPage}
//           disabled={page === 1}
//           className="pagination-button"
//           style={{
//             backgroundColor: "red",
//             marginTop: "20px",
//             borderRadius: "10px",
//             marginLeft: "10px",
//           }}
//         >
//           Back
//         </button>
//         <button
//           onClick={nextPage}
//           className="pagination-button"
//           style={{
//             backgroundColor: "red",
//             marginTop: "20px",
//             borderRadius: "10px",
//             marginLeft: "10px",
//           }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback } from "react";
import "./Style.css";

export default function Body() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  // Step 1: Use useCallback for fetchNews
  const fetchNews = useCallback(async () => {
    try {
      // Use a different API URL based on the presence of a search query
      const apiUrl = searchQuery
        ? `http://localhost:5000/articles?q=${encodeURIComponent(
            searchQuery
          )}&page=${page}&pageSize=${pageSize}`
        : `http://localhost:5000/articles?page=${page}&pageSize=${pageSize}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const news = await response.json();

      if (news) {
        setData(news);
      } else {
        console.error("Unexpected API response structure:", news);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null); // Optionally, set data to null to handle the error state
    }
  }, [searchQuery, page, pageSize]);

  const handleSearch = useCallback(() => {
    setPage(1);
    fetchNews();
  }, [fetchNews, setPage]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    fetchNews(); // Call fetchNews directly when page changes
  }, [page, fetchNews]);

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter search query..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            marginBottom: "20px",
            borderRadius: "20px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginLeft: "30px",
            borderRadius: "20px",
          }}
        >
          Search
        </button>
      </div>

      <div className="row">
        {data ? (
          data.map((article) => (
            <div className="col-md-3" key={article.url}>
              <div className="card">
                <img
                  className="card-img-top"
                  src={article.urlToImage || "fallback_image_url"}
                  alt={article.title}
                />
                <div className="card-body">
                  <h5 className="card-title">Title: {article.title}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="pagination" style={{ float: "right" }}>
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="pagination-button"
          style={{
            backgroundColor: "red",
            marginTop: "20px",
            borderRadius: "10px",
            marginLeft: "10px",
          }}
        >
          Back
        </button>
        <button
          onClick={nextPage}
          className="pagination-button"
          style={{
            backgroundColor: "red",
            marginTop: "20px",
            borderRadius: "10px",
            marginLeft: "10px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
