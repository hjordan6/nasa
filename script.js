Vue.component('star-rating', VueStarRating.default);

let app = new Vue({
    el: '#app',
    data: {
        number: '',
        max: '',
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
        description: ''
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
            try {
                this.loading = true;
                const response = await axios.get('https://images-api.nasa.gov/search?media_type=image&q=' + this.search +'&keywords=' + this.search);
                console.log(this.index);
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
        async searchNum() {
            var obj = document.getElementById("numSearch");
            let hold = obj.value;
            if (hold > this.current.collection.items.length) {
                this.image = "image-not-found.PNG";
                return;
            }
            this.index = (hold - 1);
            try {
                this.loading = true;
                const response = await axios.get('https://images-api.nasa.gov/search?media_type=image&q=' + this.search +'&keywords=' + this.search);
                console.log(this.index);
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
        setRating(rating){
            if (!(this.number in this.ratings))
            Vue.set(this.ratings, this.number, {
                sum: 0,
                total: 0
              });
            this.ratings[this.number].sum += rating;
            this.ratings[this.number].total += 1;
        }
    },
    computed: {
        month() {
            var month = new Array;
            if (this.current.month === undefined)
                return '';
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            return month[this.current.month - 1];
        },
        aveRating() {
            if (this.ratings[this.number] === undefined)
                return '';
            return (this.ratings[this.number].sum / this.ratings[this.number].total).toFixed(1);
        },
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