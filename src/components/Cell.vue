<template>
    <div :id="index" class="cell"  v-on:click="eventAdd" :class="{filled: title, active: isActive == this.day.idEvent}">
        <div class="cell-date">
            {{dayName[index]}} {{ day.id }}
        </div>

        <div class="cell-title">
            {{title}}
        </div>

        <div class="cell-description">
            {{name}}
        </div>
    </div>
</template>

<script>
export default {
    props: ['day', 'dayName', 'event', 'index', 'isActive'],
    methods: {
        eventAdd: function() {
            this.$root.$emit('bv::hide::tooltip')
            if (this.title) {
                this.$emit('openModal', {
                    flag: false, 
                    overFlag:true, 
                    cellTitle: this.title, 
                    cellDescription: this.description,
                    cellName: this.name,
                    cellDay: this.day,
                    isActive: this.day.idEvent
                })
            } else {
                this.$emit('openModal', {
                    flag: true, 
                    overFlag: false, 
                    cellDay: this.day.idEvent,
                    isActive: this.day.idEvent
                })
            }
        },

        changeFlag: function() {
            this.activeFlag = true
        }
    },
    computed: {
        title() {
            if (this.event.some(item => item.id == this.day.idEvent)) {
                return this.event.find(item => item.id == this.day.idEvent).title
            } else {
                return ''
            }
        },

        name() {
            if (this.event.some(item => item.id == this.day.idEvent)) {
                return this.event.find(item => item.id == this.day.idEvent).name
            } else {
                return ''
            }
        },

        description() {
            if (this.event.some(item => item.id == this.day.idEvent)) {
                return this.event.find(item => item.id == this.day.idEvent).description
            } else {
                return ''
            }
        }
    },
    data() {
        return {
            activeFlag: this.flag
        }
    }
}
</script>

<style>
.cell {
    height: 120px;
    width: 140px;
    border: solid 1px;
    padding: 8px;
    min-height: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.cell-date {
    color: #6B6B6B;
    font-size: 14px;
}

.cell-title {
    color: #292929;
    font-size: 14px;
    margin-top: 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    height: 2.5em;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    }

.cell-description {
    color: #6B6B6B;
    font-size: 14px;
    height: 100%;
    width: 100%;
    margin-top: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: default;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    line-height: 1.3em
}

.cell:hover {
    background-color: #F4F4F4;
}

/* .cell:active {
    box-shadow: 0px 0px 10px 2px #0271C7;
} */

.filled {
    background-color: #C2E4FE;
}

.filled:hover {
    background-color: #27A1FF;
}

.active {
    background-color: #C2E4FE;
    box-shadow: 0px 0px 10px 2px #0271C7;
}

</style>