function initVue() {
    new Vue({
        el: '#app',
        data: {
            'musics': [],
            'genre': [],
            'arrYear': [],
            'selectGenre': '',
            'year': '',
        },
        methods: {
            filterYear: function () {
                console.log(this.genre);
                console.log(this.arrYear);
            },
            orderMusic: function (num) {
                this.musics.sort(function (a, b) {
                    var A = a[num];
                    var B = b[num];
                    if (A < B) {
                        return -1;
                    } else if (A > B) {
                        return 1;
                    }
                    return 0;
                });
            },
            test: function () {
                // this.orderMusic(this.arrYear)
            },
        },
        mounted() {
            axios
                .get('https://flynn.boolean.careers/exercises/api/array/music')
                .then(data => {
                    this.musics = data.data.response;
                    for (let i = 0; i < this.musics.length; i++) {
                        let elem = this.musics[i];
                        if (!this.genre.includes(elem.genre)) {
                            this.genre.push(elem.genre);
                        }
                        if (!this.arrYear.includes(elem.year)) {
                            this.arrYear.push(elem.year);
                        }
                    }
                });
        },
        computed: {
            filteredMusic: function () {
                if (this.selectGenre == 'All') {
                    return this.musics
                } else {
                    return this.musics.filter(elem => {
                        return elem.genre.includes(this.selectGenre);
                    });
                }
            }
        }
    });
}

function init() {
    initVue();
}

document.addEventListener('DOMContentLoaded', init);
