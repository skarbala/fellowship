const pointsLeft = 25;

Vue.component('FellowComponent', {
    props: ['fellow', 'selectedFellows'],
    template:
    '<li class="col-md-4"  v-on:click="addFellow">' +
        '<div class="inner box-shadow" v-bind:class="{active:isActive}"> ' +
            '<div class="row">' +
                '<div class="col">' +
                    '<h1>{{fellow.name}}</h1>' +
                    '<h2>Race: {{fellow.race}}</h2>' +
                    '<h2>Age: {{fellow.age}}</h2>' +
                '</div>' +
                '<div class="fellow-points col">' +
                    '<h2>{{fellow.score}}</h2>' +
                    '<p>points</p>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</li>',
    methods: {
        addFellow: function() {
            app.clickOne(this.fellow);
        }
    },
    computed: {
        isActive: function () {
            return app.selectedFellows.includes(this.fellow);
        }
    }
});

const app = new Vue({
    el: '#app',
    created: function () {
        fetch("storage/storage.json")
            .then(response => response.json())
            .then(data => app.fellows = data);
    },
    data: {
        pointsLeft: pointsLeft,
        fellows: [],
        selectedFellows: []
    },
    methods: {
        clickOne: function (fellow) {
            if (this.selectedFellows.includes(fellow)) {
                this.selectedFellows.splice(this.selectedFellows.indexOf(fellow), 1);
                this.pointsLeft = this.pointsLeft + fellow.score;
            }
            else if (this.pointsLeft - fellow.score >= 0) {
                this.pointsLeft = this.pointsLeft - fellow.score;
                fellow.selected = true;
                this.selectedFellows.push(fellow);
            }
        }
    }
});