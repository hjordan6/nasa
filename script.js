let app = new Vue({
    el: '#app',
    data: {
        //number: '',
        //max: '',
        current: {
            title: '',
            img: '',
            alt: '',
        },
        loading: true,
        not_found: false,
        search: 'NASA',
        images: {
            img: '',
            des: '',
        },
        index: '',
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
                for (let i = 0; i < 5; i++) {
                    Vue.set(this.images, i, new Object);
                    this.images[i].img = this.current.collection.items[this.index + i].links[0].href;
                    this.images[i].des = this.current.collection.items[this.index + i].data[0].description;
                }
                this.number = this.current.num;
                this.loading = false;
              } catch (error) {
                this.number = this.max;
                console.log(error);
              }
        },
        async getPhoto() {
            try {
                this.not_found = false;
                this.loading = true;
                var obj = document.getElementById("input");
                console.log(obj);
                let hold = obj.value;
                if (hold != "Make a selection") {
                    this.index = 0;
                    this.search = obj.value;
                    const response = await axios.get('https://images-api.nasa.gov/search?media_type=image&q=' + this.search +'&keywords=' + this.search);
                    console.log(this.index);
                    console.log(response.data);
                    this.current = response.data;
                    for (let i = 0; i < 5; i++) {
                        Vue.set(this.images, i, new Object);
                        this.images[i].img = this.current.collection.items[this.index + i].links[0].href;
                        this.images[i].des = this.current.collection.items[this.index + i].data[0].description;
                    }
                    this.number = this.current.num;
                }
                this.loading = false;
            } catch (error) {
                this.not_found = true;
                for (let i = 0; i < 5; i++) {
                    Vue.set(this.images, i, new Object);
                    this.images[i].img = '';
                    this.images[i].des = '';
                }
                this.images[0].img = "image-not-found.PNG";
                this.images[0].des = "Your search yeilded no results";
                this.loading = false;
                this.number = this.max;
                console.log(error);
            }
        },
        async next() {
            this.not_found = false;
            let end = false;
            if ((this.index + 5) >= this.current.collection.items.length) {
                return;
            }
            this.index += 5;
            if ((this.index + 5) >= this.current.collection.items.length) {
                end = true;
            }
            try {
                if (!end) {
                    for (let i = 0; i < 5; i++) {
                        Vue.set(this.images, i, new Object);
                        this.images[i].img = this.current.collection.items[this.index + i].links[0].href;
                        this.images[i].des = this.current.collection.items[this.index + i].data[0].description;
                    }
                } else {
                    for (let i = 0; i < 5; i++) {
                        Vue.set(this.images, i, new Object);
                        this.images[i].img = '';
                        this.images[i].des = '';
                    }
                    for (let i = this.index; i < this.current.collection.items.length; i++) {
                        Vue.set(this.images, i, new Object);
                        this.images[i - this.index].img = this.current.collection.items[this.index + (i - this.index)].links[0].href;
                        this.images[i - this.index].des = this.current.collection.items[this.index + (i - this.index)].data[0].description;
                    }
                }
              } catch (error) {
                this.number = this.max;
                console.log(error);
              }
        },
        async searchNum() {
            this.not_found = false;
            var obj = document.getElementById("numSearch");
            console.log(obj);
            let hold = Number(obj.value);
            let len = this.current.collection.items.length;
            let max = (hold + 5);
            if (hold > len || hold < 1) {
                this.image = "image-not-found.PNG";
                return;
            }
            let end = false;
            if (max > len) {
                end = true;
            }
            this.index = (hold - 1);
            try {
                if (!end) {
                    for (let i = 0; i < 5; i++) {
                        Vue.set(this.images, i, new Object);
                        this.images[i].img = this.current.collection.items[this.index + i].links[0].href;
                        this.images[i].des = this.current.collection.items[this.index + i].data[0].description;
                    }
                } else {
                    for (let i = 0; i < 5; i++) {
                        Vue.set(this.images, i, new Object);
                        this.images[i].img = '';
                        this.images[i].des = '';
                    }
                    for (let i = this.index; i < this.current.collection.items.length; i++) {
                        Vue.set(this.images, i, new Object);
                        this.images[i - this.index].img = this.current.collection.items[this.index + (i - this.index)].links[0].href;
                        this.images[i - this.index].des = this.current.collection.items[this.index + (i - this.index)].data[0].description;
                    }
                }
              } catch (error) {
                this.not_found = true;
                for (let i = 0; i < 5; i++) {
                    Vue.set(this.images, i, new Object);
                    this.images[i].img = '';
                    this.images[i].des = '';
                }
                this.images[0].img = "image-not-found.PNG";
                this.images[0].des = "Your search yeilded no results";
                this.loading = false;
                this.number = this.max;
                console.log(error);
                this.number = this.max;
                console.log(error);
              }
        },
    },
    computed: {
        endIndex() {
            if ((this.index + 5) > this.current.collection.items.length) {
                return this.current.collection.items.length;
            }
            return this.index + 5;
        }
    },
});