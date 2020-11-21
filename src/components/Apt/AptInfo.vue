<template>
    <div class="customoverlay"><a href="#" @click="haddle_toggle" target="_self"><span class="title">
        <br> {{apt.dong}} <br> {{apt.deal}}만원</span></a></div>
</template>

<script>
export default {

    data() {
        return {
            apt: [
                {dong: "안양 5동"},
                {deal: "29,000"},
            ]
        }
    },
    methods: {
        handdle_toggle() {
            alert('dd');
        }
    },
}
</script>