function searchMovie() {
    $('#daftar-film').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '4dd3e488',
            's': $('#cari').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;

                $.each(movies, function (i, data) {
                    $('#daftar-film').append(`
                        <div class="col-md-4 mt-4 mb-4>"
                            <span class="border border-dark"></span>
                            <div class="card">
                                <img src="` + data.Poster + `" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">` + data.Title + `</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `</h6>
                                    <a href="#" class="card-link detail" data-toggle="modal" data-target="#exampleModal" data-id="` + data.imdbID + `">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `); 
                });
            } else {
                $('#daftar-film').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `<h1>
                    </div>
                `);
            }
        }
    });
    $('#cari').val('');
};

$('#tombol').on('click', function () {
    searchMovie();
});

$('#cari').on('keyup', function (e) {
    if (e.keyCode === 13) {
        searchMovie();
    }
});

// event bundling !!
$('#daftar-film').on('click', '.detail', function () {
    // console.log($(this).data('id'))
    $.ajax({
        url: 'https://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '4dd3e488',
            'i': $(this).data('id')
        },
        success: function (result) {
            console.log(result);
            if (result.Response == "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` + result.Poster + `" class="card-img-top" alt="...">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                <li class="list-group-item font-weight-bold">` + result.Title + ` (` + result.Year + `)</li>
                                <li class="list-group-item">Released : ` + result.Released + `</li>
                                <li class="list-group-item">Genre : ` + result.Genre + `</li>
                                <li class="list-group-item">Writer : ` + result.Writer + `</li>
                                <li class="list-group-item">Director : ` + result.Director + `</li>
                                <li class="list-group-item">Actors : ` + result.Actors + `</li>
                                <li class="list-group-item">Awards : ` + result.Awards + `</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
})
