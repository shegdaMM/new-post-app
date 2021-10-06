/* eslint-disable no-unused-vars */
<template>
<div class="diagram-wrapper" v-if="fullPostsList.length > 0">
  <app-calendar
  class="calendar"
    @current-date-range="diagramView"
    v-if="postsObj"
    :minDate="firstPostMounth"
  />
  <div class="diagram-show">
     <app-diagram-chartjs
    class="diagramm"
    :key="upKey"
    :dataForDiagram="dataForDiagram"
    :options="options"
    v-if="currentDiagramData"
  />
  </div>
</div>
</template>

<script>
import AppCalendar from '@/components/ui/AppCalendar';
import { mapGetters, mapActions } from 'vuex';
import AppDiagramChartjs from './appDiagramChartjs.vue';
export default {
    components: {
        AppCalendar,
        AppDiagramChartjs
    },
    props: {
      postedBy: {
        type: String
      }
    },
    data () {
      return {
        query: {
          range: {
            from: null,
            to: null
          },
          type: null
        },
        typeView: 'chartjs',
        diagram: {
          label: null,
          value: 0
        },
        currentDiagramData: null,
        options: {
          legend: {
            display: false
          },
          responsive: true,
          height: 100
        },
        upKey: 0
      };
    },
    computed: {
      ...mapGetters(['postsListSize', 'fullPostsList']),
      dataForDiagram () {
        const result = {
          labels: Object.keys(this.currentDiagramData),
          datasets: [{
            data: Object.values(this.currentDiagramData),
            label: 'Bar chart of posts',
            backgroundColor: '#1867ad'
          }]
        };
        return result;
      },
      postsObj () {
        const tempObjDate = {};
        const objByDate = {};
          for (const id in this.fullPostsList) {
            // eslint-disable-next-line no-unused-vars
            const post = this.fullPostsList[id];
            const postDate = new Date(post.dateCreated).toISOString().split('T')[0];

            // set in obj
            if (tempObjDate[postDate]) {
              tempObjDate[postDate] = tempObjDate[postDate] + 1;
            } else {
              tempObjDate[postDate] = 1;
            }
          }
          const postObjArray = Object.keys(tempObjDate);
          const today = new Date().toISOString().split('T')[0];
          let possition = postObjArray[0];
          // eslint-disable-next-line no-new-wrappers
          while (possition !== today && possition) {
            if (tempObjDate[possition]) {
              objByDate[possition] = tempObjDate[possition];
            } else {
              objByDate[possition] = 0;
            }
            possition = new Date(new Date(possition).setDate(new Date(possition).getDate() + 1)).toISOString().split('T')[0];
          }
        return objByDate;
      },
      firstPostMounth () {
        const year = new Date(Object.keys(this.postsObj)[0]).getFullYear();
        let mounth = (new Date(Object.keys(this.postsObj)[0]).getMonth() + 1);
        mounth = (mounth > 9) ? mounth : ('0' + mounth);
        return year + '/' + mounth;
      }
    },
    watch: {
      query: {
        deep: true,
        handler () {
          this.upKey = this.upKey + 1;
          const startRangeDate = new Date(this.query.range.from).getTime();
          const endRangeDate = new Date(this.query.range.to).setDate(new Date(this.query.range.to).getDate() + 1);

          let result;

          const dayObj = {};
          const weekObj = {};
          const mountObj = {};
          const yearObj = {};

          let currentStartWeek = null;
          let currentEndWeek = null;

          for (const date in this.postsObj) {
            const itemDate = new Date(date).getTime();
            if ((itemDate - startRangeDate >= 0) && (endRangeDate - itemDate >= 0)) {
              // get by days in range
              if (this.query.type === 'ByDays') {
                if (dayObj[date]) {
                    dayObj[date] = dayObj[date] + this.postsObj[date];
                } else {
                    dayObj[date] = this.postsObj[date];
                }
                result = dayObj;
              }
              // by weeks
              if (this.query.type === 'ByWeeks') {
                if (!currentStartWeek) {
                  currentStartWeek = date;
                  currentEndWeek = new Date(new Date(date).setDate(new Date(date).getDate() + 7)).toISOString().split('T')[0];
                }

                if (!((itemDate >= new Date(currentStartWeek)) && (itemDate <= new Date(currentEndWeek)))) {
                  currentStartWeek = currentEndWeek;
                  currentEndWeek = new Date(new Date(currentEndWeek).setDate(new Date(currentEndWeek).getDate() + 7)).toISOString().split('T')[0];
                } else {
                  const key = currentStartWeek + ' - ' + currentEndWeek;
                  if (weekObj[key]) {
                    weekObj[key] = weekObj[key] + this.postsObj[date];
                  } else {
                    weekObj[key] = this.postsObj[date];
                  }
                }
                result = weekObj;
              }

              // by mounth
              if (this.query.type === 'ByMounths') {
                const mounthsNames = {
                  '01': 'January',
                  '02': 'February',
                  '03': 'March',
                  '04': 'April',
                  '05': 'May',
                  '06': 'June',
                  '07': 'July',
                  '08': 'August',
                  '09': 'September',
                  // eslint-disable-next-line quote-props
                  '10': 'October',
                  // eslint-disable-next-line quote-props
                  '11': 'November',
                  // eslint-disable-next-line quote-props
                  '12': 'December'
                };

                const year = date.slice(0, 4);
                const mounth = date.slice(5, 7);
                const key = mounthsNames[mounth] + ' ' + year;
                if (mountObj[key]) {
                    mountObj[key] = mountObj[key] + this.postsObj[date];
                } else {
                    mountObj[key] = this.postsObj[date];
                }
                result = mountObj;
              }

              // by year
              if (this.query.type === 'ByYears') {
                const year = date.slice(0, 4);
                  if (yearObj[year]) {
                    yearObj[year] = yearObj[year] + this.postsObj[date];
                  } else {
                    yearObj[year] = this.postsObj[date];
                  }
                result = yearObj;
              }
            }
          }
          this.currentDiagramData = result;
        }
      }
    },
    methods: {
      ...mapActions(['getPostsList', 'clearPostsList']),
      diagramView (query) {
        this.query = query;
      }
    },
    async mounted () {
      (this.postedBy) ? await this.getPostsList({ limit: 0, postedBy: this.postedBy }) : await this.getPostsList({ limit: 0 });
      this.upKey = this.upKey + 1;
    },
    beforeUnmount () {
      this.clearPostsList();
    }
};
</script>

<style lang="scss" scoped>
.diagram-wrapper{
  display: flex;
  align-items: flex-start;
  margin: 0 1rem;

  & > * {
    margin: 0.5rem;
  }
  .calendar {
      flex-grow: 1;
  }
}

.diagram-show {
    overflow-x: auto;
    flex-grow: 2;

    .diagramm {
      min-width: 700px;
    }
}

@media screen and (max-width: 1200px) {
  .diagram-wrapper{
    flex-wrap: wrap;
    .calendar {
      margin: 0.5rem auto;
    }
  }
}
</style>
