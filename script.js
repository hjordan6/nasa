Vue.component('star-rating', VueStarRating.default);

let app = new Vue({
    el: '#app',
    data: {
        current: {
            title: '',
            img: '',
            alt: '',
        },
        loading: true,
        search: 'NASA',
        addedName: '',
        addedComment: '',
        comments: {},
        ratings: {},
        image: '',
        index: '',
        description: '',
        images: {
            img: '',
            comments: {},
            description: '',
            likes: 0,
        }
    },
    created() {
      this.index = 0;
      this.start();
    },
    methods: {
        async start() {
            try {
                this.loading = true;
                const response = await axios.get('https://images-api.nasa.gov/search?media_type=image&keywords=NASA');
                console.log(response.data);
                this.current = response.data;
                this.image = this.current.collection.items[this.index].links[0].href;
                this.description = this.current.collection.items[this.index].data[0].description;
                this.number = this.current.num;
                this.loading = false;
              } catch (error) {
                this.number = this.max;
                console.log(error);
              }
        },
        async getPhoto() {
            try {
              this.loading = true;
              var obj = document.getElementById("input")
              let hold = obj.options[obj.selectedIndex].text;
              if (hold != "Make a selection") {
                this.index = 0;
                this.search = obj.options[obj.selectedIndex].text;
                const response = await axios.get('https://images-api.nasa.gov/search?media_type=image&q=' + this.search +'&keywords=' + this.search);
                console.log(this.index);
                console.log(response.data);
                this.current = response.data;
                this.image = this.current.collection.items[this.index].links[0].href;
                this.description = this.current.collection.items[this.index].data[0].description;
                this.number = this.current.num;
              }
              this.loading = false;
            } catch (error) {
              this.number = this.max;
              console.log(error);
            }
        },
        async next() {
            if ((this.index + 1) == this.current.collection.items.length) {
                this.image = "image-not-found.PNG";
                return;
            }
            this.index++;
            this.image = this.current.collection.items[this.index].links[0].href;
            this.description = this.current.collection.items[this.index].data[0].description;
        },
        async searchNum() {
            var obj = document.getElementById("numSearch");
            let hold = obj.value;
            if (hold > this.current.collection.items.length || hold < 1) {
                this.image = "image-not-found.PNG";
                return;
            }
            this.index = (hold - 1);
            this.image = this.current.collection.items[this.index].links[0].href;
            this.description = this.current.collection.items[this.index].data[0].description;
        },
        addComment() {
            if (!(this.number in this.comments))
              Vue.set(app.comments, this.number, new Array);
              var t = moment().format('MMMM Do YYYY, h:mm:ss a')
            this.comments[this.number].push({
              author: this.addedName,
              text: this.addedComment,
              time: t,
            });
            this.addedName = '';
            this.addedComment = '';
        },
    },
    computed: {
        date() {
            if (this.comments[this.number] === undefined)
                return '';
            return this.comments[this.number].date;
        }
    },
    /*watch: {
        number(value, oldvalue) {
            if (oldvalue === '') {
                this.max = value;
            } else {
                this.xkcd();
            }
        },
    },*/
  });