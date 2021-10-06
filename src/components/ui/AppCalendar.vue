<template>
  <div class="callendar-range">
    <div class="full-width" v-if="minDate">
          <div class="row justify-between wrap ">
            <q-radio class="col-6 q-mt-none" v-model="type" val="ByDays" label="By Days" @click="onSubmit"/>
            <q-radio class="col-6 q-mt-none" v-model="type" val="ByWeeks" label="By Weeks" @click="onSubmit"/>
            <q-radio class="col-6 q-mt-none" v-model="type" val="ByMounths" label="By Mounths" @click="onSubmit" />
            <q-radio class="col-6 q-mt-none" v-model="type" val="ByYears" label="By Years" @click="onSubmit"/>
          </div>
          <q-date
            class="full-width"
            v-model="dateRange"
            range
            @update:model-value="onSubmit"
            :navigation-min-year-month="minDate"
            :navigation-max-year-month="maxDate"
          />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
       type: null,
       dateRange: { from: this.getLastMounthDate(), to: new Date().toISOString().replace('-', '/').split('T')[0].replace('-', '/') }
    };
  },
  computed: {
    maxDate () {
       const year = new Date().getFullYear();
        let mounth = (new Date().getMonth() + 1);
        mounth = (mounth > 9) ? mounth : ('0' + mounth);
        this.onSubmit();
        return year + '/' + mounth;
    }
  },
  props: {
    minDate: {
      type: String,
      default: null
    }
  },
  emits: ['current-date-range'],
  methods: {
    getLastMounthDate () {
      const now = new Date();
      const mounth = now.getMonth() - 1;
      let result = new Date(now.setMonth(mounth));
      result = new Date(result.setDate(result.getDate() + 1));
      result = result.setHours(0, 0, 0, 0);
      return new Date(result).toISOString().replace('-', '/').split('T')[0].replace('-', '/');
    },
    onSubmit () {
      if (this.dateRange?.from && this.dateRange?.to) {
        const range = {
          from: new Date(this.dateRange.from).toISOString().split('T')[0],
          to: new Date(this.dateRange.to).toISOString().split('T')[0]
        };
        this.$emit('current-date-range', { range: range, type: this.type });
      }
    }
  },
  mounted () {
      this.type = 'ByDays';
      this.onSubmit();
  }
};
</script>

<style lang="scss" scoped>
  .callendar-range {
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
  }
  #app .q-date__header {
    color: black;
  }
</style>
<!-- <template>
  <div class="callendar-range">
    <div class="row wrap">
              <div class="form-group">
                  <label>Start date </label>
                  <flat-pickr class="form-control"
                              :config="configs.start"
                              v-model.lazy="form.dateStart"
                              @on-change="onStartChange">
                  </flat-pickr>
              </div>
              <div class="form-group">
                  <label>End date </label>
                  <flat-pickr class="form-control"
                              :config="configs.end"
                              v-model="form.dateEnd"
                              @on-change="onEndChange">
                  </flat-pickr>
              </div>
              <q-btn>SHOW RANGE</q-btn>
    </div>
  </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.min.css';
export default {
  components: {
    FlatPickr
  },
  props: {
    firstDate: {
      type: Date,
      default: new Date('2021-08-30')
    }
  },
  data () {
    return {
      form: {
        dateStart: this.getLastMounthDate(),
        dateEnd: new Date()
      },
      configs: {
        start: {
          minDate: this.firstDate,
          maxDate: null
        },
        end: {
          minDate: null
        }
      }
    };
  },
  methods: {
    getLastMounthDate () {
      const now = new Date();
      const mounth = now.getMonth() - 1;
      let result = new Date(now.setMonth(mounth));
      result = result.setHours(0, 0, 0, 0);
      // return new Date(result).toISOString().split('T')[0];
      return new Date(result);
    },
    onStartChange (dateStr) {
      this.configs.end.minDate = dateStr;
    },
    onEndChange (dateStr) {
      this.configs.start.maxDate = dateStr;
    },
    showDiagram () {
      //
    }
  }
};
</script>

<style lang="scss" scoped>
  .callendar-range {
    margin: 0.5rem 1rem;
  }
  .form-group {
    padding-right: 1rem;
  }
</style>
 -->
