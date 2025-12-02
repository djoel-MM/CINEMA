const API = "7f92d4df";

document.getElementById("search").addEventListener("click", searchMovie);
console.log("FUNCTION JALAN");


async function searchMovie() {
    const search = document.getElementById("searchBox").value.trim();
    if (!search) return alert("Masukkan judul film!");

    // Kumpulkan genre terpilih
    const pilihgenre = [];
    document.querySelectorAll(".genre-check:checked").forEach(item => {
        pilihgenre.push(item.value.toLowerCase());
    });

    console.log("Genre dipilih:", pilihgenre);

    const url = `https://www.omdbapi.com/?apikey=${API}&s=${search}`;
    const res = await fetch(url);
    const data = await res.json();

    const movieBox = document.getElementById("result");
    movieBox.innerHTML = "";

    if (data.Response === "False") {
        movieBox.innerHTML = `<h4 class="text-center text-primary">Tidak ada Result</h4>`;
        return;
    }

    for (let film of data.Search) {
        // Ambil detail film
        const detailRes = await fetch(
            `https://www.omdbapi.com/?apikey=${API}&i=${film.imdbID}`
        );
        const detail = await detailRes.json();

        let genreFilm = detail.Genre.toLowerCase();

        // Filter genre
        if (pilihgenre.length > 0) {
            const cocok = pilihgenre.some(g => genreFilm.includes(g));
            if (!cocok) continue;
        }

        movieBox.innerHTML += `
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <div class="movie-card">
          <img src="${film.Poster}" class="movie-img">
          <div class="movie-info">
              <h5 class="movie-title">${film.Title}</h5>
              <p><strong>Tahun:</strong> ${film.Year}</p>
              <p><strong>Genre:</strong> ${detail.Genre}</p>
          </div>
      </div>
  </div>
`;

        
    }
}
