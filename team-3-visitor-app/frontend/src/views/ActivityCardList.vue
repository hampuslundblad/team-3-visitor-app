<style src="../styles/VisitorApp.scss" lang="scss"></style>

<template>
    <b-list-group class="card-list flex-wrap" horizontal>
    <ActivityCard
        class=".ml-3"
        v-for="activity in getActivities(activityType)"
        :key="activity._id"
        :activity="activity">
    </ActivityCard>
    </b-list-group>

</template>

<script>
import ActivityCard from '../components/ActivityCard.vue'
import listOfActivities from '../../../backend/data/activities.json'

export default {
    name: 'Activities',
    props: ['activityType', 'subtype'],
    data() {
        return {
            activities: []
        }
    },
    methods: {
        getActivities(activityType) {
            var count = 0
            var list = []
            if (activityType !== 'All') {
                if (this.subtype && this.subtype !== '') {
                    return this.getActivitiesBySubtype(this.subtype)
                } else {
                    Object.keys(listOfActivities).forEach(key => {
                        const item = listOfActivities[key]
                        console.log('Item ', activityType)
                        if (item.type === activityType) {
                            list[count] = item
                            count = count + 1
                        }
                    })
                    return list
                }
            } else return listOfActivities
        },
        getActivitiesBySubtype(subType) {
            var count = 0
            var list = []
            if (subType !== 'null') {
                Object.keys(listOfActivities).forEach(key => {
                    const item = listOfActivities[key]
                    console.log('Item ', subType)
                    if (item.subtype === subType) {
                        list[count] = item
                        count = count + 1
                    }
                })
                return list
            } else return listOfActivities
        }
    },
    components: {
        ActivityCard
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
    color: #42b983;
}

.card-list{
  display:flex;
  justify-content:center;
  margin:0;
  padding-bottom:2rem;
  overflow-y:auto;
  width:100%;
}

</style>
