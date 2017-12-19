export default {
    mounted () {
        let viewReady =this.viewReady
        let fetchData = this.fetchData
        let fetchDataOnce = this.fetchDataOnce
        if(viewReady)
        {
            viewReady.call(this)
        }
        if(fetchData)
        {
            fetchData.call(this)
        }
        if(fetchDataOnce)
        {
            fetchDataOnce.call(this)
        }
    }
}
