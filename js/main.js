function initVue() {
    new Vue({
        el: '#app',
        data: {
            'musics': [],
            'selectGenre': '',
            'year': '',
        },
        // prendo oggetto music da api
        mounted() {
            axios
                .get('https://flynn.boolean.careers/exercises/api/array/music')
                .then(data => {
                    this.musics = data.data.response;
                });
        },
        computed: {
            // filtro music e ordino per genere
            filteredMusic: function () {
                return this.musics.filter(elem => {
                    return elem.genre.includes(this.selectGenre);
                });
            },
            // ciclo musics per prendere iesimo elemnto con valore genere
            genres: function () {
                const genre = [];
                for (let i = 0; i < this.musics.length; i++) {
                    let elem = this.musics[i];
                    if (!genre.includes(elem.genre)) {
                        genre.push(elem.genre);
                    }
                } 
                return genre;   
            },
            // ordino la musica per anno
            orderedMusic: function () {
                const order = this.filteredMusic.sort(
                     function (a, b) {
                        var A = a.year;
                        var B = b.year;
                        if (A < B) {
                            return -1;
                        } else if (A > B) {
                            return 1;
                        }
                        return 0;
                    }
                );
                return order;
            }
        }
    });
}

function init() {
    initVue();
}

document.addEventListener('DOMContentLoaded', init);
