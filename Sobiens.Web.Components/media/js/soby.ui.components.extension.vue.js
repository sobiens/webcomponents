Vue.component('dataset', {
    props: ['title', 'data', 'type'],
    data: function () {
        return {
            count: 0
        }
    },
    template: "<div class='dataset' v-bind:data-title=\"title\" v-bind:data-data=\"data\" v-bind:data-type=\"type\" ></div>"
})

Vue.component('labels', {
    props: ['labels'],
    template: "<div class='labels' v-bind:data-labels=\"labels\"></div>"
})

Vue.component('soby-chart', {
    props: ['id', 'width', 'height'],
    template: "<div v-bind:id=\"id\" v-bind:data-width=\"width\" v-bind:data-height=\"height\">" +
                "<slot></slot>" +
              "</div>",
    mounted() {
        sobyGenerateChartFromHtmlElement(this.$el.id);
    }
})
