//
//      !! pilih mau menggunakan JQuery apa vanila javascript / bisa komentari salah satu yang tidak di guanakan
//
//mennggunakan bantuan jQuery
$('.btn-warning').on('click', function(){
    $.ajax({
            url :'http://www.omdbapi.com/?apikey=d92c7a2c&s='+$('.input-movie').val(),
            success : results => {
            const movies = results.Search;
            let cards = '';
            movies.forEach(m => {
                cards += Showchard(m);
            });
            $ ('.movie-container').html(cards);

        //menjalankan tombol lihat detail
        $('.modal-detail-button').on('click',function() {
            $.ajax({
                url :'http://www.omdbapi.com/?apikey=d92c7a2c&i=' + $(this).data('imdbid'),
                success : m =>{
                    console.log(m);
                    const movieDetail = Showmodal(m);
                $('.modal-body').html(movieDetail);
                },
                error : error=> {
                    console.log (error.responseText);
                },
            });
        });
        },
            error : error => {
                console.log (error.responseText);
            }
    });

});


//pake vannila javascript

const SearchButton = document.querySelector('.btn-warning');
SearchButton.addEventListener('click', async function(){
   const inputKeyword = document.querySelector('.input-movie');
   const movie = await getMovie(inputKeyword.value);
   updateUI(movie)
});

document.addEventListener('click', async function(e){
    if(e.target.classList.contains('.modal-detail-button')){
        const imdbid = e.target.dataset.imdbid;
        const moveDetail = await getMovieDetail(imdbid);
        getUIMovieDetail(moveDetail);
    }
});
//element get showdetail
function getUIMovieDetail(){
    fetch('http://www.omdbapi.com/?apikey=d92c7a2c&i=' + imdbid)
    .then(response=> response.json())
    .then(m => m)
}
function upddateUIDetail(){
    const movieDetail = Showmodal(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML= movieDetail;
}

//element get card
function getMovie(keyword){
    return fetch ('http://www.omdbapi.com/?apikey=d92c7a2c&s=' + keyword)
   .then (response => response.json())
   .then (response => response.Search);
}

function updateUI(){
    let card ='';
    movie.forEach(m => card += Showchard(m));
    const movieContainer = document.querySelector('.movie-container')
    movieContainer.innerHTML = card;
}




//componen
function Showchard(m){
    return `<div class="col-md-3 my-4 mx-4">
                <div class="card" style="width: 18rem; background-color: rgb(56, 56, 56); height:33rem;">
                    <img src="${m.Poster}" class="card-img-top" style="height:375px;" >
                    <div class="card-body text-center " style="color: rgb(204, 201, 193);">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 " style="color: rgb(204, 201, 193);">${m.Year}</h6>
                        <a href="#" class="btn btn-warning modal-detail-button" data-bs-toggle="modal" data-bs-target="#ModalMovie" data-imdbID="${m.imdbID}">Show Detail</a>
                    </div>
                </div>
            </div>`;
}

function Showmodal(m){
    return`<div class="container-fluid">
                <div class="row">
                <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid">
                </div>
                <ul class="list-group">
                    <li class="list-group-item"><h4>${m.Title}(${m.Year})</h4></li>
                    <li class="list-group-item"><strong>Director :</strong>${m.Director}</li>
                    <li class="list-group-item"><strong>Actors :</strong>${m.Actors}</li>
                    <li class="list-group-item"><strong>Writer :</strong>${m.Writer}</li>
                    <li class="list-group-item"><strong>Plot :</strong>${m.Plot}</li>
                </ul>
                </div>
            </div>`;
}